import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import os
import tensorflow as tf
import random
os.chdir(r"C:/amazon")
products = pd.read_csv('../amazon/amazon2.csv',
                       usecols=[3, 0, 1, 2, 4, 8])
products.to_csv("E://Ecommerce_App/backend/amazon/products.csv",index=False)
