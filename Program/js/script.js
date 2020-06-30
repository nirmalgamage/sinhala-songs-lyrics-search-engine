 var txt = "";
   var jsn= null;
   //document.getElementById("took").innerHTML = "hi dear";
   var baseUrl = "http://localhost:9200/sindu/_search";
      var mains = "";
	  var search_term = "";
   var requestbody = null;
   var query_identifier="normal";
   var table = "";
   var step = 0;
   
	  
   function loadResults(){
      refresh();
     //alert("hit");
	 search_term = document.getElementById("searchtext").value;
	 document.getElementById("tag").innerHTML = "සෙවුම් පාඨය  \'"+search_term+" \' සදහා නිර්දේශ : -";
	 document.getElementById("tag").style.display="block";
	 process_query(search_term);
	 
	  //process_query(search_term);
       console.log(search_term);
	   console.log(requestbody);
      var contextUrl = baseUrl;
	  
	  var xmlhttp = new XMLHttpRequest();
	  xmlhttp.responseType="text";
	  xmlhttp.open("POST",contextUrl,true);
	  xmlhttp.setRequestHeader('Content-type', 'application/json');
	  
	  xmlhttp.addEventListener("load", function(){
	     //if(xmlhttp.readystate == 4 && xmlhttp.status==200){
		    //alert("hi der");
		    var fullResp = JSON.parse(xmlhttp.responseText);
			txt = xmlhttp.responseText;
			jsn= fullResp;
			var results = fullResp.hits.hits;
			if(results.length==0){
			  requestbody.query.multi_match.operator="or";////setting operator as OR to get better results...........
			  step =1;
			  results = secondattempt();
			  return;
			}
			
			var tabletop = "<table><tr><th>නම </th><th>රේටිංග්ස් </th><th>ඇල්බමය </th><th>ගායකයා </th><th>ගායකයාගේ රේටිංග්ස් </th><th>පැදිපෙළ </th></tr>";
			var main = "";
			
			for(i=0;i<results.length;i++){
			   var obj = results[i]._source;
			   main =main + "<tr><td>" + obj.sinhala_song_name + "</td><td>" + obj.song_rating + "</td><td>" + obj.sinhala_album + "</td><td>" + obj.sinhala_artist + "</td><td>" + obj.artist_rating +"</td><td>" + obj.lyrics +"</td></tr>"; 
			}
			
			table = tabletop + main + "</table>";
			mains = main;
			//txt = strings;
			document.getElementById("took").innerHTML = table;
		// }
	  });
	  xmlhttp.send(JSON.stringify(requestbody));
	  txt =xmlhttp.response;
	  
   };
   document.getElementById("btn").addEventListener("click", loadResults);
   
   function process_query(search_term){
	  search_term = search_term.replace(/\s*$/,'');//remove last spaces......
	  var removables = ['ගැන','සිංදු','ගී',"songs"];
	  for(i=0;i<removables.length;i++){
	     if (search_term.includes(removables[i])){
		     search_term = search_term.replace(removables[i],"");
		 }
	  
	  }
	  
	  var top_rated = ["top rated","most rated",,"rated","top","සුපිරි","හිට්ස්" ,"හොඳම","hits","hit"];
      var medium_rated = ["medium rated", "average songs","medium"];
      var low_rated = ["low rated","low"];
	  
	  for(i=0;i<top_rated.length;i++){
	     if (search_term.includes(top_rated[i])){
		    console.log("top");
		    query_identifier="top";
			search_term =search_term.replace(top_rated[i],"");  ///remove the top part for the search term..
		
		 }
	  }
	  for(i=0;i<medium_rated.length;i++){
	     if (search_term.includes(medium_rated[i])){
		    query_identifier="medium";
		 }
	  }
	  for(i=0;i<low_rated.length;i++){
	     if (search_term.includes(low_rated[i])){
		    query_identifier="low";
		 }
	  }
	  
	  if (query_identifier=="normal"){
	     requestbody = {
           "query":{
            "multi_match": {
                "query":search_term,
                 "operator": "or", 
                  "fields": ["lyrics","eng_album","sinhala_artist","eng_artist","sinhala_album","sinhala_song_name","eng_song_name"]
                       }
                 }
                 };
		 
	  }
	 if(query_identifier=="top"){///////////TOP SONGS .....heree
	    if (search_term.replace(/\s/g, '').length!=0){////check if search term contains keywords...
		   search_term = search_term.replace(/\s/g, '');
		   requestbody =  {
           "query":{
            "multi_match": {
                "query":search_term,
                 "operator": "and", 
                  "fields": ["lyrics","eng_album","sinhala_artist","eng_artist","sinhala_album","sinhala_song_name","eng_song_name"]
				   
            
                       }
                 }
                 , "sort" : {
            "song_rating":{"order":"desc"}
           }
                 }
;
		
		}
		else{
	       requestbody = {
          "query": {
            "range" : {
                "song_rating": {
                    "gte" : 10,
                    "lte" : 14
                   }
                 }
              }
            ,
             "sort" : {
            "song_rating":{"order":"desc"}
           }
          };
		}
	 }
	 
	if (query_identifier =="medium"){
	    requestbody = {
             "query": {
                "range" : {
                "song_rating": {
                    "gte" : 5,
                    "lte" : 9
                }
               }
              }
              ,
              "sort" : {
            "song_rating":{"order":"desc"}
    }

    };
	}
	
	if(query_identifier=="low"){
	   requestbody = {
             "query": {
                  "range" : {
                    "song_rating": {
                          "gte" : 1,
                          "lte" : 4
                     }
                     }
                   }
                  ,
               "sort" : {
               "song_rating":{"order":"desc"}
           }

          };
	}
	
	
	 
   };
   
   function refresh(){
       txt = "";
       jsn= null;
       mains = "";
	   search_term = "";
    requestbody = null;
    query_identifier="normal";
    table = "";
   }
   
   function secondattempt(){
     var results2 = null;
      var xml = new XMLHttpRequest();
	  xml.responseType="text";
	  xml.open("POST",baseUrl,true);
	  xml.setRequestHeader('Content-type', 'application/json');
	  xml.addEventListener("load", function(){
	    var fullResp2 = JSON.parse(xml.responseText);
			txt = xml.responseText;
			jsn= fullResp2;
			 results = fullResp2.hits.hits;
			 var tabletop = "<table><tr><th>නම </th><th>රේටිංග්ස් </th><th>ඇල්බමය </th><th>ගායකයා </th><th>ගායකයාගේ රේටිංග්ස් </th><th>පැදිපෙළ </th></tr>";
			var main = "";
			
			for(i=0;i<results.length;i++){
			   var obj = results[i]._source;
			   main =main + "<tr><td>" + obj.sinhala_song_name + "</td><td>" + obj.song_rating + "</td><td>" + obj.sinhala_album + "</td><td>" + obj.sinhala_artist + "</td><td>" + obj.artist_rating +"</td><td>" + obj.lyrics +"</td></tr>"; 
			}
			
			table = tabletop + main + "</table>";
			mains = main;
			//txt = strings;
			document.getElementById("took").innerHTML = table;
			 
	  });
	  xml.send(JSON.stringify(requestbody));
	  
   }
