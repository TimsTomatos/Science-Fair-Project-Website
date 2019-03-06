//variables up here

auth.onAuthStateChanged(user => {
    if(user) { //checks if user is signed in
        //if signed in, usual sign in methods
    } else {
        //if not, usual sign out methods
    }
});

someElement.addEventListener('submit',e => {
    e.preventDefault(); //so it doesnt refresh the page and checks for empty input
    auth.signInWithEmailAndPassword(emailValue,passwordValue).then() //signs the user in. Reccomended to remove .then method
}); //usually a add event listener