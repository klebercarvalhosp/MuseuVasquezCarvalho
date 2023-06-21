function encontrarAutor(event) {
    var pesquisa = event.target.value;
    let resultado = [];
    for (let h4 of document.querySelectorAll('h4')) {
        if (h4.textContent.includes(pesquisa)) {
            resultado.push(h4);
        }
    }
    resultado[0].scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
}