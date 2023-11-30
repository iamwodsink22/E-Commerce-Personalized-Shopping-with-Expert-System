import tensorflow as tf
import pandas as pd
import numpy as np

from categories import categories
users=pd.read_csv("E://Ecommerce_App/backend/amazon/users.csv")
products=pd.read_csv("E://Ecommerce_App/backend/amazon/products.csv")
ratings=pd.read_csv("E://Ecommerce_App/backend/amazon/ratings.csv")
users["user_id"] = users["user_id"].apply(lambda x: f"user_{x}")
users["age"] = users["age"].apply(lambda x: f"age_{x}")
users["sex"] = users["sex"].apply(lambda x: f"sex_{x}")



products["product_id"] = products["product_id"].apply(lambda x: f"{x}")
products["discounted_price"] = products["discounted_price"].apply(
    lambda x: f"discounted_price_{x}")

ratings["product_id"] = ratings["product_id"].apply(lambda x: f"{x}")
ratings["user_id"] = ratings["user_id"].apply(lambda x: f"user_{x}")
ratings["rating"] = ratings["rating"].apply(lambda x: str(x))

for c in categories:
    products[c] = products["category"].apply(
        lambda values: int(c in values.split("|"))
    )
ratings_group = ratings.sort_values(by=["timestamp"]).groupby("user_id")

ratings_data = pd.DataFrame(
    data={
        "user_id": list(ratings_group.groups.keys()),
        "product_ids": list(ratings_group.product_id.apply(list)),
        "ratings": list(ratings_group.rating.apply(list)),
        "timestamps": list(ratings_group.timestamp.apply(list)),
    }
)

sequence_length = 2
step_size = 1


def create_sequences(values, window_size, step_size):
    print(values)
    sequences = []
    start_index = 0
    while True:
        end_index = start_index + window_size
        seq = values[start_index:end_index]
        if len(seq) < window_size:
            seq = values[-window_size:]
            if len(seq) == window_size:
                sequences.append(seq)
            break
        sequences.append(seq)
        start_index += step_size
    return sequences


ratings_data.product_ids = ratings_data.product_ids.apply(
    lambda ids: create_sequences(ids, sequence_length, step_size)
)
ratings_data.ratings = ratings_data.ratings.apply(
    lambda ids: create_sequences(ids, sequence_length, step_size)
)
print(ratings_data)
del ratings_data["timestamps"]

ratings_data_products = ratings_data[["user_id", "product_ids"]].explode(
    "product_ids", ignore_index=True
)
ratings_data_rating = ratings_data[["ratings"]].explode(
    "ratings", ignore_index=True)
ratings_data_transformed = pd.concat(
    [ratings_data_products, ratings_data_rating], axis=1)
ratings_data_transformed = ratings_data_transformed.join(
    users.set_index("user_id"), on="user_id"
)
print(ratings_data_transformed.columns)
ratings_data_transformed.product_ids = ratings_data_transformed.product_ids.apply(
    lambda x:
    ",".join(str(x))
)
ratings_data_transformed.ratings = ratings_data_transformed.ratings.apply(
    lambda x: x
)
print(ratings_data_transformed.columns)
print(f"newrated{type(ratings_data_transformed.ratings[0])}")
ratings_data_transformed.rename(
    columns={"product_ids": "sequence_product_ids",
             "ratings": "sequence_ratings"},
    inplace=True,
)
print(ratings_data_transformed.columns)
# CSV_HEADER = list(ratings_data_transformed.columns)

# CATEGORICAL_FEATURES_WITH_VOCABULARY = {
#     "user_id": list(users.user_id.unique()),
#     "movie_id": list(products.product_id.unique()),
#     "sex": list(users.sex.unique()),
#     "age_group": list(users.age.unique()),
#     "fav": list(users.fav.unique()),
# }
# USER_FEATURES = ["sex", "age_group", "occupation"]

# PRODUCT_FEATURES = ["category", "price", "brand"]
random_selection = np.random.rand(len(ratings_data_transformed.index)) <= 0.85

train_data = ratings_data_transformed[random_selection]
test_data = ratings_data_transformed[~random_selection]

train_data.to_csv("E://Ecommerce_App/backend/amazon/train_data.csv",
                  header=False,index=False)
test_data.to_csv("E://Ecommerce_App/backend/amazon/test_data.csv",
                  header=False,index=False)

