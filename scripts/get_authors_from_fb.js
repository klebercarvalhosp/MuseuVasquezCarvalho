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
    var element = document.getElementById("cards")

    var card = document.createElement("div");
    var card_image = document.createElement("div");
    var image = document.createElement("img");

    image.setAttribute("src", imagem);

    card_image.appendChild(image);
    card.appendChild(card_image);

    var card_title = document.createElement("div");
    var card_title_a = document.createElement("a");
    
    card_title_a.setAttribute("href", "#");
    card_title_a.setAttribute("class", "toggle-info btn");

    var card_title_a_span_1 = document.createElement("span");
    var card_title_a_span_2 = document.createElement("span");
    card_title_a_span_1.setAttribute("class", "left");
    card_title_a_span_2.setAttribute("class", "right");

    card_title_a.appendChild(card_title_a_span_1);
    card_title_a.appendChild(card_title_a_span_2);
    card_title.appendChild(card_title_a);







    
    var card_article = document.createElement("article");
    card_article.setAttribute("class", "cards");

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