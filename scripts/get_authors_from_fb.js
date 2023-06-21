carregarAutores([]);

function carregarAutores(filtro) {
    if (filtro === "favoritos") {
        let uid = firebase.auth().currentUser.uid;

        db.collection("artistas")
            .where("favoritado_por", "array-contains-any", [uid])
            .get()
            .then((querySnapshot) => {
                let element = document.getElementById("artistas");
                element.innerHTML = "";

                querySnapshot.forEach((doc) => {
                    createCards(
                        doc.id,
                        doc.data().Imagem,
                        doc.data().Nome,
                        doc.data().Desc,
                        doc.data().data_de_nascimento,
                        doc.data().data_de_obito
                    )
                });
            })
            .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log(`Status ${errorCode}: ${errorMessage}`);
            });
    } else {
        db.collection("artistas")
            .get()
            .then((querySnapshot) => {
                let element = document.getElementById("artistas");
                element.innerHTML = "";

                querySnapshot.forEach((doc) => {
                    createCards(
                        doc.id,
                        doc.data().Imagem,
                        doc.data().Nome,
                        doc.data().Desc,
                        doc.data().data_de_nascimento,
                        doc.data().data_de_obito
                    )
                });
            })
            .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log(`Status ${errorCode}: ${errorMessage}`);
            });
    }
}

function createCards(id, imagem, nome, desc, data_de_nascimento, data_de_obito) {
    let element = document.getElementById("artistas")

    let card_article = document.createElement("article");
    card_article.setAttribute("class", "cards");
    card_article.setAttribute("id", id);

    let card_image = document.createElement("img");
    card_image.setAttribute("src", imagem);
    card_image.setAttribute("alt", "Foto do Artista");
    card_image.setAttribute("width", "100%");
    card_article.appendChild(card_image);

    let inner_div = document.createElement("div");
    inner_div.setAttribute("class", "inner");

    let nome_h4 = document.createElement("h4");
    nome_h4.appendChild(document.createTextNode(nome));
    inner_div.appendChild(nome_h4);

    let botao = document.createElement("button");
    botao.setAttribute("class", "btn btn-danger favoritar_autor");
    botao.setAttribute("type", "button");
    botao.setAttribute("onclick", "favoritarAutor(" + id + ")");
    botao.appendChild(document.createTextNode("Favoritar"));
    inner_div.appendChild(botao);

    let nascimento_morte_div = document.createElement("div");
    let nascimento_p = document.createElement("p");
    let morte_p = document.createElement("p");

    nascimento_morte_div.setAttribute("class", "descricao");

    nascimento_p.appendChild(document.createTextNode("Nascimento: " + data_de_nascimento));
    morte_p.appendChild(document.createTextNode("Óbito: " + data_de_obito));

    nascimento_morte_div.appendChild(nascimento_p);
    nascimento_morte_div.appendChild(morte_p);
    inner_div.appendChild(nascimento_morte_div);

    let desc_div = document.createElement("div");
    desc_div.setAttribute("class", "descricao");

    let desc_p = document.createElement("p");
    desc_p.appendChild(document.createTextNode(desc));
    desc_div.appendChild(desc_p);
    inner_div.appendChild(desc_div);

    card_article.appendChild(inner_div);

    element.appendChild(card_article);
}