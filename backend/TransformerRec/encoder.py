import tensorflow as tf
from metadata import user_features, VOCABULARY
import math
from metadata import products
from categories import categories
import numpy as np


def input_layer():
    return{
        "user_id": tf.keras.layers.Input(name="user_id", shape=(1,), dtype=tf.string),
        "sequence_product_ids": tf.keras.layers.Input(name="sequence_product_ids", shape=(2-1,), dtype=tf.string),
        "target_product_id": tf.keras.layers.Input(name="target_product_id", shape=(1,), dtype=tf.string),
        "sequence_ratings": tf.keras.layers.Input(name="sequence_ratings", shape=(2-1,), dtype=tf.float32),
        "sex": tf.keras.layers.Input(name="sex", shape=(1,), dtype=tf.string),
        "age": tf.keras.layers.Input(name="age", shape=(1,), dtype=tf.float32),
        # "discounted_price": tf.keras.layers.Input(name="discounted_price", shape=(1,), dtype=tf.int64)
    }


def encoder(inputs):
    encoded_transf = []
    other_f = []
    other_f_name = ['user_id']

    other_f_name.extend(user_features)

    for f in other_f_name:
        vocab = VOCABULARY[f]
        print(vocab)
        print(f)
        idx = tf.keras.layers.StringLookup(
            vocabulary=vocab, mask_token=None, num_oov_indices=0)(inputs[f])
        embedding_dims = int(math.sqrt(len(vocab)))
        embedding_encoder = tf.keras.layers.Embedding(input_dim=len(
            vocab), output_dim=embedding_dims, name=f"{f}_embedding",)
        other_f.append(embedding_encoder(idx))
    if len(other_f) > 1:
        other_f = tf.keras.layers.concatenate(other_f)
    elif len(other_f) == 1:
        other_f = other_f[0]
    else:
        other_f = None

    product_vocab = VOCABULARY['product_id']
    product_idx_lookup = tf.keras.layers.StringLookup(
        vocabulary=product_vocab, mask_token=None, num_oov_indices=0, name='product_index_lookup')
    p_dims = int(math.sqrt(len(product_vocab)))
    p_e_encoder = tf.keras.layers.Embedding(input_dim=len(
        product_vocab), output_dim=p_dims, name=f"product_embedding")

    # price_vocab = VOCABULARY['discounted_price']
    # price_idx_lookup = tf.keras.layers.StringLookup(
    #     vocabulary=price_vocab, mask_token=None, num_oov_indices=0, name='price_lookup')
    # price_dims = int(math.sqrt(len(price_vocab)))
    # price_encoder = tf.keras.layers.Embedding(input_dim=len(
    #     price_vocab), output_dim=price_dims, name='price_embedding')

    # price_vector=products['discounted_price'].to_numpy()
    # price_lookup = tf.keras.layers.Embedding(input_dim=price_vector.shape[0], output_dim=price_vector.shape[1], embeddings_initializer=tf.keras.initializers.Constant(
    #     price_vector), trainable=False, name=f"price_vector")
    # category_em_processor = tf.keras.layers.Dense(
    #     units=p_dims, activation='relu', name=f"process_price_embedding_with_category")

    category_vector = products[categories].to_numpy()
    product_category_lookup = tf.keras.layers.Embedding(input_dim=category_vector.shape[0], output_dim=category_vector.shape[1], embeddings_initializer=tf.keras.initializers.Constant(
        category_vector), trainable=False, name=f"category_vector")
    category_em_processor = tf.keras.layers.Dense(
        units=p_dims, activation='relu', name=f"process_product_embedding_with_category")

    def encode_product(product_id):
        print(product_id)
        p_idx = product_idx_lookup(product_id)

        # price_idx = price_idx_lookup(price)
        # price_embedding = price_encoder(price_idx)

        p_embedding = p_e_encoder(p_idx)

        product_category_vector = product_category_lookup(p_idx)
        encoded_product = category_em_processor(
            tf.keras.layers.concatenate(
                [p_embedding, product_category_vector])
        )
        return encoded_product

    target_product_id = inputs["target_product_id"]

    encoded_target_product = encode_product(
        target_product_id)

    # Encoding sequence movie_ids.
    sequence_product_ids = inputs["sequence_product_ids"]
    encoded_sequence_product = encode_product(
        sequence_product_ids)
    # Create positional embedding.
    position_embedding_encoder = tf.keras.layers.Embedding(
        input_dim=2,
        output_dim=p_dims,
        name="position_embedding",
    )
    positions = tf.range(start=0, limit=2 - 1, delta=1)
    encodded_positions = position_embedding_encoder(positions)
    # Retrieve sequence ratings to incorporate them into the encoding of the movie.
    sequence_ratings = tf.expand_dims(inputs["sequence_ratings"], -1)
    sequence_ratings = tf.keras.layers.Lambda(lambda x: tf.cast(
        x, 'float32'), name='change_to_float')(sequence_ratings)
    # sequence_ratings = tf.strings.to_number(
    #     sequence_ratings, tf.dtypes.float32)

    # Add the positional encoding to the movie encodings and multiply them by rating.
    encoded_sequence_product_with_poistion_and_rating = tf.keras.layers.Multiply()(
        [(encoded_sequence_product + encodded_positions), sequence_ratings]
    )

    # Construct the transformer inputs.
    for encoded_movie in tf.unstack(
        encoded_sequence_product_with_poistion_and_rating, axis=1
    ):
        encoded_transf.append(tf.expand_dims(encoded_movie, 1))
    encoded_transf.append(encoded_target_product)

    encoded_transf = tf.keras.layers.concatenate(
        encoded_transf, axis=1
    )

    return encoded_transf, other_f
