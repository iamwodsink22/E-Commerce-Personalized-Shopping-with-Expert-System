import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import os
import tensorflow as tf
import random
os.chdir(r"C:/amazon")
df_data = pd.read_csv('amazon.csv',
                      usecols=[0, 1, 2, 3, 4, 5, 6, 7, 8, 14])

# df_data = df_data[1:]
new_rate = []
no_rating = []
brand = []
for j in df_data['rating']:

    new_rate.append(0) if j == '|' else new_rate.append(float(j))
for i in df_data['rating_count']:
    if(type(i) is str and ',' in i):
        new_i = i.replace(",", "")
        no_rating.append(new_i)
    else:
        no_rating.append(i)
for i in df_data['product_name']:

    brand.append(str(i.split()[0]))
comments = []
comment = [{'user': 'Hello', 'comment': 'Nice Work', 'likes': 2, 'replies': {}}]

for i in range(1465):
    comments.append(comment)

df_data.insert(column='comments', loc=10, value=comments)
df_data.insert(column='brand', loc=2, value=brand)
df_data['rating'] = new_rate
df_data['rating_count'] = no_rating

# print(df_data['product_name'][1])
# df_data.to_csv("C:/amazon/amazon2.csv", index=False)


def product_name(product_id):
    for i in range(len(df_data['product_id'])):
        if df_data['product_id'][i] == product_id:
            return df_data['product_name'][i]
