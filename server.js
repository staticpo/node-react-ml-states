const express = require('express');
const app = express();
const port = process.env.PORT || 8081;

var http = require('http');
var https = require('https');



app.get('/ping', (req, res) => {
  res.send("pong");
});


app.get('/BR', async (req, res, next) => {
  try {
  	//https://api.mercadolibre.com/classified_locations/countries/BR
	var url = 'https://api.mercadolibre.com/classified_locations/countries/BR';
	getApiData(url, function(err, data) {
		if (err) { // Check for the error and throw if it exists.
			res.send({ express: err });
		} 
		else {
			response = data.states;
			response.forEach(function(singleitem) {
			    singleitem.type = "State";
			});

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
	getApiData(url, function(err, data) {
		if (err) { // Check for the error and throw if it exists.
			res.send({ express: err });
		} 
		else {
			response = data.cities;
			response.forEach(function(singleitem) {
			    singleitem.type = "City";
			});

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
	getApiData(url, function(err, data) {
		if (err) { // Check for the error and throw if it exists.
			res.send({ express: err });
		} 
		else {
			response = data.neighborhoods;
			response.forEach(function(singleitem) {
			    singleitem.type = "Neighborhoods";
			});

			res.send({ express: response });
		}
	});
    
  } catch (e) {
    //this will eventually be handled by your error handling middleware
    console.log(e);
  }
});


//Start the server
app.listen(port, () => console.log(`Listening on port ${port}`));



function getApiData(url, callback) {
	https.get(url, function (res) {

		// Se actualiza el stream continuamente con datos
		var body = '';
		res.on('data', function(data) {
		  body += data;
		});

		res.on('end', function() {
			// los datos se recibieron completos.
			var json = JSON.parse(body);
			callback(null, json);
		});

		res.on('error', function (e) {
			console.error(e);
			callback("Error", null);
		});
	});
}

