// ============================================================
// SCROLL SUAVE
// ============================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const destino = document.querySelector(
            this.getAttribute("href")
        );

        if (!destino) return;

        e.preventDefault();

        destino.scrollIntoView({
            behavior: "smooth"
        });

    });

});


// ============================================================
// ELEMENTOS
// ============================================================

const menuItems = document.querySelectorAll(
    ".aulas .menu-item"
);

const aulasBadge = document.getElementById(
    "aulasBadge"
);

const aulasTitulo = document.getElementById(
    "aulasTitulo"
);

const aulasDescricao = document.getElementById(
    "aulasDescricao"
);

const aulasLista = document.getElementById(
    "aulasLista"
);

const aulasImagem = document.getElementById(
    "aulasImagem"
);

const aulasFeature = document.getElementById(
    "aulasFeature"
);


// ============================================================
// CRIAR MINI CARDS
// ============================================================

function criarMiniCards(itens) {

    aulasLista.innerHTML = "";

    for (let i = 0; i < itens.length; i += 2) {

        const card =
            document.createElement("div");

        card.classList.add(
            "aulas-mini-card"
        );

        const icon =
            document.createElement("span");

        icon.textContent = itens[i];

        const texto =
            document.createElement("p");

        texto.textContent =
            itens[i + 1];

        card.appendChild(icon);

        card.appendChild(texto);

        aulasLista.appendChild(card);

    }

}


// ============================================================
// TROCA DE CONTEÚDO
// ============================================================

function atualizarConteudo(item) {

    menuItems.forEach((btn) => {

        btn.classList.remove("active");

    });

    item.classList.add("active");

    aulasBadge.textContent =
        item.dataset.badge;

    aulasTitulo.textContent =
        item.dataset.title;

    aulasDescricao.textContent =
        item.dataset.description;

    // ========================================================
    // MARCA D'ÁGUA
    // ========================================================

    aulasFeature.classList.remove(
        "basico",
        "conversacao",
        "entrevistas",
        "negocios",
        "viagens"
    );

    aulasFeature.classList.add(
        item.dataset.watermark
    );

    // ========================================================
    // IMAGEM
    // ========================================================

    aulasImagem.style.opacity = "0";

    aulasImagem.style.transform =
        "scale(1.03)";

    setTimeout(() => {

        aulasImagem.src =
            item.dataset.image;

        aulasImagem.alt =
            item.dataset.alt;

        aulasImagem.style.opacity = "1";

        aulasImagem.style.transform =
            "scale(1)";

    }, 180);

    // ========================================================
    // MINI CARDS
    // ========================================================

    const itensLista =
        item.dataset.items.split("|");

    criarMiniCards(itensLista);

}


// ============================================================
// EVENTOS DOS BOTÕES
// ============================================================

menuItems.forEach((item) => {

    item.addEventListener("click", () => {

        atualizarConteudo(item);

    });

});


// ============================================================
// ITEM INICIAL
// ============================================================

window.addEventListener("DOMContentLoaded", () => {

    const ativoInicial = document.querySelector(
        ".aulas .menu-item.active"
    );

    if (ativoInicial) {

        atualizarConteudo(ativoInicial);

    }

});
