
import tensorflow as tf
from encoder import input_layer, encoder
from dataset_csv import get_dataset_from_csv
# from tf import keras


hidden_units = [128, 256]


def create_model():
    inputs = input_layer()
    encoded_features, other_feat = encoder(inputs)
    att_output = tf.keras.layers.MultiHeadAttention(
        num_heads=3, key_dim=encoded_features.shape[2], dropout=0.1)(encoded_features, encoded_features)
    att_output = tf.keras.layers.Dropout(0.1)(att_output)
    x1 = tf.keras.layers.Add()([encoded_features, att_output])
    x1 = tf.keras.layers.LayerNormalization()(x1)
    x2 = tf.keras.layers.LeakyReLU()(x1)
    x2 = tf.keras.layers.Dense(units=x2.shape[-1])(x2)
    x2 = tf.keras.layers.Dropout(0.1)(x2)
    encoded_features = tf.keras.layers.Add()([x1, x2])
    encoded_features = tf.keras.layers.LayerNormalization()(encoded_features)
    features = tf.keras.layers.Flatten()(encoded_features)
    if other_feat is not None:
        features = tf.keras.layers.concatenate(
            [features, tf.keras.layers.Reshape(
                [other_feat.shape[-1]])(other_feat)]
        )
    for num_units in hidden_units:
        features = tf.keras.layers.Dense(num_units)(features)
        features = tf.keras.layers.BatchNormalization()(features)
        features = tf.keras.layers.LeakyReLU()(features)
        features = tf.keras.layers.Dropout(0.1)(features)

    outputs = tf.keras.layers.Dense(units=1)(features)
    model = tf.keras.Model(inputs=inputs, outputs=outputs)
    return model


model = create_model()
model.compile(
    optimizer=tf.keras.optimizers.Adagrad(learning_rate=0.01),
    loss=tf.keras.losses.MeanSquaredError(),
    metrics=[tf.keras.metrics.MeanAbsoluteError()],
)
model.summary()


train_dataset = get_dataset_from_csv(
    "E://Ecommerce_App/backend/amazon/train_data.csv", shuffle=True, batch_size=1)

# train_dataset_to_numpy = list(train_dataset.as_numpy_iterator())
# print(tf.shape(train_dataset_to_numpy))
dataset_length = [i for i, _ in enumerate(train_dataset)][-1] + 1
print(f"size{dataset_length}")

model.fit(train_dataset, epochs=5)
print("hello")

test_dataset = get_dataset_from_csv("E://Ecommerce_App/backend/amazon/train_data.csv", batch_size=12)
_, rmse = model.evaluate(test_dataset, verbose=0)
print(f"Test MAE: {round(rmse, 3)}")
