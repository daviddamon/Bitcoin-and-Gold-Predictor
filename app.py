# Import Dependencies
from flask import Flask, render_template, redirect, request, jsonify
from flask_pymongo import PyMongo
import pymongo
import coin_scraping
import os 
import json
from tensorflow import keras
import pandas as pd


# Flask Setup

bit_model = keras.models.load_model("bitcoin")
gold_model = keras.models.load_model("gold")

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/bitcoin_app"
mongo = PyMongo(app)

conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

# set database 
db=client.bitcoin_app

@app.route("/")
#This route can be edited to reflect machine learning addition
def index():
    return render_template("index.html")

@app.route("/news")
def news():
    coin = mongo.db.articles
    articles = coin_scraping.scrape()
    
    #Updating Mongodb using update and upsert
    coin.update({}, articles, upsert=True)
    rendered_articles = mongo.db.articles.find_one()
    return render_template("news.html", rendered_articles = rendered_articles)

@app.route("/history")
def history_page():
    return render_template("history.html")

@app.route("/comparison")
def comparison():
    return render_template("comparison.html")

@app.route("/about_the_developers")
def about():
    return render_template("about_the_developers.html")

@app.route('/predict', methods=['POST'])
def predict():
    high = float(request.form['high'])
    low = float(request.form['low'])
    prediction = {'prediction':bit_model.predict([[high, low]])[0][0],
                    'high':high,
                    'low':low
                }

    return render_template("predict.html",prediction=prediction)

@app.route('/gold_predict', methods=['POST'])
def gold_predict():
    high = float(request.form['high'])
    low = float(request.form['low'])
    gold_prediction = {'gold_prediction':gold_model.predict([[high, low]])[0][0],
                    'high':high,
                    'low':low
                }

    return render_template("gold_predict.html",gold_prediction=gold_prediction)

@app.route("/api/v1")
def bit_analysis():
    label_df = pd.read_csv('resources/bitcoin_actual_values.csv')
    predata_df = pd.read_csv('resources/bitcoin_predictions.csv')

    l_data = label_df.labels.values
    p_data = predata_df.predictions.values

    p_data = p_data.tolist()
    l_data = l_data.tolist()

    json = {}
    json['predictions'] = p_data
    json['labels'] = l_data
    return jsonify(json)

@app.route("/api/gold")
def gold_analysis():
    gold_df = pd.read_csv('resources/30_Days_Gold_Predict.csv')

    date = gold_df.Date.values
    price = gold_df.Price.values
    prediction = gold_df.Prediction.values
    low = gold_df.Low.values
    high = gold_df.High.values

    date = date.tolist()
    price = price.tolist()
    prediction = prediction.tolist()
    low = low.tolist()
    high = high.tolist()

    json = {}
    json['date'] = date
    json['price'] = price
    json['prediction'] = prediction
    json['low'] = low
    json['high'] = high
    return jsonify(json)

@app.route("/api/compare")
def compare_analysis():
    gold_df = pd.read_csv('resources/Cleaned_10_Yr_Gold_Data.csv')

    date = gold_df.Date.values
    price = gold_df.Price.values    
    btc = gold_df.BTC_Price.values
    sp = gold_df.SP_Price.values

    date = date.tolist()
    price = price.tolist()    
    btc = btc.tolist()
    sp = sp.tolist()

    json = {}
    json['date'] = date
    json['price'] = price
    json['BTC_Price'] = btc
    json['SP_Price'] = sp
    return jsonify(json)

if __name__ == '__main__':
    app.run(debug=True)
    