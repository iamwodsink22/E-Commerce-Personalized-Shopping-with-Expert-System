import random


import pandas as pd
import time
df_data=pd.read_csv('D:/amazon-products2.csv')
user_id = []
product_id = []
ts = []
for i in range(len(df_data['product_id'])):
    user_id.append(random.randint(0, 1000))
    ts.append(time.time())

ratings = pd.DataFrame(user_id, columns=['user_id'])
ratings.insert(column='product_id', loc=1, value=df_data['product_id'])
ratings.insert(column='rating', loc=2, value=df_data['ratings'])
ratings.insert(column='timestamp', loc=3, value=ts)
ratings.to_csv("C:/E-Commerce-Personalized-Shopping-with-Expert-System/backend/amazon/ratings.csv",index=False)
