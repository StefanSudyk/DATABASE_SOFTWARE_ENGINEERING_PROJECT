import requests

base = "http://127.0.0.1:5000/"

response = requests.get(base + "get/test_str/1")
print(response.json())