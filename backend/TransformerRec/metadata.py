
import pandas as pd
import numpy as np
import tensorflow as tf
from data_preprocessing import ratings_data_transformed
users=pd.read_csv("E://Ecommerce_App/backend/amazon/users.csv")
products=pd.read_csv("E://Ecommerce_App/backend/amazon/products.csv")

HEADER=list(ratings_data_transformed.columns)
print(HEADER)
VOCABULARY = {
    "user_id": list(users.user_id.unique()),
    "product_id": list(products.product_id.unique()),
    "sex": list(users.sex.unique()),
    "age": list(users.age.unique()),
    
    "discounted_price": list(products.discounted_price.unique()),
}
user_features = ["sex", "age" ]

PRODUCT_FEATURES = ["category", "discounted_price"]
