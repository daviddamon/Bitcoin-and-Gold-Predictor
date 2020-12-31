#Dependencies
from bs4 import BeautifulSoup
import pandas as pd 
import requests
import pymongo
from splinter import Browser

def init_browser():
    executable_path = {"executable_path": "chromedriver.exe"}
    return Browser("chrome", **executable_path, headless=False)

url = "https://dailyfx.com/bitcoin"

def scrape():

    #Bitcoin News URL
    url = 'https://dailyfx.com/bitcoin'
    
    r = requests.get(url)
    soup = BeautifulSoup(r.content, 'html.parser')


    ##NEWS AND ANALYSIS
    results = soup.findAll("a", class_="dfx-articleListItem jsdfx-articleListItem d-flex mb-3")
    # import pdb; pdb.set_trace()
    
    articles = {}
    counter = 0
    for result in results:
        try:
            # Identify and return title of article
            title = result.find("span", class_="dfx-articleListItem__title jsdfx-articleListItem__title font-weight-bold align-middle").text.strip()
            # Identify and return link to article
            link = result["href"]
            # Identify and return date of publishing
            published = result.find("span", class_="jsdfx-articleListItem__date text-nowrap").text.strip()
            # Print results only if title, price, and link are available
            if (title and link and published):
                key = 'key' + str(counter)
                articles[key] = {
                    #"id": counter,
                    "title": title,
                    "link": link,
                    "date_published": published
                }
                counter+=1

        except AttributeError as e:
            print(e)
    # print(articles)
    return articles


print('Start scraping')
scrape()
print("Finished Scraping")