const express = require('express');
const app = express();
const port = process.env.PORT || 8081;


app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});


app.get('/state/:id', function (req, res) {
   
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
		      "id": "TUxVQ0JBUjE4NWNj",
		      "name": "Barra del Chuy"
		    },
		    {
		      "id": "TUxVQ0NBQjY1MmQ1",
		      "name": "Cabo Polonio"
		    },
		    {
		      "id": "TUxVQ0NBUzQxYzlh",
		      "name": "Castillos"
		    },
		    {
		      "id": "TUxVQ0NIVThjNTFm",
		      "name": "Chuy"
		    },
		    {
		      "id": "TUxVQ0NPUzQzZDk0",
		      "name": "Costa Azul"
		    },
		    {
		      "id": "TUxVQ0VMUDM0OTI",
		      "name": "El Palmar"
		    },
		    {
		      "id": "TUxVQ0xBWmFlYzJh",
		      "name": "La Coronilla"
		    },
		    {
		      "id": "TUxVQ0xBWmYzMmU0",
		      "name": "La Palma"
		    },
		    {
		      "id": "TUxVQ0xBWmQ4YTc1",
		      "name": "La Paloma"
		    },
		    {
		      "id": "TUxVQ0xBWjQyNGEy",
		      "name": "La Pedrera"
		    },
		    {
		      "id": "TUxVQ0xBR2JkZGMy",
		      "name": "Laguna de Rocha"
		    },
		    {
		      "id": "TUxVQ0xBUzcyNDI",
		      "name": "Las Garzas"
		    },
		    {
		      "id": "TUxVQ0xBU2YyZDU1",
		      "name": "Lascano"
		    },
		    {
		      "id": "TUxVQ09UUjQxODQ",
		      "name": "Otras"
		    },
		    {
		      "id": "TUxVQ1BVTjE5ZTIw",
		      "name": "Punta del Diablo"
		    },
		    {
		      "id": "TUxVQ1JPQzFjOWE5",
		      "name": "Rocha"
		    },
		    {
		      "id": "TUxVQ1NBTmVhNWRk",
		      "name": "Santa Teresa"
		    },
		    {
		      "id": "TUxVQ1ZFTDhlZWM3",
		      "name": "Velázquez"
		    }
		  ]
		}

	*/

   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      var users = JSON.parse(data);
      var user = users["user" + req.params.id];
      console.log(user);
      res.end(JSON.stringify(user));
   });



});


app.listen(port, () => console.log(`Listening on port ${port}`));