const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const usernames = document.getElementsByClassName("username");
const passwords = document.getElementsByClassName("password");
const emailRecoveryButton = document.getElementById('email-recovery');

for (let username of usernames) {
    username.addEventListener('change', () => {
        username.style.border = "0.1em solid transparent";
        username.style.backgroundImage = "linear-gradient(#eee, #eee), " +
            "linear-gradient(120deg, #fcb045 10%, #fd1d1d 35%, #833ab4 100%)";
    });
}

for (let password of passwords) {
    password.addEventListener('change', () => {
        password.style.border = "0.1em solid transparent";
        password.style.backgroundImage = "linear-gradient(#eee, #eee), " +
            "linear-gradient(120deg, #fcb045 10%, #fd1d1d 35%, #833ab4 100%)";
    });
}

emailRecoveryButton.addEventListener('click', resetEmail);

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
    resetCredentialFields();
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
    resetCredentialFields();
});

function resetCredentialFields() {
    for (let username of usernames) {
        username.style.border = "0.1em solid transparent";
        username.style.backgroundImage = "linear-gradient(#eee, #eee), " +
            "linear-gradient(120deg, #fcb045 10%, #fd1d1d 35%, #833ab4 100%)";
    }

    for (let password of passwords) {
        password.style.border = "0.1em solid transparent";
        password.style.backgroundImage = "linear-gradient(#eee, #eee), " +
            "linear-gradient(120deg, #fcb045 10%, #fd1d1d 35%, #833ab4 100%)";
    }

    for (let element of usernames) {
        element.value = "";
    }
    for (let element of passwords) {
        element.value = "";
    }
}

function cadastrarUsuario() {
    event.preventDefault();
    let email = "";
    let password = "";
    for (let element of usernames) {
        if (element.value) {
            email = element.value;
        }
    }
    for (let element of passwords) {
        if (element.value) {
            password = element.value;
        }
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            loginUser(email, password);
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            treatCredentialErrors("sign-up", errorCode, errorMessage);
        });
}

function logarUsuario() {
    event.preventDefault();
    let email = "";
    let password = "";
    for (let element of usernames) {
        if (element.value) {
            email = element.value;
        }
    }
    for (let element of passwords) {
        if (element.value) {
            password = element.value;
        }
    }

    loginUser(email, password);
}

function loginUser(email, password) {
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            successfulLogin();
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            treatCredentialErrors("login", errorCode, errorMessage);
        });
}

function treatCredentialErrors(method, errorCode, errorMessage) {
    let selector = method === "login" ? ".sign-in-container" : ".sign-up-container";

    if (errorCode === "auth/invalid-email") {
        let email = (
            document
                .querySelector(selector)
                .getElementsByClassName("username")
        )[0];

        email.style.border = "0.15em solid transparent";
        email.style.backgroundImage = "linear-gradient(#eee, #eee), linear-gradient(#Ff0042, #Ff0042)";
        email.focus();
        email.select();
    } else if (errorCode === "auth/user-not-found") {
        let current_email = (
            document
                .querySelector(".sign-in-container")
                .getElementsByClassName("username")
        )[0].value;
        let current_password = (
            document
                .querySelector(".sign-in-container")
                .getElementsByClassName("password")
        )[0].value;

        document.getElementById("signUp").click();

        (
            document
                .querySelector(".sign-up-container")
                .getElementsByClassName("username")[0]
                .value
        ) = current_email;
        (
            document
                .querySelector(".sign-up-container")
                .getElementsByClassName("password")[0]
                .value
        ) = current_password;
    } else if (errorCode === "auth/wrong-password") {
        let password = (
            document
                .querySelector(selector)
                .getElementsByClassName("password")
        )[0];

        password.style.border = "0.15em solid transparent";
        password.style.backgroundImage = "linear-gradient(#eee, #eee), linear-gradient(#Ff0042, #Ff0042)";
        password.focus();
        password.select();
    } else {
        console.log(`Status ${errorCode}: ${errorMessage}`);
    }
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

function resetEmail() {
    let email = (
        document
            .querySelector(".sign-in-container")
            .getElementsByClassName("username")
    )[0].value;

    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {})
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            treatCredentialErrors("login", errorCode, errorMessage);
        });
}
