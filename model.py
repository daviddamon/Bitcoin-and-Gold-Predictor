import pandas as pd
import numpy as np
import tensorflow as tf
import tensorflow.keras
import matplotlib.pyplot as plt
from tensorflow.keras.layers import Activation, Dense, Flatten, BatchNormalization, Conv2D, MaxPool2D
import seaborn as sns
from keras.layers import Input,Dense
from tensorflow.keras.models import Model
from tensorflow.keras.layers.experimental import preprocessing
from tensorflow.keras import layers
import quandl
from config import quandl_key
# print(tf.__version__)
# tensorflow V2.1.0
# load data
# high = input('today high: ')
# high = float(high)
# low = input('today low: ')
# low = float(low)

def predict_(high, low):
    quandl.ApiConfig.api_key = quandl_key
    df = quandl.get('BITSTAMP/USD')
    data = df

    # reshape data so that it is more workable
    data.reset_index()
    # data = data.drop(columns='Date')
    test = data.tail(20)

    # get needed columns
    High = test.High.values
    Low = test.Low.values
    Volume = test.Volume.values
    Last = test.Last.values

    # reshape data 
    X = []
    y = []

    for i in range(len(High)):
        row = []
        yrow = []
        row.append(High[i])
        row.append(Low[i])
    #     row.append(Volume[i])
        yrow.append(Last[i])
        X.append(row)
        y.append(yrow)
    X = np.array(X)
    y = np.array(y)
    X

    # split that data
    from sklearn.model_selection import train_test_split

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)

    # normalization
    model = tf.keras.Sequential([
        layers.Dense(50, activation='relu', input_dim=2),
        layers.Dense(50, activation='relu'),
        layers.Dense(50, activation='relu'),
        layers.Dense(50, activation='relu'),
        layers.Dense(25, activation='relu'),
        layers.Dense(units=1)
    ])
    model.compile(
        optimizer=tf.optimizers.Adam(learning_rate=0.0001),
        loss='mean_absolute_error', metrics=['accuracy'])

    history = model.fit(
        X_train, y_train,
        epochs=700,
        # suppress logging
        verbose=0,
        # Calculate validation results on 20% of the training data
        validation_split = 0.2)
    
    predict = model.predict([[high,low]])
    return(predict[0][0])
