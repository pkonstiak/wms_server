/*
.definícia a inicializácia premenennej: express
.volanie metódy NodeJS ktorej úlohou je načítanie modulu ExpressJS (ExpressJS je modul NodeJS slúžiaci ako web applikačný framework ) a sprístupnenie exportov pre modul ExpressJS
*/
var express = require("express");

/*
.definícia a inicializácia premenennej: server 
.vytvorenie inštancie typu ExpressJS
*/
var server = express();

/*
.definícia a inicializácia premenennej: path
.volanie metódy NodeJS ktorej úlohou je načítanie modulu Path (Path je modul NodeJS poskytujúci spôsob práce s cestami pre priečinky a súbory) 
*/
var path=require('path');

/*
.definícia a inicializácia premenennej: fs
.volanie metódy NodeJS ktorej úlohou je načítanie modulu File Server (File Server je modul NodeJS povoľuje pracovať so súborovým systémom na operačnom systéme, kde beží server) 
*/
var fs = require("fs");

/*
.definícia a inicializácia premenennej: mapnik
.volanie metódy NodeJS ktorej úlohou je načítanie modulu Mapnik (Mapnik je doplnkový modul NodeJS slúžiaci na spracovanie kartografie)
*/
var mapnik = require("mapnik");
/*
.definícia a inicializácia premenennej: generateImage
.volanie metódy NodeJS ktorej úlohou je načítanie JavaScript súboru GetMap 
*/
var generateImage = require('./GetMap.js');

/*
.zapnutie logovania (zaznamenávania) obsahu premennej generateImage do vývojárskej konzoly webového prehliadača - možné zapnúť pomocou F12
*/
console.log(generateImage);

/*
.definícia a inicializácia premenennej: PORT slúžiacej ako parameter pre server
*/
var PORT=3003;


/*
.nastavenie vlastnej ikony pre server
*/
server.use(express.static('icon'));

/*implementácia metódy app.get(path, funkcia middleware) ExpressJS*/
server.get("/wms", function(request, response) {
	/*definícia a inicializácia premennej params  - získanie parametrov z dopytu ExpressJS reprezentácie HTTP požiadavky*/		
	var params=request.query;
	
    /*zapnutie logovania (zaznamenávania) obsahu premennej params do vývojárskej konzoly webového prehliadača*/
	console.log(params);

	/*porovnávanie parametrov vzhľadom na podmienku AK*/
	if (params.SERVICE === 'WMS' && params.REQUEST === 'GetCapabilities' ){            
		/*výpis konkrétnej hlášky do vývojárskej konzoly webového prehladiača*/
		console.log('idem robit get capa')
		/*reprezentácia HTTP odpovede - prenos súboru na zvolenú cestu*/
		response.sendFile(path.join(__dirname, 'XML_cesty_budovy.xml'))
	}
	/*porovnávanie parametrov vzhľadom na podmienku ALEBO AK*/
	else if (params.SERVICE === "WMS"&& params.REQUEST === "GetMap"){
		/*volanie funkcie generateImage s príslušnými parametrami*/
		generateImage(params, response.sendFile.bind(response))	  
    } 
	/*odsek kódu pre ostatné prípady, ktorý sa vykoná pri nesplnení podmienok vyššie*/
	else {
		/*reprezentácia HTTP odpovede - odoslanie odpovede*/
		response.send('nejdem robit get capa')
    }  
  }
);

/*implementácia metódy app.listen(port, funkcia middleware) ExpressJS - defakto spustenie servera - server počúva na danom porste*/
server.listen(PORT, function() {
	/*výpis konkrétnej hlášky do vývojárskej konzoly webového prehladiača*/
    console.log("Server listening on port " + PORT + "!");
});