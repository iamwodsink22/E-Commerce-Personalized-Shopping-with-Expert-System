from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
from data import df_data

cosine_sim = cosine_similarity(df_data.fillna(0))
similarity_df = pd.DataFrame(
    cosine_sim, index=df_data.index, columns=df_data.index)


def get_recommendations(movie_title, df_data, similarity_df):
    movie_ratings = df_data[movie_title]
    similar_scores = similarity_df[movie_ratings.name]
    similar_movies = similar_scores.sort_values(ascending=False).index[1:11]
    return similar_movies


movie_title = "Borosil Jumbo 1000-Watt Grill Sandwich Maker (Black)"
recommended_movies = get_recommendations(movie_title, df_data, similarity_df)
print("Recommended movies for {}: \n{}".format(movie_title, recommended_movies))
