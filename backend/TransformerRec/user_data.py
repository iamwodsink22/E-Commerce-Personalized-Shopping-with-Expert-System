import random
import pandas as pd
from data import new_rate
print("IN USER DATA")
user_id = []
ages = []
sex = []
fav = []
for i in range(len(new_rate)):
    user_id.append(i)
    ages.append(random.randint(16, 61))
    sex.append(random.sample(['M', 'F'], k=1)[0])
    # fav.append(random.sample(['Computer', 'Clothing',
    #            'Home', 'Shoes', 'Accessories'], k=2))
users = pd.DataFrame(user_id, columns=['user_id'])
users.insert(column='age', loc=1, value=ages)
users.insert(column='sex', loc=2, value=sex)
# users.insert(column='fav', loc=3, value=fav)
users.to_csv("E://Ecommerce_App/backend/amazon/users.csv",index=False)
