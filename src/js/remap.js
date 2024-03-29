// .getDownloadURL()
var storageReference = storage.ref();

function initMap() { //initation
    map = new google.maps.Map(document.querySelector('#map'), { // where the map is located in HMTL
      center: {lat:21.4389, lng:-158.0001}, //where it will be defaulted too
      zoom: 10, //zoom of how close it is
      mapTypeId: 'satellite'
    });
}

db.collection('pins').onSnapshot(data => {
    var pins = [];
    var heatMapData = [];

    data.forEach(doc => {
        pins.push(doc.data());
    });

    pins.forEach((element, index) => { // Like Enuemrate, with index being int

        var uploadedImage = storageReference.child(element.image);

        var marker = new google.maps.Marker({
          position: {lat:parseFloat(element.lati),lng:parseFloat(element.long)},
          map: map,
          title: element.commetn
        });
        marker.addListener('click', function() {
          uploadedImage.getDownloadURL().then(url => {
            DisplayFromPin(element.litterType,element.comment,url,element.user)
            map.setCenter(marker.getPosition());
            console.log(element);
          });
        });

        heatMapData.push(new google.maps.LatLng(element.lati, element.long));

      var lat = element.lati;
      var lng = element.long;
      var latlng = new google.maps.LatLng(lat, lng);
      var address;
      var geocoder = geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'latLng': latlng }, function (results, status) {   // GEODCODE BUILT IN THEN
          if (status == google.maps.GeocoderStatus.OK) {
              if (results[1]) {
                  console.log(results[1].formatted_address)
                  address = results[1].formatted_address
              }
          }
          // Renders Data to Side Bar
          document.getElementById("content").innerHTML += `
          <p class="content"> ${address} </p> 
          `;
          // ${superHold[index].lati}, ${superHold[index].long}  ${element.littertype}: ${element.comment}
      });

    });

    heatMap = new google.maps.visualization.HeatmapLayer({
        data: heatMapData,
        map: map
    });

});

function DisplayFromPin(type,comment,image,user) {
    let tempCard = document.createElement("DIV");
    tempCard.className = "cardContainer"
    tempCard.innerHTML = `
        <button class="close" onclick="Close()">X</button> 
        <div class="card">
            <h1 class="type">${type}</h1>
            <img class="image" src="${image}" />
            <p class="user">${user}</p>
            <p class="comment">${comment}</p>
        </div>
    `;
    document.querySelector("#main").appendChild(tempCard);
}


function Close() {
    document.getElementsByClassName("cardContainer")[0].remove();
}