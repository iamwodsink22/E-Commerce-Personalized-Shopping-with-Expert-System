import pandas as pd
import math
import random
x=pd.read_csv("C:/amazon-products.csv")

x.fillna(value={"Category":"|"},inplace=True)
new_desc=[]
ratings=[]
categories=[]
sp=[]
desc=list(x['About Product'])


for i in desc:
    if i is not None:
        
        new_str=str(i).replace("Make sure this fits by entering your model number.","")
        new_str=str(new_str).replace("|","")
        new_desc.append(new_str)
for j in range(len(desc)):
    rating=random.randint(0,5)
    ratings.append(rating)

for f in x['Category']:
    if f is None or f=="":
        f='|'
    categories.append(f)

for w in x["Selling Price"]:
    if w =='nan':
        print('nan')
        new_p=10
    else:
        new_p=str(w).replace('$',"")
    sp.append(float(new_p))

    
x["About Product"]=new_desc
x['Selling Price']=sp
x['Category']=categories
x.insert(column='ratings',loc=8,value=ratings)


x=x.rename(columns={'Uniq Id':'product_id','Product Name':'product_name','About Product':'about_product','Selling Price':'discounted_price','Image':'img_link','Category':'categories'})
x.to_csv("D:/amazon-products2.csv",index=False)
