
import pandas as pd
import numpy as np
import pickle
import sklearn
from sklearn.decomposition import TruncatedSVD

NEW_RATE = pd.read_csv('C:/E-Commerce-Personalized-Shopping-with-Expert-System/backend/amazon/ratings.csv')

pivot_table = NEW_RATE.pivot_table(
    values='rating', index='user_id', columns='product_id', fill_value=0)
print(pivot_table.shape)

X = pivot_table.T

SVD = TruncatedSVD(n_components=10)

decomposed = SVD.fit_transform(X)
# print(decomposed)
correleation_matrix = np.corrcoef(decomposed)
print(correleation_matrix.shape)
# pickle.dump(correleation_matrix, open(
#     'E:/recsys/res/corelation_mat.pkl', 'wb'))
product_names = list(X.index)


def Collaborative_Filtering(i):
    cor_mat = pickle.load(open(
        'C:/E-Commerce-Personalized-Shopping-with-Expert-System/backend/recsys/res/corelation_mat.pkl', 'rb'))
    product_id = product_names.index(i)
    print(product_id)

    correlation_product_id = cor_mat[product_id]
    Recommended = list(X.index[correlation_product_id >= 0.925])
    Recommended.remove(i)
    print(f"here are {Recommended}")

    # for i in Recommended:
    #     print(product_names(i))
    return Recommended


Collaborative_Filtering('B07KSMBL2H')
