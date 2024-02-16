import torch
import pandas as pd
from torch_geometric.nn import LGConv
from torch import nn, optim, Tensor
from PIL import Image
import  matplotlib.pyplot as plt
from sklearn.neighbors import NearestNeighbors
from scipy.sparse import csr_matrix
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.GNN.sentence_transformer import SentenceTransformer,mean_pooling,my_model,tokenizer
import numpy as np
sentence_transformer=SentenceTransformer(my_model)
sentence_transformer.load_weights('D:/E-Commerce-Personalized-Shopping-with-Expert-System-master/E-Commerce-Personalized-Shopping-with-Expert-System-master/backend/GNN/sent/weights')
loaded_emb=np.load('D:/E-Commerce-Personalized-Shopping-with-Expert-System-master/E-Commerce-Personalized-Shopping-with-Expert-System-master/backend/GNN/sent/embeddings.npz')
embedding_arr=np.array(loaded_emb['arr_0'])
embedding_arr=embedding_arr.reshape(-1,embedding_arr.shape[2])
products=np.load('D:/E-Commerce-Personalized-Shopping-with-Expert-System-master/E-Commerce-Personalized-Shopping-with-Expert-System-master/backend/GNN/sent/product_titles.npz')
product_arr=np.array(products['arr_0'])
class LightGCN(nn.Module):
    def __init__(self, num_users, num_items, num_layers=4, dim_h=64):
        super().__init__()

        self.num_users = num_users
        self.num_items = num_items
        self.num_layers = num_layers
        self.emb_users = nn.Embedding(num_embeddings=self.num_users, embedding_dim=dim_h)
        self.emb_items = nn.Embedding(num_embeddings=self.num_items, embedding_dim=dim_h)

        self.convs = nn.ModuleList(LGConv() for _ in range(num_layers))

        nn.init.normal_(self.emb_users.weight, std=0.01)
        nn.init.normal_(self.emb_items.weight, std=0.01)

    def forward(self, edge_index):
        emb = torch.cat([self.emb_users.weight, self.emb_items.weight])
        embs = [emb]

        for conv in self.convs:
            emb = conv(x=emb, edge_index=edge_index)
            embs.append(emb)

        emb_final = 1/(self.num_layers+1) * torch.mean(torch.stack(embs, dim=1), dim=1)

        emb_users_final, emb_items_final = torch.split(emb_final, [self.num_users, self.num_items])

        return emb_users_final, self.emb_users.weight, emb_items_final, self.emb_items.weight

pf = pd.read_csv('D:/E-Commerce-Personalized-Shopping-with-Expert-System-master/E-Commerce-Personalized-Shopping-with-Expert-System-master/backend/GNN/res/Product_Users_Ratings.csv', sep=',', encoding='latin-1')
users = pd.read_csv('D:/E-Commerce-Personalized-Shopping-with-Expert-System-master/E-Commerce-Personalized-Shopping-with-Expert-System-master/backend/GNN/res/Users.csv', sep=',', encoding='latin-1')
products = pd.read_csv('D:/E-Commerce-Personalized-Shopping-with-Expert-System-master/E-Commerce-Personalized-Shopping-with-Expert-System-master/backend/GNN/res/amazon-products.csv', sep=',', encoding='latin-1', on_bad_lines='skip')
def get_user_items(edge_index):
    user_items = dict()
    for i in range(edge_index.shape[1]):
        user = edge_index[0][i].item()
        item = edge_index[1][i].item()
        if user not in user_items:
            user_items[user] = []
        user_items[user].append(item)
    return user_items

df = pf.loc[pf['product_id'].isin(products['Uniq Id'].unique()) & pf['user_id'].isin(users['user_id'].unique())]
user_mapping = {userid: i for i, userid in enumerate(df['user_id'].unique())}
item_mapping = {isbn: i for i, isbn in enumerate(df['product_id'].unique())}
num_users = len(user_mapping)
num_items = len(item_mapping)
user_ids = torch.LongTensor([user_mapping[i] for i in df['user_id']])
item_ids = torch.LongTensor([item_mapping[i] for i in df['product_id']])
edge_index = torch.stack((user_ids, item_ids))
productid_title = pd.Series(products['Product Name'].values, index=products['Uniq Id']).to_dict()
productid_author = pd.Series(products['Category'].values, index=products['Uniq Id']).to_dict()
user_pos_items = get_user_items(edge_index)
model=LightGCN(num_users,num_items)

