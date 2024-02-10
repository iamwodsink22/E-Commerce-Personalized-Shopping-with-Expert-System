import random
from data import new_rate
from data import df_data
import pandas as pd
import time

user_id = []
product_id = []
ts = []
for i in range(len(new_rate)):
    user_id.append(random.randint(0, 200))
    ts.append(time.time())

ratings = pd.DataFrame(user_id, columns=['user_id'])
ratings.insert(column='product_id', loc=1, value=df_data['product_id'])
ratings.insert(column='rating', loc=2, value=new_rate)
ratings.insert(column='timestamp', loc=3, value=ts)
ratings.to_csv("E://Ecommerce_App/backend/amazon/ratings.csv",index=False)
