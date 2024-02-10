import numpy as np
import pandas as pd
import math
import os

from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.neighbors import NearestNeighbors
from sklearn.cluster import KMeans
from sklearn.metrics import adjusted_rand_score
import requests
from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware
from scipy.sparse import csr_matrix


app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# desc_data = pd.read_csv('C:/E-Commerce-Personalized-Shopping-with-Expert-System/backend/amazon/amazon.csv',
#                         usecols=[0, 8])

df_data=pd.read_csv('D:/amazon-products2.csv')
df_data.fillna(value="No Info",inplace=True)
true_k = 10
cluster = []
rec = []
vectorizer = TfidfVectorizer(stop_words='english')
X1 = vectorizer.fit_transform(df_data['about_product'])



def get_cluster(i):

    for ind in order_centroids[i, :10]:

        cluster.append(' %s' % terms[ind])
        
        


c_model = KMeans(n_clusters=true_k, init='k-means++', max_iter=100, n_init=1)
c_model.fit(X1)


order_centroids = c_model.cluster_centers_.argsort()[:, ::-1]
terms = vectorizer.get_feature_names_out()
def content_based_recommendations(id: str):
    

    for i in range(len(df_data['product_id'])):
        if df_data['product_id'][i] == id:
            product_name = df_data['product_name'][i]
            product=df_data.iloc[i].to_dict()

    Y = vectorizer.transform([product_name])
    prediction = c_model.predict(Y)
    
    print(product['discounted_price'])
    get_cluster(prediction[0])
    vagues=[' includes', ' quality', ' great', ' perfect',' easy']
    
    
        
    for i in cluster:
        if i not in vagues:
        
            for j in range(len(df_data['product_id'])):
                if i in df_data['product_name'][j] and df_data['product_id'][j]!=id and df_data.iloc[j].to_dict() not in rec:
                
                    if df_data['discounted_price'][j] is not 'No Info' and abs(df_data['discounted_price'][j]-product['discounted_price'])<=100.0:
            
                        rec.append(df_data.iloc[j].to_dict())
    
    
    
    
    return rec


new_rate = pd.read_csv('C:/E-Commerce-Personalized-Shopping-with-Expert-System/backend/amazon/ratings.csv')

p_t = new_rate.pivot_table(
    values='rating', index='product_id', columns='user_id', fill_value=0)
product_sparse = csr_matrix(p_t)

model = NearestNeighbors(algorithm='brute')
model.fit(product_sparse)
products_id = p_t.index

def item_based(p_id):
    recs=[]
    ids = []
    for i in range(len(df_data['product_id'])):
        if df_data['product_id'][i] == p_id:
            product_id = i

    # my_model = pickle.load(open('C:/E-Commerce-Personalized-Shopping-with-Expert-System/backend/recsys/res/model.pkl', 'rb'))
    distance, suggestion = model.kneighbors(
        p_t.iloc[product_id, :].values.reshape(1, -1), n_neighbors=5)

    for i in suggestion[0]:
        if df_data['product_id'][i]!=p_id:
            ids.append(df_data.iloc[i].to_dict())
    
    return ids

@app.get('/api/products/getitemrec/{id}')
def give_rec(id):
    content=content_based_recommendations(id)
    item=item_based(id)
    return{'rec':content,'i_rec':item}

give_rec('4c69b61db1fc16e7013b43fc926e502d')