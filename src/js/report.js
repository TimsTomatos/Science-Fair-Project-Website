var type = document.querySelector("#type");
var image = document.querySelector("#sumbittedImage");
var long;
var lati;
var comment = document.querySelector("#comment");


const storageReference = storage.ref(); //reference to storage

window.onload = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setCoords);
      } else {
        console.log('oof');
      }
}

function setCoords(position) {
    long = position.coords.longitude;
    lati = position.coords.latitude;
    console.log(long);
    console.log(lati);
}

function SubmitForm() {

  const imageFile = image.files[0];

  const imagePushRef = `reportImages/${imageFile.name}`;



  const info = {
    litterType: type.value,
    comment: comment.value,
    long: long,
    lati: lati,
    image: imagePushRef
  };

  db.collection('pins').add(info).then(() => {
    storageReference.child(imagePushRef).put(imageFile).then((data) => {
      console.log('uploaded an image!');
    });
  });
}

