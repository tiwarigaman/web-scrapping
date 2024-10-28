from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

# Your scraping logic goes here
def scrape_data():
    url = "https://www.amazon.in"  # Replace with your target URL
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    # Example data extraction (modify as per your requirement)
    data = []
    for item in soup.find_all("div", class_="product"):
        title = item.find("h2").text
        price = item.find("span", class_="price").text
        link = item.find("a")["href"]
        data.append({"title": title, "price": price, "link": link})

    return data

# API endpoint to return scraped data
@app.route('/api/data', methods=['GET'])
def get_data():
    data = scrape_data()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
