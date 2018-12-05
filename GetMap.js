var path = require("path");
var fs = require("fs");
var mapnik = require("mapnik"); //kniznica na vykreslenie map 

mapnik.register_default_fonts(); // registrácia predvolených fontov do mapnik 
mapnik.register_default_input_plugins(); //registrácia predvolených plugins do mapnik 
//funkcia na generovanie obrazku  
function generateImage(arg, sendFile){
var width = Number(arg.WIDTH); //definovanie mapoveho obrazku v pixeloch
var height = Number(arg.HEIGHT); // vyska mapoveho obrazku v pixeloch
var BBOX = arg.BBOX.split(',').map(function(elem){
    return Number(elem)}); // Ľavé dolné a pravé horne body obrazu
var layers=(arg.LAYERS).split(','); // definovanie vrstiev

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



var map = new mapnik.Map(width, height);//vytvorenie noveho mapoveho objektu s definovanou sirkou a vyskou pomocou mapnik



var proj = "+proj=krovak +lat_0=49.5 +lon_0=24.83333333333333 +alpha=30.28813972222222 +k=0.9999 +x_0=0 +y_0=0 +ellps=bessel +towgs84=589,76,480,0,0,0,0 +units=m +no_defs";//definovanie projekcie pre S-JTSK


var style_park='<Style name="style_park">' + // definovanie stylu pre vrstvu park - style_park
'<Rule>' +
    '<LineSymbolizer stroke="black" stroke-width="0.2" />' + // definovanie linie pre vrstvu park - style_park
    '<PolygonSymbolizer fill="#009933"  />' + // farba vnutry polygonu - definovanie plygonu pre vrstvu park - style_park
    '<PolygonPatternSymbolizer file="./icon/grass.png" opacity="0.5" transform="scale(0.5,0.5)" />' +// symbol do polygonu - priehladnost 0.5, velkost v mierke (x,y)  
  '</Rule>' +
'</Style>';

var layer_park = '<Layer name="park" srs="'+proj+'">' + // definovanie vrstvy park
'<StyleName>style_park</StyleName>' + // stylovanie zo style_park
'<Datasource>' +
    '<Parameter name="file">' + path.join( __dirname, 'data/park.shp' ) +'</Parameter>' +//načitanie shapefile 
    '<Parameter name="type">shape</Parameter>' +
'</Datasource>' +                    
'</Layer>';


var style_budovy='<Style name="style_budovy">' + // style for layer "style_budovy"
'<Rule>' +
'<MaxScaleDenominator>20000</MaxScaleDenominator>'+
'<MinScaleDenominator>10</MinScaleDenominator>'+
    '<LineSymbolizer stroke="black" stroke-width="0.5" />' + // stylovanie linioveho objektu
    '<PolygonSymbolizer fill-opacity="0.85"  fill="#cc3333"  />' + // stylovanie polygonu pre objekt
  '</Rule>' +
  '<Rule>' +
"<Filter>[OBJECTID] = 10611 </Filter>"+ 
'<TextSymbolizer face-name="DejaVu Sans Book" size="30" fill="black" halo-radius="5" wrap_width="0" placement="polygon" > "KOČOVCE" </TextSymbolizer>'+
'<MinScaleDenominator>2000</MinScaleDenominator>'+
'</Rule>' +
'</Style>';

var layer_budovy = '<Layer name="budovy" srs="'+proj+'">' + // obdobne ako vyššie uvedené
'<StyleName>style_budovy</StyleName>' +
'<Datasource>' +
    '<Parameter name="file">' + path.join( __dirname, 'data/budovy.shp'  ) +'</Parameter>' +
    '<Parameter name="type">shape</Parameter>' +
'</Datasource>' +                    
'</Layer>';

var style_cesty='<Style name="style_cesty">' + // style for layer "style_cesty"
'<Rule>' +
    '<LineSymbolizer stroke="#000000"  stroke-width="6"  />'+
    '<LineSymbolizer stroke="#a3a3c2"  stroke-width="5"  />' +
    '<LineSymbolizer stroke="#000000"  stroke-width="0.9" stroke-dasharray="7" />' +
       // stylovanie linioveho objektu
'</Rule>' +
'<Rule>' +
"<Filter>[RDT] = 303 </Filter>"+ 
'<TextSymbolizer face-name="DejaVu Sans Book" size="12" fill="black" halo-radius="2" wrap_width="0" placement="line" > "507" </TextSymbolizer>'+
'<MinScaleDenominator>1000</MinScaleDenominator>'+
'</Rule>' +
'</Style>';

var layer_cesty = '<Layer name="cesty" srs="'+proj+'">' + // layer "cesty" with spatial reference system
'<StyleName>style_cesty</StyleName>' + // binding of a style used for this layer => "style_cesty"
'<Datasource>' + // definition of a data source
    '<Parameter name="file">' + path.join( __dirname, 'data/cesty.shp' ) +'</Parameter>' + // path to the data file
    '<Parameter name="type">shape</Parameter>' + // file type
'</Datasource>' +
'</Layer>';

var style_chodniky='<Style name="style_chodniky">' + // styl pre vrstvu  "style_chodniky"
'<Rule>' +
'<MaxScaleDenominator>5000</MaxScaleDenominator>'+
'<MinScaleDenominator>10</MinScaleDenominator>'+
'<LineSymbolizer stroke="#662900" stroke-width="5" />' +
    '<LineSymbolizer stroke="#ff7733" stroke-width="4" />' +
    '<LineSymbolizer stroke="#7a7a52" stroke-width="2" stroke-dasharray="10" />' + // stylovanie linioveho objektu
'</Rule>' +
'</Style>';

var layer_chodniky = '<Layer name="chodniky" srs="'+proj+'">' + // obdobne ako vyššie uvedené
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
     // stylovanie linioveho objektu
'</Rule>' +
'</Style>';

var layer_lavicky = '<Layer name="lavicky" srs="'+proj+'">' + // obdobne ako vyššie uvedené
'<StyleName>style_lavicky</StyleName>' +
'<Datasource>' +
    '<Parameter name="file">' + path.join( __dirname, 'data/lavicky.shp' ) +'</Parameter>' +
    '<Parameter name="type">shape</Parameter>' +
'</Datasource>' +    

'</Layer>';

var style_kanalizacia='<Style name="style_kanalizacia">' + // styl pre vrstvu "style_kanalizacia"
'<Rule>' +
'<MaxScaleDenominator>10000</MaxScaleDenominator>'+
'<MinScaleDenominator>10</MinScaleDenominator>'+

'<PointSymbolizer file= "./icon/kanalizacia.png" opacity="0.7" transform="scale(0.01,0.01)" />'+
     
'</Rule>' +
'</Style>';

var layer_kanalizacia = '<Layer name="kanalizacia" srs="'+proj+'">' + // obdobne ako vyššie uvedené
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
    '<LineSymbolizer stroke="black" stroke-width="0.2" />' + // stylovanie linioveho objektu
    '<PolygonSymbolizer fill="#003333"  />' + 
    '<PolygonPatternSymbolizer file="./icon/cintorin.png" opacity="0.5" transform="scale(2,2)" />'+// stylovanie polygonu pre objekt
  '</Rule>' +
'</Style>';

var layer_cintorin = '<Layer name="cintorin" srs="'+proj+'">' + // obdobne ako vyššie uvedené
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
     // stylovanie linioveho objektu
'</Rule>' +
'</Style>';

var layer_odpad = '<Layer name="odpad" srs="'+proj+'">' + // obdobne ako vyššie uvedené
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
     // stylovanie linioveho objektu
'</Rule>' +
'</Style>';

var layer_skola = '<Layer name="skola" srs="'+proj+'">' + // obdobne ako vyššie uvedené
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
     // stylovanie linioveho objektu
'</Rule>' +
'</Style>';

var layer_stlpy = '<Layer name="stlpy" srs="'+proj+'">' + // obdobne ako vyššie uvedené
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
     // stylovanie linioveho objektu
'</Rule>' +
'</Style>';

var layer_ubytovanie = '<Layer name="ubytovanie" srs="'+proj+'">' + // obdobne ako vyššie uvedené
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
     // stylovanie linioveho objektu
'</Rule>' +
'</Style>';

var layer_zastavky = '<Layer name="zastavky" srs="'+proj+'">' + // obdobne ako vyššie uvedené
'<StyleName>style_zastavky</StyleName>' +
'<Datasource>' +
    '<Parameter name="file">' + path.join( __dirname, 'data/zastavky.shp' ) +'</Parameter>' +
    '<Parameter name="type">shape</Parameter>' +
'</Datasource>' +                    
'</Layer>';



// schema na vykreslenie mapy
var schema = '<Map background-color="#ffffe6" background-image="./icon/back.png"  srs="'+proj+'">' + // definovanie pozadia ( farba, obrazok)
                
                
                (addCintorin ? style_cintorin : '') + 
                (addCintorin ? layer_cintorin : '') +                  
                (addPark ? style_park : '') + 
                (addPark ? layer_park : '') +
                (addCesty ? style_cesty : '') +
                (addCesty ? layer_cesty : '') + 
                (addBudovy ? style_budovy : '') +
                (addBudovy ? layer_budovy : '') + 
                (addSkola ? style_skola : '') + 
                (addSkola ? layer_skola : '') +   
                (addChodniky ? style_chodniky : '') +
                (addChodniky ? layer_chodniky : '') + 
                (addUbytovanie ? style_ubytovanie : '') + 
                (addUbytovanie ? layer_ubytovanie : '') +
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
// mame mapnik xml v premennej scheme ktory nam definuje vrstvy, styly a zdroje udajov

map.fromString(schema, function(err, map) { // pouzivame metodu fromstring kde musime pouzit xml v ramci schemy premennych 
  if (err) {
      console.log('Map Schema Error: ' + err.message) // keď je  schema chybna, konzola ju vypíše 
  }
  map.zoomToBox(BBOX); //  ohraničenie mapy BBOXom 

  var im = new mapnik.Image(width, height); // definuje sa nový obrazok mapnik s rovnakou sírkou a výskou ako sme si zadefinovali
  
  

  map.render(im, function(err, im) { // vykreslenie mapy pomocou mapnika sa ulozi v premennej im       
    if (err) {
        console.log('Map redner Error: ' + err.message) // keď vznikne chyba tak sa vypise
    }

    im.encode("png", function(err, buffer) { // vytvori obrazok s priponou png
      if (err) {
         console.log('Encode Error: ' + err.message) // tak ako vyššie
      }

      fs.writeFile( // zápis súboru pomocu "fs"
        path.join(__dirname, "out/map.png"), // vykresli mapu do priečinka out s nazvom map.png
        buffer, // vlozi obraz bufferu vytvorený metodou im.code pomocou mapnik  
        function(err) {
          if (err) {
              console.log(' Fs Write Error: ' + err.message) // vypise chybu ak je 
          }
          console.log('Image generated into: ' + 
            path.join(__dirname, "out/map.png") // vytvori obrazok ked vsetko prejde ako ma do "map.png" 
            // ked sa vytvori obrazok mozeme otvorit vytvoreny obrazok
            
          );
          sendFile(path.join(__dirname ,"out/map.png"));
        }
      );
    });
  });
})
};

module.exports = generateImage; 
