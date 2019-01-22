var map;
var heatMap;
var pins;
var heatedPosition;
function initMap() { //initation
    map = new google.maps.Map(document.querySelector('#map'), { // where the map is located in HMTL
      center: {lat:21.300776, lng:-158.051877}, //where it will be defaulted too
      zoom: 15, //zoom of how close it is
      mapTypeId: 'satellite'
    });
}

axios.get(`https://xmyg5r4knd.execute-api.us-west-2.amazonaws.com/dev/get`)
  .then(function (response) {
    let tempHold = JSON.parse(response.data.body);
    let superHold = tempHold.message.rows;
    pins = superHold;

    heatedPosition = pins.map(element => {
      return new google.maps.LatLng(element.lati, element.long);
    });
    
    pins.forEach(element => {
      var marker = new google.maps.Marker({
        position: {lat:parseFloat(element.lati),lng:parseFloat(element.long)},
        map: map,
        title: 'Hello World!'
      });
      heatMap = new google.maps.visualization.HeatmapLayer({
        data: heatedPosition,
        map: map
      });
    });
  });