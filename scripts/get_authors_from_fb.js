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
    var cards = document.getElementById("cards");

    var card = document.createElement("div");
    var card_image = document.createElement("div");
    var image = document.createElement("img");

    image.setAttribute("src", imagem);

    card_image.appendChild(image);
    card.appendChild(card_image);

    var card_title = document.createElement("div");
    var card_title_a = document.createElement("a");
    
    card_title.setAttribute("class", "card-title");
    card_title_a.setAttribute("href", "#");
    card_title_a.setAttribute("class", "toggle-info btn");

    var card_title_a_span_1 = document.createElement("span");
    var card_title_a_span_2 = document.createElement("span");
    card_title_a_span_1.setAttribute("class", "left");
    card_title_a_span_2.setAttribute("class", "right");

    card_title_a.appendChild(card_title_a_span_1);
    card_title_a.appendChild(card_title_a_span_2);
    card_title.appendChild(card_title_a);

    var card_title_h2 = document.createElement("h2");
    var card_title_h2_small_1 = document.createElement("small");
    var card_title_h2_small_2 = document.createElement("small");

    card_title_h2.appendChild(document.createTextNode(nome));
    card_title_h2_small_1.appendChild(document.createTextNode("Data de Nascimento: " + data_de_nascimento));
    card_title_h2_small_2.appendChild(document.createTextNode("Data de Óbito: " + data_de_obito));


    card_title_h2.appendChild(card_title_h2_small_1);
    card_title_h2.appendChild(card_title_h2_small_2);
    card_title.appendChild(card_title_h2);
    card.appendChild(card_title);

    var card_flap_1 = document.createElement("div");
    var card_flap_1_description = document.createElement("div");

    card_flap_1.setAttribute("class", "card-flap flap1");
    card_flap_1_description.setAttribute("class", "card-description");

    card_flap_1_description.appendChild(document.createTextNode(desc));
    card_flap_1.appendChild(card_flap_1_description);

    var card_flap_2 = document.createElement("div");
    var card_flap_2_actions = document.createElement("div");
    var card_flap_2_actions_a = document.createElement("a");

    card_flap_2.setAttribute("class", "card-flap flap2");
    card_flap_2_actions.setAttribute("class", "card-actions");
    card_flap_2_actions_a.setAttribute("class", "btn");
    card_flap_2_actions_a.setAttribute("href", "#");

    card_flap_2_actions_a.appendChild(document.createTextNode("Favoritar"));

    card_flap_2_actions.appendChild(card_flap_2_actions_a);
    card_flap_2.appendChild(card_flap_2_actions);
    card_flap_1.appendChild(card_flap_2);
    card.appendChild(card_flap_1);

    cards.appendChild(card);
}

$(document).ready(function(){
    var zindex = 10;
    
    $("div.card").click(function(e){
      e.preventDefault();
  
      var isShowing = false;
  
      if ($(this).hasClass("show")) {
        isShowing = true
      }
  
      if ($("div.cards").hasClass("showing")) {
        // a card is already in view
        $("div.card.show")
          .removeClass("show");
  
        if (isShowing) {
          // this card was showing - reset the grid
          $("div.cards")
            .removeClass("showing");
        } else {
          // this card isn't showing - get in with it
          $(this)
            .css({zIndex: zindex})
            .addClass("show");
  
        }
  
        zindex++;
  
      } else {
        // no cards in view
        $("div.cards")
          .addClass("showing");
        $(this)
          .css({zIndex:zindex})
          .addClass("show");
  
        zindex++;
      }
      
    });
  });