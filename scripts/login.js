const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
    var elements = document.getElementsByClassName("username");
    for (element of elements) {
        element.value = "";
    }
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
    var elements = document.getElementsByClassName("username");
    for (element of elements) {
        element.value = "";
    }
});

function cadastrarUsuario() {
    event.preventDefault();
    var email = "";
    var password = "";
    var elements = document.getElementsByClassName("username");
    for (element of elements) {
        if (element.value) {
            email = element.value;
        }
    }
    var elements = document.getElementsByClassName("password");
    for (element of elements) {
        if (element.value) {
            password = element.value;
        }
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log("Usuário criado com sucesso!");
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == "auth/invalid-email") {
                var email = "";
                var elements = document.getElementsByClassName("username");
                for (element of elements) {
                    if (element.value) {
                        email = element;
                    }
                }
                // add red border
            }
            else {
                console.log(`Status ${errorCode}: ${errorMessage}`);
            }
        });

    loginUser(email, password);
}

function logarUsuario() {
    event.preventDefault();
    var email = "";
    var password = "";
    var elements = document.getElementsByClassName("username");
    for (element of elements) {
        if (element.value) {
            email = element.value;
        }
    }
    var elements = document.getElementsByClassName("password");
    for (element of elements) {
        if (element.value) {
            password = element.value;
        }
    }

    loginUser(email, password);
}

function loginUser(email, password) {
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log("Usuário logado com sucesso!");
            successfulLogin();
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == "auth/invalid-email") {
                var email = "";
                var elements = document.getElementsByClassName("username");
                for (element of elements) {
                    if (element.value) {
                        email = element;
                    }
                }
                // add red border
            }
            else if (errorCode == "auth/user-not-found") {
                // move to sign up
            }
            else {
                console.log(`Status ${errorCode}: ${errorMessage}`);
            }
        });
}

function successfulLogin() {
    event.preventDefault();
    toggleHidden();
}

function toggleHidden() {
    event.preventDefault();
    let login = document.getElementById("login-div");
    let main_site = document.getElementById("main_site");
    let hidden_main_site = main_site.getAttribute("hidden");

    if (hidden_main_site) {
        login.setAttribute("hidden", "hidden");
        main_site.removeAttribute("hidden");
    } else {
        main_site.setAttribute("hidden", "hidden");
        login.removeAttribute("hidden");
    }
}