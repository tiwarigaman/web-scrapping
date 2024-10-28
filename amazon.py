import requests
from bs4 import BeautifulSoup
import csv

# Step 1: Set the URL of the website you want to scrape
url = 'https://www.amazon.in'

# Step 2: Send a GET request to fetch the content of the webpage
response = requests.get(url)

# Step 3: Check if the request was successful
if response.status_code == 200:
    print("Successfully fetched the webpage!")
else:
    print(f"Failed to retrieve the webpage. Status code: {response.status_code}")
    exit()

# Step 4: Parse the content using BeautifulSoup
soup = BeautifulSoup(response.content, 'html.parser')

# Step 5: Extract data (headings and links)
headings = soup.find_all('h1')
links = soup.find_all('a')

# Step 6: Print extracted data
print("Headings:")
for heading in headings:
    print(heading.text)

print("\nLinks:")
for link in links:
    print(link.get('href'))

# Step 7: Save data to files
# Save headings to a text file
with open('headings.txt', 'w') as file:
    for heading in headings:
        file.write(heading.text + '\n')

# Save links to a CSV file
with open('links.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['Link'])
    for link in links:
        writer.writerow([link.get('href')])
