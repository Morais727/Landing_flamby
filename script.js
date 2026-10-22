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


// ============================================================
// CARROSSEL DE PROFESSORAS
// ============================================================

(function() {

    const images = document.querySelectorAll(".professoras-carousel .carousel-image");
    if (images.length < 2) return;

    let current = 0;

    setInterval(() => {

        images[current].classList.remove("active");
        current = (current + 1) % images.length;
        images[current].classList.add("active");

    }, 4000);

})();

// ============================================================
// CARROSSEL DE AVALIAÇÕES
// ============================================================

(function() {

    const track = document.getElementById("avaliacoesTrack");
    const container = track?.parentElement;
    const dotsWrap = document.getElementById("avaliacoesDots");
    const prevBtn = document.getElementById("avaliacoesPrev");
    const nextBtn = document.getElementById("avaliacoesNext");

    if (!track || !container) return;

    const realSlides = Array.from(
        track.querySelectorAll(".carousel-slide")
    );
    const realCount = realSlides.length;
    if (realCount < 2) return;

    const PAD = 11;
    const INTERVAL = 7000;
    const DURATION = 850;
    const CIRCUMFERENCE = 2 * Math.PI * 17;

    let cardsPerView = 3;
    let currentPage = 0;
    let totalPages = 0;
    let timer = null;
    let isAnimating = false;
    let isPaused = false;
    let resizeTimeout = null;
    let progressRAF = null;

    function getCPV() {
        var w = window.innerWidth;
        if (w < 480) return 1;
        if (w < 900) return 2;
        return 3;
    }

    function pageWidth() {
        return container.clientWidth;
    }

    function build() {
        cardsPerView = getCPV();
        totalPages = Math.ceil(realCount / cardsPerView);
        currentPage = 0;
        isAnimating = false;

        var items = [];

        for (var i = realCount - cardsPerView; i < realCount; i++) {
            var c = realSlides[i].cloneNode(true);
            c.classList.add("carousel-clone");
            items.push(c);
        }

        for (var i = 0; i < realCount; i++) {
            items.push(realSlides[i]);
        }

        var appendCount = totalPages * cardsPerView - realCount + cardsPerView;
        for (var i = 0; i < appendCount; i++) {
            var c = realSlides[i % realCount].cloneNode(true);
            c.classList.add("carousel-clone");
            items.push(c);
        }

        track.innerHTML = "";
        for (var i = 0; i < items.length; i++) {
            track.appendChild(items[i]);
        }

        resizeSlides();
        go(0, false);
        buildDots();
    }

    function resizeSlides() {
        var pw = pageWidth();
        var sw = pw / cardsPerView;
        var all = track.querySelectorAll(
            ".carousel-slide, .carousel-clone"
        );
        for (var i = 0; i < all.length; i++) {
            all[i].style.flex = "0 0 " + sw + "px";
            all[i].style.width = sw + "px";
        }
    }

    function pageOffset(page) {
        var pw = pageWidth();
        return (page + 1) * pw;
    }

    function go(page, animate) {
        if (isAnimating) return;
        var offset = pageOffset(page);

        if (animate) {
            track.style.transition =
                "transform " + DURATION + "ms cubic-bezier(0.65, 0, 0.15, 1)";
            isAnimating = true;
            setTimeout(function () {
                isAnimating = false;
            }, DURATION + 50);
        } else {
            track.style.transition = "none";
        }

        track.style.transform = "translateX(-" + offset + "px)";
        currentPage = page;
        updateDots();
        startProgress();
    }

    function next() {
        var nextPage = currentPage + 1;
        if (nextPage >= totalPages) {
            if (isAnimating) return;
            var pw2 = pageWidth();
            var dest = (totalPages + 1) * pw2;
            track.style.transition =
                "transform " + DURATION + "ms cubic-bezier(0.65, 0, 0.15, 1)";
            isAnimating = true;
            track.style.transform = "translateX(-" + dest + "px)";
            setTimeout(function () {
                track.style.transition = "none";
                var snap = pageWidth();
                track.style.transform = "translateX(-" + snap + "px)";
                currentPage = 0;
                isAnimating = false;
                updateDots();
                startProgress();
            }, DURATION + 50);
        } else {
            go(nextPage, true);
        }
    }

    function prev() {
        if (currentPage > 0 && !isAnimating) {
            go(currentPage - 1, true);
            resetTimer();
        }
    }

    function goToDot(index) {
        if (index === currentPage || isAnimating) return;
        go(index, true);
        resetTimer();
    }

    function stepNext() {
        next();
        resetTimer();
    }

    function stepPrev() {
        prev();
    }

    function buildDots() {
        dotsWrap.innerHTML = "";
        for (var i = 0; i < totalPages; i++) {

            (function (idx) {

                var dot = document.createElement("button");
                dot.className = "carousel-dot";
                dot.setAttribute("aria-label",
                    "Ir para página " + (idx + 1));

                var svg = document.createElementNS(
                    "http://www.w3.org/2000/svg", "svg"
                );
                svg.setAttribute("viewBox", "0 0 40 40");
                svg.setAttribute("width", "40");
                svg.setAttribute("height", "40");

                var bg = document.createElementNS(
                    "http://www.w3.org/2000/svg", "circle"
                );
                bg.setAttribute("cx", "20");
                bg.setAttribute("cy", "20");
                bg.setAttribute("r", "17");
                bg.classList.add("dot-ring-bg");

                var prog = document.createElementNS(
                    "http://www.w3.org/2000/svg", "circle"
                );
                prog.setAttribute("cx", "20");
                prog.setAttribute("cy", "20");
                prog.setAttribute("r", "17");
                prog.classList.add("dot-ring-progress");
                prog.style.strokeDasharray = CIRCUMFERENCE;
                prog.style.strokeDashoffset = CIRCUMFERENCE;

                svg.appendChild(bg);
                svg.appendChild(prog);
                dot.appendChild(svg);

                var inner = document.createElement("span");
                inner.className = "dot-inner";
                dot.appendChild(inner);

                dot.addEventListener("click", function () {
                    goToDot(idx);
                });

                dotsWrap.appendChild(dot);

            })(i);

        }
        updateDots();
    }

    function updateDots() {
        var dots = dotsWrap.querySelectorAll(".carousel-dot");
        for (var i = 0; i < dots.length; i++) {
            dots[i].classList.toggle("active", i === currentPage);
            if (i !== currentPage) {
                var r = dots[i].querySelector(".dot-ring-progress");
                if (r) r.style.strokeDashoffset = CIRCUMFERENCE;
            }
        }
    }

    function startProgress() {
        if (progressRAF) {
            cancelAnimationFrame(progressRAF);
            progressRAF = null;
        }

        var activeDot = dotsWrap.querySelector(
            ".carousel-dot.active"
        );
        if (!activeDot) return;

        var ring = activeDot.querySelector(".dot-ring-progress");
        if (!ring) return;

        ring.style.strokeDashoffset = CIRCUMFERENCE;

        var start = performance.now();

        function tick(now) {
            var elapsed = now - start;
            var p = Math.min(elapsed / INTERVAL, 1);
            ring.style.strokeDashoffset =
                CIRCUMFERENCE * (1 - p);
            if (p < 1) {
                progressRAF = requestAnimationFrame(tick);
            }
        }

        progressRAF = requestAnimationFrame(tick);
    }

    function startTimer() {
        stopTimer();
        timer = setInterval(function () {
            if (!isPaused) next();
        }, INTERVAL);
    }

    function stopTimer() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }

    function resetTimer() {
        startTimer();
    }

    container.addEventListener("mouseenter", function () {
        isPaused = true;
    });

    container.addEventListener("mouseleave", function () {
        isPaused = false;
    });

    if (prevBtn) {
        prevBtn.addEventListener("click", function () {
            stepPrev();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", function () {
            stepNext();
        });
    }

    build();
    startTimer();
    startProgress();

    window.addEventListener("resize", function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
            stopTimer();
            build();
            startTimer();
            startProgress();
        }, 200);
    });

})();
