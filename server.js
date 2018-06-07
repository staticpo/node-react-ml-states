const express = require('express');
const app = express();
const port = process.env.PORT || 8081;

var http = require('http');
var https = require('https');



app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});


//app.get('/state/:id', function (req, res) {
   
	/*

		{
		  "id": "UY-RO",
		  "name": "Rocha",
		  "country": {
		    "id": "UY",
		    "name": "Uruguay"
		  },
		  "geo_information": null,
		  "cities": [
		    {
		      "id": "TUxVQ0FHVWNmYTJk",
		      "name": "Aguas Dulces"
		    },
		    {
		      "id": "TUxVQ0JBTDE5ZmE",
		      "name": "Balneario La Esmeralda"
		    },
		    {
		      "id": "TUxVQ0JBUjM4MTA1",
		      "name": "Barra de Valizas"
		    },
		    {
		      "id": "TUxVQ1ZFTDhlZWM3",
		      "name": "Velázquez"
		    }
		  ]
		}


   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      var users = JSON.parse(data);
      var user = users["user" + req.params.id];
      console.log(user);
      res.end(JSON.stringify(user));
   });
	*/

	
/*
	fetch('https://api.mercadolibre.com/classified_locations/countries/BR', { method: 'GET', headers: headers })
    	.then(res => res.json())
    	.then(json => console.log(json));
    	*/
    	/*
    fetch('https://api.twitter.com/1.1/help/tos.json', {
	  method: 'GET',
	  headers: {'Accept': 'application/json'}
	}).then(response => {
		
		return response.json();
	}).catch(err => {console.log(err);});
*/
/*
	fetch('https://en.wikipedia.org/w/api.php?action=query&titles=Albert%20Einstein&prop=info&format=json&callback=foo')
    	.then(res => { 
    		return res.text();
    	})
    	.then(body => console.log("ASDQWEASDQWE" + body))
    	.catch(err => {console.log(err);});
*/
/*
	// Las opciones que seran usadas en la peticion 
	var options = {
	   host: 'localhost',
	   port: '80',
	   path: '/index.htm'  
	};


	// Hacemos la peticion al server.
	var req = http.request(options, function(response) {
	   
		// Se actualiza el stream continuamente con datos
		var body = '';
		response.on('data', function(data) {
			body += data;
		});

		response.on('end', function() {
			// los datos se recibieron completos.
			console.log(body);
			res.send({ express: body });
		});

	});
	req.end();


});
*/


app.get('/BR', async (req, res, next) => {
  try {
  	//https://api.mercadolibre.com/classified_locations/countries/BR
	var url = 'https://api.mercadolibre.com/classified_locations/countries/BR';
	apiMeli(url, function(err, data) {
		if (err) { // Check for the error and throw if it exists.
			res.send({ express: err });
		} 
		else {
			response = data.states;
			response.forEach(function(singleitem) {
			    singleitem.type = "State";
			});

			//console.log(response);
			res.send({ express: response });
		} 
	});

    
  } catch (e) {
    //this will eventually be handled by your error handling middleware
    console.log(e);
  }
});


//Get the cities of any given state
app.get('/cities/:id', async (req, res, next) => {
  try {
  	//https://api.mercadolibre.com/classified_locations/states/id
	var url = 'https://api.mercadolibre.com/classified_locations/states/' + req.params.id;
	apiMeli(url, function(err, data) {
		if (err) { // Check for the error and throw if it exists.
			res.send({ express: err });
		} 
		else {
			response = data.cities;
			response.forEach(function(singleitem) {
			    singleitem.type = "City";
			});

			//console.log(response);
			res.send({ express: response });
		}
	});
    
  } catch (e) {
    //this will eventually be handled by your error handling middleware
    console.log(e);
  }
});


//Get the neighborhoods of any given city
app.get('/neighborhoods/:id', async (req, res, next) => {
  try {
  	//https://api.mercadolibre.com/classified_locations/cities/id
	var url = 'https://api.mercadolibre.com/classified_locations/cities/' + req.params.id;
	apiMeli(url, function(err, data) {
		if (err) { // Check for the error and throw if it exists.
			res.send({ express: err });
		} 
		else {
			response = data.neighborhoods;
			response.forEach(function(singleitem) {
			    singleitem.type = "Neighborhoods";
			});

			//console.log(response);
			res.send({ express: response });
		}
	});
    
  } catch (e) {
    //this will eventually be handled by your error handling middleware
    console.log(e);
  }
});



app.listen(port, () => console.log(`Listening on port ${port}`));


function apiMeli(url, callback) {
	https.get(url, function (res) {
		res.on('data', function (d) {
			var json = JSON.parse(d);
			callback(null, json);
		});
		
		res.on('error', function (e) {
			console.error(e);
			callback("Error", null);
		});
	});
}

