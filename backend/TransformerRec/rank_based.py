from data import df_data
rating_arr = []

for j in df_data['rating_count']:
    mindex = df_data['rating_count'].to_list().index(j)

    if(type(j) is str and ',' in j):
        new_j = j.replace(",", "")
        if (int(new_j) > 10000):

            rating_arr.append(df_data['product_id'][mindex])

rating_arr.sort(reverse=True)
