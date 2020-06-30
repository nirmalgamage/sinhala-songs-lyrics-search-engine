# import Python's JSON library for its loads() method
import json

# import time for its sleep method
from time import sleep

# import the datetime libraries datetime.now() method
from datetime import datetime

# use the elasticsearch client's helpers class for _bulk API
from elasticsearch import Elasticsearch, helpers


# declare a client instance of the Python Elasticsearch library
client = Elasticsearch("localhost:9200")

def get_data_from_text_file(self):
# the function will return a list of docs
    return [l.strip() for l in open(str(self), encoding="utf8", errors='ignore')]

# call the function to get the string data containing docs
docs = get_data_from_text_file("songs_data.json")

# print the length of the documents in the string
print ("String docs length:", len(docs))

doc_list = []

# use Python's enumerate() function to iterate over list of doc strings
for num, doc in enumerate(docs):

# catch any JSON loads() errors
    try:
        doc = doc.replace("True", "true")
        doc = doc.replace("False", "false")
        dict_doc = json.loads(doc)
        dict_doc["timestamp"] = datetime.now()
        dict_doc["_id"] = num
        doc_list += [dict_doc]

    except json.decoder.JSONDecodeError as err:
    # print the errors-
        print ("ERROR for num:", num, "-- JSONDecodeError:", err, "for doc:", doc)

        print ("Dict docs length:", len(doc_list))

try:
    print ("\nAttempting to index the list of docs using helpers.bulk()")
    resp = helpers.bulk(client,doc_list,index = "sindu",doc_type = "_doc")
    print ("helpers.bulk() RESPONSE:", resp)
    print ("helpers.bulk() RESPONSE:", json.dumps(resp, indent=4))
except Exception as err:

# print any errors returned while making the helpers.bulk() API call
    print("Elasticsearch helpers.bulk() ERROR:", err)
    quit()
