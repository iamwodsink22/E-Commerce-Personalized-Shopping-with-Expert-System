import pandas as pd
import datetime
df_users=pd.read_csv('D:/E-Commerce-Personalized-Shopping-with-Expert-System-master/E-Commerce-Personalized-Shopping-with-Expert-System-master/backend/GNN/res/Product_Users_Ratings.csv')
timestamps=[]
for i in range(len(df_users)):
    timestamps.append(datetime.datetime.now())
    
df_users.insert(3,"timestamp",timestamps)
print(df_users.head())
df_users.to_csv("D:/ratings.csv",index=False)