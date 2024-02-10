import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from data import df_data
import os

from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.neighbors import NearestNeighbors
from sklearn.cluster import KMeans
from sklearn.metrics import adjusted_rand_score
import requests
from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.chdir(r"C:/amazon")
desc_data = pd.read_csv('../amazon/amazon.csv',
                        usecols=[0, 8])
print(desc_data.head())

true_k = 10
cluster = []
rec = []
vectorizer = TfidfVectorizer(stop_words='english')
X1 = vectorizer.fit_transform(desc_data['about_product'])
# kmeans=KMeans(n_clusters=10,init='k-means++')
# y_kmeans=kmeans.fit_predict(X1)

for i in range(len(df_data['product_id'])):
    if df_data['product_id'][i] == 'B07JW9H4J1':
        print(df_data.iloc[i])


def get_cluster(i):

    for ind in order_centroids[i, :10]:
        print(' %s' % terms[ind]),
        cluster.append(' %s' % terms[ind])


model = KMeans(n_clusters=true_k, init='k-means++', max_iter=100, n_init=1)
model.fit(X1)
print("Top terms per cluster:")
order_centroids = model.cluster_centers_.argsort()[:, ::-1]
terms = vectorizer.get_feature_names_out()


@app.get('/api/products/getitemrec/{id}'):
def item2item_recommendations(id: str):
    print(id)
    for i in range(len(df_data['product_id'])):
        if df_data['product_id'][i] == id:
            product = df_data['product_id'][i]

    Y = vectorizer.transform([product])
    prediction = model.predict(Y)
    # print(prediction)

    get_cluster(prediction[0])
    for i in cluster:
        for j in range(len(df_data['product_name'])):
            if i in df_data['product_name'][j]:
                if df_data['product_id'][j] != id:
                    if df_data.iloc[j].to_dict() not in rec:

                        rec.append(df_data.iloc[j].to_dict())
    print(len(rec))
    print(f"My rec{rec[:5]}")

    return {'recs': rec[:5]}


item2item_recommendations('B00V9NHDI4')
