import elasticsearch

#Elasticsearch configuration


es = elasticsearch.Elasticsearch()

request_body = {
  "mappings": {
      "properties": {
        "artist_rating": {
          "type": "integer"
        },
        "eng_album": {
          "type": "text",
          "analyzer": "whitespace"
        },
        "eng_artist": {
          "type": "text",
          "analyzer": "whitespace"
        },
        "eng_song_name": {
          "type": "text",
          "analyzer": "whitespace"
        },
        "lyrics": {
          "type": "text",
          "analyzer": "whitespace"
        },
        "sinhala_album": {
          "type": "text",
          "analyzer": "whitespace"
        },
        "sinhala_artist": {
          "type": "text",
          "analyzer": "whitespace"
        },
        "sinhala_song_name": {
          "type": "text",
          "analyzer": "whitespace"
        },
        "song_rating": {
          "type": "integer"
        },
        "timestamp": {
          "type": "date"
        },
        "track_id": {
          "type": "keyword"
        }
      }
    
  }
}



es.indices.create(index = 'sindu', body = request_body)
