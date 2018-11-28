var path = require("path");
var fs = require("fs");
var mapnik = require("mapnik"); // lib for map rendering

mapnik.register_default_fonts(); // register some default fonts into mapnik
mapnik.register_default_input_plugins(); // same with plugins

function generateImage(arg, sendFile){
var width = Number(arg.WIDTH); // with of map image in pixels
var height = Number(arg.HEIGHT); // height -||-
var BBOX = arg.BBOX.split(',').map(function(elem){
    return Number(elem)}); // bottom left corner coords and top right corner coords of the image 
var layers=(arg.LAYERS).split(',');

var addBudovy=arg.LAYERS.includes('budovy');
var addCesty=arg.LAYERS.includes('cesty');
var addChodniky=arg.LAYERS.includes('chodniky');
var addLavicky=arg.LAYERS.includes('lavicky');
var addCintorin=arg.LAYERS.includes('cintorin');
var addKanalizacia=arg.LAYERS.includes('kanalizacia');
var addOdpad=arg.LAYERS.includes('odpad');
var addSkola=arg.LAYERS.includes('skola');
var addStlpy=arg.LAYERS.includes('stlpy');
var addUbytovanie=arg.LAYERS.includes('ubytovanie');
var addZastavky=arg.LAYERS.includes('zastavky');
var addPark=arg.LAYERS.includes('park');



var map = new mapnik.Map(width, height);
// create new map object with defined width and height



var proj = "+proj=krovak +lat_0=49.5 +lon_0=24.83333333333333 +alpha=30.28813972222222 +k=0.9999 +x_0=0 +y_0=0 +ellps=bessel +towgs84=589,76,480,0,0,0,0 +units=m +no_defs";


var style_park='<Style name="style_park">' + // style for layer "style_budovy"
'<Rule>' +
    '<LineSymbolizer stroke="black" stroke-width="0.2" />' + // style for lines
    '<PolygonSymbolizer fill="#009933"  />' + 
    '<PolygonPatternSymbolizer file="./icon/grass.png" opacity="0.5" transform="scale(0.5,0.5)" />' +// style for polygons
  '</Rule>' +
'</Style>';

var layer_park = '<Layer name="park" srs="'+proj+'">' + // same as above
'<StyleName>style_park</StyleName>' +
'<Datasource>' +
    '<Parameter name="file">' + path.join( __dirname, 'data/park.shp' ) +'</Parameter>' +
    '<Parameter name="type">shape</Parameter>' +
'</Datasource>' +                    
'</Layer>';


var style_budovy='<Style name="style_budovy">' + // style for layer "style_budovy"
'<Rule>' +
'<MaxScaleDenominator>15000</MaxScaleDenominator>'+
'<MinScaleDenominator>10</MinScaleDenominator>'+
    '<LineSymbolizer stroke="black" stroke-width="0.5" />' + // style for lines
    '<PolygonSymbolizer fill-opacity="0.85"  fill="#cc3333"  />' + // style for polygons
  '</Rule>' +
'</Style>';

var layer_budovy = '<Layer name="budovy" srs="'+proj+'">' + // same as above
'<StyleName>style_budovy</StyleName>' +
'<Datasource>' +
    '<Parameter name="file">' + path.join( __dirname, 'data/budovy.shp'  ) +'</Parameter>' +
    '<Parameter name="type">shape</Parameter>' +
'</Datasource>' +                    
'</Layer>';

var style_cesty='<Style name="style_cesty">' + // style for layer "style_cesty"
'<Rule>' +
    '<LineSymbolizer stroke="#a3a3c2"  stroke-width="5" />' + // style for lines
'</Rule>' +
'</Style>';

var layer_cesty = '<Layer name="cesty" srs="'+proj+'">' + // layer "cesty" with spatial reference system
'<StyleName>style_cesty</StyleName>' + // binding of a style used for this layer => "style_cesty"
'<Datasource>' + // definition of a data source
    '<Parameter name="file">' + path.join( __dirname, 'data/cesty.shp' ) +'</Parameter>' + // path to the data file
    '<Parameter name="type">shape</Parameter>' + // file type
'</Datasource>' +
'</Layer>';

var style_chodniky='<Style name="style_chodniky">' + // style for layer "style_chodniky"
'<Rule>' +
'<MaxScaleDenominator>10000</MaxScaleDenominator>'+
'<MinScaleDenominator>10</MinScaleDenominator>'+
    '<LineSymbolizer stroke="#ff7733" stroke-width="1.2" />' + // style for lines
'</Rule>' +
'</Style>';

var layer_chodniky = '<Layer name="chodniky" srs="'+proj+'">' + // same as above
'<StyleName>style_chodniky</StyleName>' +
'<Datasource>' +
    '<Parameter name="file">' + path.join( __dirname, 'data/chodniky.shp' ) +'</Parameter>' +
    '<Parameter name="type">shape</Parameter>' +
'</Datasource>' +                    
'</Layer>';

var style_lavicky='<Style name="style_lavicky">' + // style for layer "style_cesty"
'<Rule>' +
'<MaxScaleDenominator>10000</MaxScaleDenominator>'+
'<MinScaleDenominator>10</MinScaleDenominator>'+
'<MarkersSymbolizer file= "./icon/lavicka.png" opacity="1.0" transform="scale(0.02,0.02)" />'+
     // style for lines
'</Rule>' +
'</Style>';

var layer_lavicky = '<Layer name="lavicky" srs="'+proj+'">' + // same as above
'<StyleName>style_lavicky</StyleName>' +
'<Datasource>' +
    '<Parameter name="file">' + path.join( __dirname, 'data/lavicky.shp' ) +'</Parameter>' +
    '<Parameter name="type">shape</Parameter>' +
'</Datasource>' +    

'</Layer>';

var style_kanalizacia='<Style name="style_kanalizacia">' + // style for layer "style_cesty"
'<Rule>' +
'<MaxScaleDenominator>10000</MaxScaleDenominator>'+
'<MinScaleDenominator>10</MinScaleDenominator>'+

'<PointSymbolizer file= "./icon/kanalizacia.png" opacity="0.5" transform="scale(0.01,0.01)" />'+
     // style for lines
'</Rule>' +
'</Style>';

var layer_kanalizacia = '<Layer name="kanalizacia" srs="'+proj+'">' + // same as above
'<StyleName>style_kanalizacia</StyleName>' +
'<Datasource>' +
    '<Parameter name="file">' + path.join( __dirname, 'data/kanalizacia.shp' ) +'</Parameter>' +
    '<Parameter name="type">shape</Parameter>' +
'</Datasource>' +                    
'</Layer>';

var style_cintorin='<Style name="style_cintorin">' + // style for layer "style_budovy"
'<Rule>' +
'<MaxScaleDenominator>30000</MaxScaleDenominator>'+
'<MinScaleDenominator>10</MinScaleDenominator>'+
    '<LineSymbolizer stroke="black" stroke-width="0.2" />' + // style for lines
    '<PolygonSymbolizer fill="#003333"  />' + 
    '<PolygonPatternSymbolizer file="./icon/cintorin.png" opacity="0.5" transform="scale(2,2)" />'+// style for polygons
  '</Rule>' +
'</Style>';

var layer_cintorin = '<Layer name="cintorin" srs="'+proj+'">' + // same as above
'<StyleName>style_cintorin</StyleName>' +
'<Datasource>' +
    '<Parameter name="file">' + path.join( __dirname, 'data/cintorin.shp' ) +'</Parameter>' +
    '<Parameter name="type">shape</Parameter>' +
'</Datasource>' +                    
'</Layer>';

var style_odpad='<Style name="style_odpad">' + // style for layer "style_cesty"
'<Rule>' +
'<MaxScaleDenominator>10000</MaxScaleDenominator>'+
'<MinScaleDenominator>10</MinScaleDenominator>'+

'<MarkersSymbolizer file= "./icon/odpad.png" opacity="1.0" transform="scale(0.04,0.04)" />'+
     // style for lines
'</Rule>' +
'</Style>';

var layer_odpad = '<Layer name="odpad" srs="'+proj+'">' + // same as above
'<StyleName>style_odpad</StyleName>' +
'<Datasource>' +
    '<Parameter name="file">' + path.join( __dirname, 'data/odpad.shp' ) +'</Parameter>' +
    '<Parameter name="type">shape</Parameter>' +
'</Datasource>' +                    
'</Layer>';

var style_skola='<Style name="style_skola">' + // style for layer "style_cesty"
'<Rule>' +
'<MaxScaleDenominator>10000</MaxScaleDenominator>'+
'<MinScaleDenominator>1</MinScaleDenominator>'+
'<PointSymbolizer file= "./icon/skola.png" opacity="1.0" transform="scale(0.05,0.05)" />'+
     // style for lines
'</Rule>' +
'</Style>';

var layer_skola = '<Layer name="skola" srs="'+proj+'">' + // same as above
'<StyleName>style_skola</StyleName>' +
'<Datasource>' +
    '<Parameter name="file">' + path.join( __dirname, 'data/skola.shp' ) +'</Parameter>' +
    '<Parameter name="type">shape</Parameter>' +
'</Datasource>' +                    
'</Layer>';

var style_stlpy='<Style name="style_stlpy">' + // style for layer "style_cesty"
'<Rule>' +
'<MaxScaleDenominator>10000</MaxScaleDenominator>'+
'<MinScaleDenominator>10</MinScaleDenominator>'+

'<PointSymbolizer file= "./icon/stlpy.png"  transform="scale(0.025,0.025)" />'+
     // style for lines
'</Rule>' +
'</Style>';

var layer_stlpy = '<Layer name="stlpy" srs="'+proj+'">' + // same as above
'<StyleName>style_stlpy</StyleName>' +
'<Datasource>' +
    '<Parameter name="file">' + path.join( __dirname, 'data/stlpy.shp' ) +'</Parameter>' +
    '<Parameter name="type">shape</Parameter>' +
'</Datasource>' +                    
'</Layer>';

var style_ubytovanie='<Style name="style_ubytovanie">' + // style for layer "style_cesty"
'<Rule>' +
'<MaxScaleDenominator>10000</MaxScaleDenominator>'+
'<MinScaleDenominator>10</MinScaleDenominator>'+
'<PointSymbolizer file= "./icon/ubytovanie.png" opacity="1.0" transform="scale(0.1,0.1)" />'+
     // style for lines
'</Rule>' +
'</Style>';

var layer_ubytovanie = '<Layer name="ubytovanie" srs="'+proj+'">' + // same as above
'<StyleName>style_ubytovanie</StyleName>' +
'<Datasource>' +
    '<Parameter name="file">' + path.join( __dirname, 'data/ubyt_zar.shp' ) +'</Parameter>' +
    '<Parameter name="type">shape</Parameter>' +
'</Datasource>' +                    
'</Layer>';

var style_zastavky='<Style name="style_zastavky">' + // style for layer "style_cesty"
'<Rule>' +
'<MaxScaleDenominator>10000</MaxScaleDenominator>'+
'<MinScaleDenominator>10</MinScaleDenominator>'+
'<PointSymbolizer file= "./icon/zastavky.png" opacity="1.0" transform="scale(0.04,0.04)" />'+
     // style for lines
'</Rule>' +
'</Style>';

var layer_zastavky = '<Layer name="zastavky" srs="'+proj+'">' + // same as above
'<StyleName>style_zastavky</StyleName>' +
'<Datasource>' +
    '<Parameter name="file">' + path.join( __dirname, 'data/zastavky.shp' ) +'</Parameter>' +
    '<Parameter name="type">shape</Parameter>' +
'</Datasource>' +                    
'</Layer>';



// schema of the rendered map
var schema = '<Map background-color="#ffffe6" srs="'+proj+'">' + // we define background color of the map and its spatial reference system with epsg code of data used
                
                
                (addCintorin ? style_cintorin : '') + 
                (addCintorin ? layer_cintorin : '') +                  
                (addPark ? style_park : '') + 
                (addPark ? layer_park : '') +
                (addBudovy ? style_budovy : '') +
                (addBudovy ? layer_budovy : '') + 
                (addUbytovanie ? style_ubytovanie : '') + 
                (addUbytovanie ? layer_ubytovanie : '') +
                (addSkola ? style_skola : '') + 
                (addSkola ? layer_skola : '') +   
                (addCesty ? style_cesty : '') +
                (addCesty ? layer_cesty : '') + 
                (addChodniky ? style_chodniky : '') +
                (addChodniky ? layer_chodniky : '') + 
                (addLavicky ? style_lavicky : '') +                            
                (addLavicky ? layer_lavicky : '') + 
                (addZastavky ? style_zastavky : '') + 
                (addZastavky ? layer_zastavky : '') +
                (addOdpad ? style_odpad : '') + 
                (addOdpad ? layer_odpad : '') +  
                (addKanalizacia ? style_kanalizacia : '') + 
                (addKanalizacia ? layer_kanalizacia : '') + 
                (addStlpy ? style_stlpy : '') + 
                (addStlpy ? layer_stlpy : '') +
                               
                 
            '</Map>';
// now we have a mapnik xml in variable schema that defines layers, data sources and styles of the layers
console.log(schema)
map.fromString(schema, function(err, map) { // we use method "fromString" => we need to use the xml schema inside variable schema
  if (err) {
      console.log('Map Schema Error: ' + err.message) // if there is an error in schema processing we print it out
  }
  map.zoomToBox(BBOX); // let's zoom our mapnik map to bounding box stored in BBOX variable

  var im = new mapnik.Image(width, height); // we define new mapnik image with the same width and height as our map
  
  

  map.render(im, function(err, im) { // render the map into mapnik image stored in variable "im"
      
    if (err) {
        console.log('Map redner Error: ' + err.message) // print an error if it occures
    }

    im.encode("png", function(err, buffer) { // encoude our image into "png"
      if (err) {
         console.log('Encode Error: ' + err.message) // same same
      }

      fs.writeFile( // we ouse node file system package "fs" to write into file, first parameter is path to our file
        path.join(__dirname, "out/map.png"), // combine directory of our running script and desired map image
        buffer, // insert the image buffer created by "im.encode" method of mapnik image
        function(err) {
          if (err) {
              console.log(' Fs Write Error: ' + err.message) // same same
          }
          console.log('Image generated into: ' + 
            path.join(__dirname, "out/map.png") // we print our path to created image when the image is all writen into "map.png"
            // after the "Image generated into..." message is out, we can open our generated image
            // change the bounding box, width, height and style if you want
          );
          sendFile(path.join(__dirname ,"out/map.png"));
        }
      );
    });
  });
})
};

module.exports = generateImage;
