### Sinhala Songs Lyrics Search Engine-
## Follow the below given instructions accordingly to setup configurations.

 setting up elasticsearch server..
##### 1.) First, install the Elasticsearch engine. (version `7.6.0` is preferred)
##### 2.) Locate the elasticsearch.bat file in `/bin` folder and run the file. ( go to localhost:9200 to check if the server has started)

 creating index "sindu" in elastisearch server..
##### 3.) Run the `create_index.py` file which is located in `Setup-backend` folder using following command. 
       > python create_index.py

 insert data to the index..
##### 4.) Run `insert_data.py` file, located in `Setup-backend` folder using following command.(songs_data.json file must be located in the same directory)
      > python insert_data.py

 Run Demo using Program
##### 5.) Load the `index.html` file , located in the Program folder using a browser.(Google chrome is recommended)
