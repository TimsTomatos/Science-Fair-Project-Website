//step up
const signInValueUN = document.querySelector('#signInUsername');
const signInValuePW = document.querySelector('#signInPassword');

const signUpValueUN = document.querySelector('#signUpUsername');
const signUpValuePW = document.querySelector('#signUpPassword');

const signInForm = document.querySelector('#signInForms');
const signUpForm = document.querySelector('#signUpForms');

const signInStuff = document.querySelectorAll('.signInStuff');
const signOutStuff = document.querySelectorAll('.signOutStuff');

const inPop = document.querySelector('#popUp');
const outPop = document.querySelector('#popIn');

const signOutButton = document.querySelector('#signOutButton');
var displayUsername = document.querySelector('#displayUsername');

var provider = new firebase.auth.GoogleAuthProvider();
var selectedFile;

auth.onAuthStateChanged(function(user) { // Checks if they are signed in or signed out
    if (user)
    {
        console.log("Logged in");
        console.log(user);
        signInStuff.forEach(e => e.style.display="block");
        signOutStuff.forEach(e => e.style.display="none");
        displayUsername.innerHTML = user.email;
    }
    else 
    {
        console.log("Logged out");
        signInStuff.forEach(e => e.style.display="none");
        signOutStuff.forEach(e => e.style.display="block");
    }
});

signInForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signInValueUN.value;
    const password = signInValuePW.value;

    auth.signInWithEmailAndPassword(email,password).then(() => {
        inPop.style.display = 'none';
    });
});

signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signUpValueUN.value;
    const password = signUpValuePW.value;

    auth.createUserWithEmailAndPassword(email,password).then(() => {
        inPop.style.display = 'none';
    });
});

signOutButton.addEventListener('click', () => {
    auth.signOut().then(() => {
        // console.log('clicked');
        // location.reload();
    });
});

function ToggleForm(element) {
    let temp = document.querySelector(element);

    if(temp.style.display == 'none')  {
        temp.style.display = 'flex';
        console.log('suppose to go away');
    }
    else {
        temp.style.display = 'none';
        console.log('SUppose to display!');
    }
        
}