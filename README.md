### Sinhala Songs Lyrics Search Engine-
## Follow the below given instructions accordingly to setup configurations.

 setting up elasticsearch server..
 - First, install the Elasticsearch engine. (version `7.6.0` is preferred)
 - Locate the elasticsearch.bat file in `/bin` folder and run the file. ( go to localhost:9200 to check if the server has started)

 creating index "sindu" in elastisearch server..
 - Run the `create_index.py` file which is located in `Setup-backend` folder using following command. 
       > python create_index.py

 insert data to the index..
 - Run `insert_data.py` file, located in `Setup-backend` folder using following command.(songs_data.json file must be located in the same directory)
      > python insert_data.py

 Run Demo using Program
 - Load the `index.html` file , located in the Program folder using a browser.(Google chrome is recommended)
