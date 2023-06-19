db.collection("artistas")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            createCards(
                doc.data().Imagem,
                doc.data().Nome,
                doc.data().Desc,
                doc.data().data_de_nascimento,
                doc.data().data_de_obito
            )
        });
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(`Status ${errorCode}: ${errorMessage}`);
    });

function createCards(imagem, nome, desc, data_de_nascimento, data_de_obito) {
    var element = document.getElementById("artistas")

    var card_article = document.createElement("article");
    card_article.setAttribute("class", "cards");

    var card_image = document.createElement("img");
    card_image.setAttribute("src", imagem);
    card_image.setAttribute("alt", "Foto do Artista");
    card_image.setAttribute("width", "100%");
    card_article.appendChild(card_image);

    var inner_div = document.createElement("div");
    inner_div.setAttribute("class", "inner");

    var nome_h4 = document.createElement("h4");
    nome_h4.appendChild(document.createTextNode(nome));
    inner_div.appendChild(nome_h4);

    var desc_div = document.createElement("div");
    desc_div.setAttribute("class", "descricao");

    var desc_p = document.createElement("p");
    desc_p.appendChild(document.createTextNode(desc));
    desc_div.appendChild(desc_p);
    inner_div.appendChild(desc_div);

    var botao = document.createElement("button");
    botao.setAttribute("class", "btn btn-danger");
    botao.setAttribute("type", "button");
    botao.appendChild(document.createTextNode("Favoritar"));
    inner_div.appendChild(botao);

    card_article.appendChild(inner_div);

    element.appendChild(card_article);
}