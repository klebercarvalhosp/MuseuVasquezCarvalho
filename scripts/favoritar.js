function favoritarAutor(element) {
    let uid = firebase.auth().currentUser.uid;

    db.collection("artistas").doc(element.id)
        .get()
        .then((doc) => {
            if (!doc.data().favoritado_por.includes(uid)) {
                console.log("Autor favoritado");
                db.collection("artistas").doc(element.id).update({
                    favoritado_por: firebase.firestore.FieldValue.arrayUnion(uid),
                })
                    .then()
                    .catch((error) => {
                        console.error("Error updating document: ", error);
                    });
            } else {
                console.log("Autor desfavoritado");
                db.collection("artistas").doc(element.id).update({
                    favoritado_por: firebase.firestore.FieldValue.arrayRemove(uid),
                })
                    .then()
                    .catch((error) => {
                        console.error("Error updating document: ", error);
                    });
            }
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
}

function filtroFavoritos() {
    let selectedOption = document.getElementById("select").value;
    carregarAutores(selectedOption);
}