 window.onload = function() {
	 
var mymap = L.map('mapid').setView([20.1189155, -101.151713], 12);

var Satelite = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 20,
    id: 'mapbox/satellite-v9',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZWR3aW5tbGFyYSIsImEiOiJja2Q3bDJtZ2UwMG8yMnlwMnVsODVtNTJlIn0.iO_9meGtLf17xZmKR3ytVg', 
}).addTo(mymap);

var orginal = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 20,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZWR3aW5tbGFyYSIsImEiOiJja2Q3bDJtZ2UwMG8yMnlwMnVsODVtNTJlIn0.iO_9meGtLf17xZmKR3ytVg', 
}).addTo(mymap);


var geojson_municipal = L.geoJson(capa_municipal).addTo(mymap);

function getColor(d) {
    let salida = '';
    switch(parseInt(d)){
        case 1: salida = '#FF3333'; break;
        case 2: salida = '#FF5233'; break;
        case 3: salida = '#FF7433'; break;
        case 4: salida = '#FF9F33'; break;
        case 5: salida = '#FFC133'; break;
        case 6: salida = '#FFE033'; break;
        case 7: salida = '#A2FF33'; break;
        case 8: salida = '#53C12E'; break;
        case 9: salida = '#3A8621'; break;
        case 10: salida = '#A99D39'; break;
        case 11: salida = '#20AC4A'; break;
        case 12: salida = '#20ACA6'; break;
        case 13: salida = '#207BAC'; break;
        case 14: salida = '#2035AC'; break;
        case 15: salida = '#2E84F9'; break;
        case 16: salida = '#80B2F7'; break;
        case 17: salida = '#697B93'; break;
        case 18: salida = '#696D93'; break;
        case 19: salida = '#1B2476'; break;
        case 20: salida = '#2A1B76'; break;
        case 21: salida = '#2D03FF'; break;
        case 22: salida = '#9003FF'; break;
        case 23: salida = '#C393E8'; break;
        case 24: salida = '#DB93E8'; break;
        case 25: salida = '#842C94'; break;
        case 26: salida = '#CB0DB4'; break;
        case 27: salida = '#753664'; break;
        case 28: salida = '#717536'; break;
        case 29: salida = '#B4CAAB'; break;
        case 30: salida = '#5F624C'; break;
        case 31: salida = '#FD0000'; break;
        default:
            salida = '#FFEDA0';
    }
    return salida;
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.FID),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function highlighFeature(e){
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}


function resetHighLight(e){
    geojson_colonias.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e){
    mymap.fitBounds(e.target.getBounds());
}

function onEachFeature(feature,layer){
    layer.on({
        mouseover:highlighFeature,
        mouseout:resetHighLight,
        click:zoomToFeature
    });
}

var geojson_colonias;
geojson_colonias = L.geoJson(capa_colonias,{style: style, onEachFeature: onEachFeature}).addTo(mymap);

var leyenda_control = L.control({position: 'bottomright'});

leyenda_control.onAdd = function(mymap){
    var div = L.DomUtil.create('div','info legend d-none d-md-block'),
        capa_colonias_reduce = capa_colonias.features.reduce((val, key) => {
         
            val['colonias'].push(key.properties.Nombre);
            val['colores'].push(key.properties.FID);

            return val;    
        },{colonias: [], colores: []});

        let n  = capa_colonias_reduce.colonias.length;
        for (var i = 0; i < n; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(capa_colonias_reduce.colores[i]) + '"></i> ' + capa_colonias_reduce.colonias[i] + '<br>';
        }

        return div;   
};

leyenda_control.addTo(mymap);

var info = L.control();

info.onAdd = function(map){
    this._div = L.DomUtil.create('div','info');
    this.update();
    return this._div;
}

info.update = function(props) {
    this._div.innerHTML = '<h4>Limite Territorial</h4>' + (props ? '<b>' + props.Nombre + '</b><br />' : '<b> Uriangato </b><br />');
}

info.addTo(mymap);

var LeafIcon = L.Icon.extend({
    options: {
        shadowUrl: '',
        iconSize: [41.25, 37.5],
        popupAnchor: [-1, -76]
    }
});

var farmaciaIcon = new LeafIcon({iconUrl: 'assets/css/maps/images/farmacia.png'});
var hospitalIcon = new LeafIcon({iconUrl: 'assets/css/maps/images/icono-hospital-2x.png'});
var taxiIcon = new LeafIcon({iconUrl: 'assets/css/maps/images/taxi.png'});
var estacionamientoIcon = new LeafIcon({iconUrl: 'assets/css/maps/images/estacionamiento.png'});
var restauranteIcon = new LeafIcon({iconUrl: 'assets/css/maps/images/restaurante.png'});
var bancoIcon = new LeafIcon({iconUrl: 'assets/css/maps/images/banco.png'});
var barIcon = new LeafIcon({iconUrl: 'assets/css/maps/images/bar.png'});
var cineIcon = new LeafIcon({iconUrl: 'assets/css/maps/images/cine.png'});
var gasolineraIcon = new LeafIcon({iconUrl: 'assets/css/maps/images/gasolinera.png'});
var hotelIcon = new LeafIcon({iconUrl: 'assets/css/maps/images/hotel1.png'});
var cafeIcon = new LeafIcon({iconUrl: 'assets/css/maps/images/cafe.png'});
var mercadoIcon = new LeafIcon({iconUrl: 'assets/css/maps/images/mercado.png'});
var cruzrojaIcon = new LeafIcon({iconUrl: 'assets/css/maps/images/cruzroja.png'});
var temploIcon = new LeafIcon({iconUrl: 'assets/css/maps/images/templo.png', iconSize: [75, 123]});
var wcIcon = new LeafIcon({iconUrl: 'assets/css/maps/images/wc.png'});
var presidenciaIcon = new LeafIcon({iconUrl: 'assets/css/maps/images/presidencia.png'});
var panaderiaIcon = new LeafIcon({iconUrl: 'assets/css/maps/images/panaderia.png'});
var correosIcon = new LeafIcon({iconUrl: 'assets/css/maps/images/correos.png'});
var bibliotecaIcon = new LeafIcon({iconUrl: 'assets/css/maps/images/biblioteca.png'});
var autobusesIcon = new LeafIcon({iconUrl: 'assets/css/maps/images/autobuses.png', iconSize: [55, 50]});
var historiaIcon = new LeafIcon({iconUrl: 'assets/css/maps/images/historia.png', iconSize: [55, 50]});