# model.load_state_dict(torch.load('D:/E-Commerce-Personalized-Shopping-with-Expert-System-master/E-Commerce-Personalized-Shopping-with-Expert-System-master/backend/GNN/model.pth'))


app=FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

df_data=pd.read_csv('D:/Downloads/amazon-products2.csv')
df_data.fillna(value="No Info",inplace=True)
@app.get('/getrecs/{user_id}')
def recommend(user_id, num_recs=15):
    rec_products=[]
    user_id=int(user_id)
    user = user_mapping[user_id]
    emb_user = model.emb_users.weight[user]
    ratings = model.emb_items.weight @ emb_user

    values, indices = torch.topk(ratings, k=100)

    ids = [index.cpu().item() for index in indices if index in user_pos_items[user]][:num_recs]
    item_isbns = [list(item_mapping.keys())[list(item_mapping.values()).index(book)] for book in ids]
    titles = [productid_title[id] for id in item_isbns]
    authors = [productid_author[id] for id in item_isbns]
    ids = [index.cpu().item() for index in indices if index not in user_pos_items[user]][:num_recs]
    item_isbns = [list(item_mapping.keys())[list(item_mapping.values()).index(book)] for book in ids]
    titles = [productid_title[id] for id in item_isbns]
    authors = [productid_author[id] for id in item_isbns]
    for title in titles:
        for i in range(len(df_data['product_name'])):
            if df_data['product_name'][i]==title:
                if df_data.iloc[i].to_dict() not in rec_products:
                    rec_products.append(df_data.iloc[i].to_dict())
    return {'recs':rec_products}

@app.get('/search/{key}')
def get_results(key):
  inputs=tokenizer([key],max_length=64,padding='max_length',truncation=True,return_tensors='tf')
  logits=my_model(**inputs)
  out_embedding=mean_pooling(logits,inputs['attention_mask'])
  dot_p=np.matmul(embedding_arr,(np.array(out_embedding).T))
  u_mag=np.sqrt(np.sum(embedding_arr*embedding_arr,axis=-1))
  v_mag=np.sqrt(np.sum(out_embedding*out_embedding,axis=-1))

  cosine_similarity=dot_p.T/(u_mag*v_mag)
  sorted_indices=np.argsort(cosine_similarity,axis=-1)
  
  results=[]
  dict_result=[]
  for i in range(100):
      results.append(product_arr[sorted_indices[:,len(sorted_indices[0])-i-1]][0])
  new_list=list(set(results))
  for title in new_list:
        for i in range(len(df_data['product_name'])):
            if df_data['product_name'][i]==title:
                if df_data.iloc[i].to_dict() not in dict_result:
                    dict_result.append(df_data.iloc[i].to_dict())
  return {'result':dict_result}
  
new_rate = pd.read_csv('D:/E-Commerce-Personalized-Shopping-with-Expert-System-master/E-Commerce-Personalized-Shopping-with-Expert-System-master/backend/amazon/ratings.csv')

p_t = new_rate.pivot_table(
    values='rating', index='product_id', columns='user_id', fill_value=0)
product_sparse = csr_matrix(p_t)

nn_model = NearestNeighbors(algorithm='brute')
nn_model.fit(product_sparse)
products_id = p_t.index
@app.get('/itemrecs/{p_id}')
def item_based(p_id):
    recs=[]
    ids = []
    for i in range(len(df_data['product_id'])):
        if df_data['product_id'][i] == p_id:
            product_id = i

    # my_model = pickle.load(open('C:/E-Commerce-Personalized-Shopping-with-Expert-System/backend/recsys/res/model.pkl', 'rb'))
    distance, suggestion = nn_model.kneighbors(
        p_t.iloc[product_id, :].values.reshape(1, -1), n_neighbors=5)

    for i in suggestion[0]:
        if df_data['product_id'][i]!=p_id:
            ids.append(df_data.iloc[i].to_dict())
    
    return ids
  
        
