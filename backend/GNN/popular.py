from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
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
@app.get('/popular')
def popular():
    ratings=[]
    for i in range(len(df_data)):
        ratings.append(df_data.iloc[i].to_dict())
    popular=sorted(ratings,key=lambda x:x['ratings'],reverse=True)
    print(popular)
    return{'popular':popular[:15]}
        