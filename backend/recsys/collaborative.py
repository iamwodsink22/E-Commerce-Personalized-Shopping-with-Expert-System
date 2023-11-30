import pandas as pd

from data import df_data
import pickle

from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors

new_rate = pd.read_csv('../amazon/ratings.csv')
p_t = new_rate.pivot_table(
    values='rating', index='product_id', columns='user_id', fill_value=0)
product_sparse = csr_matrix(p_t)

model = NearestNeighbors(algorithm='brute')
model.fit(product_sparse)


products_id = p_t.index
# for i in suggestion[0]:
#     print(df_data['product_id'][i])
#     ids.append(df_data['product_id'][i])


# pickle.dump(model, open('E:/recsys/res/model.pkl', 'wb'))
# pickle.dump(products_id, open('E:/recsys/res/p_id.pkl', 'wb'))
# pickle.dump(p_t, open('E:/recsys/res/product_pivot.pkl', 'wb'))
# pickle.dump(new_rate, open('E:/recsys/res/ratings.pkl', 'wb'))


def recommend_product(p_id):
    ids = []
    for i in range(len(df_data['product_id'])):
        if df_data['product_id'][i] == p_id:
            product_id = i

    my_model = pickle.load(open('./res/model.pkl', 'rb'))
    distance, suggestion = my_model.kneighbors(
        p_t.iloc[product_id, :].values.reshape(1, -1), n_neighbors=5)

    for i in suggestion[0]:
        print(df_data['product_id'][i])
        ids.append(df_data['product_id'][i])
    return ids


print(recommend_product('B08CHKQ8D4'))