function geoJsontoMarker(capa){
    return  L.geoJson(capa,{
            pointToLayer: function (feature, latlng) {
                switch(feature.properties.description){
                    case "farmacia":
                        return L.marker(latlng,{icon: farmaciaIcon});
                    case "taxi":
                        return L.marker(latlng,{icon: taxiIcon});
                    case "hospital":
                        return L.marker(latlng,{icon: hospitalIcon});
                    case "estacionamiento":
                        return L.marker(latlng,{icon: estacionamientoIcon});
                    case "restaurante":
                        return L.marker(latlng,{icon: restauranteIcon});
                    case "banco":
                        return L.marker(latlng,{icon: bancoIcon});
                    case "bar":
                        return L.marker(latlng,{icon: barIcon});
                    case "cine":
                        return L.marker(latlng,{icon: cineIcon});
                    case "gasolinera":
                        return L.marker(latlng,{icon: gasolineraIcon});
                    case "hotel":
                        return L.marker(latlng,{icon: hotelIcon});
                    case "cafe":
                        return L.marker(latlng,{icon: cafeIcon});
                    case "mercado":
                        return L.marker(latlng,{icon: mercadoIcon});
                    case "templo":
                        return L.marker(latlng,{icon: temploIcon});
                    case "wc":
                        return L.marker(latlng,{icon: wcIcon});
                    case "presidencia":
                        return L.marker(latlng,{icon: presidenciaIcon});
                    case "panaderia":
                        return L.marker(latlng,{icon: panaderiaIcon});
                    case "correos":
                        return L.marker(latlng,{icon: correosIcon});
                    case "biblioteca":
                        return L.marker(latlng,{icon: bibliotecaIcon});
                    case "autobuses":
                        return L.marker(latlng,{icon: autobusesIcon}); 
                    case "cruzroja":
                        return L.marker(latlng,{icon: cruzrojaIcon}); 
                    case "historia":
                        return L.marker(latlng,{icon: historiaIcon}); 
                    default:
                        return L.marker(latlng);
                }
                
            },
            onEachFeature:function(feature, layer) {
                if (feature.properties && feature.properties.Name) {
                    layer.bindPopup('<b>' + feature.properties.Name + '</b><br>' + (feature.properties.direccion ? '<br>' + feature.properties.direccion +'</br>' : ''));
                }else{
                    console.log("no se puede bindear")
                }
            }
        }).addTo(mymap);
}

var geojson_senales_generales = geoJsontoMarker(capa_senales_generales);
var geojson_senales_wc = geoJsontoMarker(capa_wc);
var geojson_senales_estacionamientos = geoJsontoMarker(capa_estacionamientos);
var geojson_senales_restaurantes = geoJsontoMarker(capa_restaurantes);
var geojson_senales_hoteles = geoJsontoMarker(capa_hoteles);
var geojson_senales_gasolineras = geoJsontoMarker(capa_gasolineras);
var geojson_senales_transporte = geoJsontoMarker(capa_transporte);
var geojson_senales_farmacias = geoJsontoMarker(capa_farmacias);
var geojson_senales_bancos = geoJsontoMarker(capa_bancos);
var geojson_senales_hospitales = geoJsontoMarker(capa_hospitales);
var geojson_senales_historia = geoJsontoMarker(capa_historia);

var baseMaps = {
    "<span style='color: gray'> Satelite </span>": Satelite,
    "<span style='color: gray'> Original </span>": orginal
};

var allLayers = [geojson_municipal,geojson_colonias,geojson_senales_generales];
var todo = L.layerGroup(allLayers);

var senales = {
    "Municipal": geojson_municipal,
    "Colonias": geojson_colonias,
    "Generales": geojson_senales_generales,
    "Baños": geojson_senales_wc,
    "Estacionamientos" :  geojson_senales_estacionamientos,
    "Restaurantes": geojson_senales_restaurantes,
    "Hoteles": geojson_senales_hoteles,
    "Gasolineras" : geojson_senales_gasolineras,
    "Transporte" : geojson_senales_transporte,
    "Farmacias" : geojson_senales_farmacias,
    "Bancos" : geojson_senales_bancos,
    "Hospitales": geojson_senales_hospitales,
    "Historia": geojson_senales_historia
};

var control_layers = L.control.layers(baseMaps,senales,{position: 'topleft'}).addTo(mymap);

/*var control =   L.control.activeLayers(baseMaps,senales);
control.addTo(mymap)
console.log(control.getActiveBaseLayer().name);

var overlayLayers = control.getActiveOverlayLayers()
for (var overlayId in overlayLayers) {
    console.log(overlayLayers[overlayId].name)
}*/



 };