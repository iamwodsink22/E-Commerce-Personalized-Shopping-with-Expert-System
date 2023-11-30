
import tensorflow as tf

from metadata import HEADER
def get_dataset_from_csv(csv_file_path, shuffle=False, batch_size=10):
    def process(features):

        product_ids_string = features["sequence_product_ids"]
        sequence_product_ids = tf.strings.split(
            product_ids_string, ",").to_tensor()

        # The last movie id in the sequence is the target movie.
        features["target_product_id"] = sequence_product_ids[:, -1]
        features["sequence_product_ids"] = sequence_product_ids[:, :-1]

        ratings_string = features["sequence_ratings"]

        # sequence_ratings = tf.strings.to_number(
        #     ratings_string, tf.dtypes.float32)

        # The last rating in the sequence is the target for the model to predict.
        target = ratings_string[-1]
        features["sequence_ratings"] = ratings_string[0:-1]

        return features, target

    dataset = tf.data.experimental.make_csv_dataset(
        csv_file_path,
        batch_size=batch_size,
        column_names=HEADER,
        num_epochs=1,
        header=False,
        field_delim="|",
        shuffle=shuffle,
    ).map(process)

    return dataset
