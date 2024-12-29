const slider = document.querySelector('.slider');
const sliderWrapper = document.querySelector('.slider-wrapper');
const slides = document.querySelectorAll('.slide');
const indicadores = document.querySelectorAll('.indicador');

let arrastar = false, inicioX = 0, posicaoAtual = 0, posicaoAnterior = 0, indiceAtual = 0;

slider.addEventListener('mousedown', iniciarArraste);
slider.addEventListener('mouseup', terminarArraste);
slider.addEventListener('mouseleave', terminarArraste);
slider.addEventListener('mousemove', moverArraste);

function iniciarArraste(evento) {
    arrastar = true;
    inicioX = evento.pageX;
}

function moverArraste(evento) {
    if (!arrastar) return;
    posicaoAtual = posicaoAnterior + evento.pageX - inicioX;
    sliderWrapper.style.transform = `translateX(${posicaoAtual}px)`;
}


function terminarArraste() {
    if (!arrastar) return;
    arrastar = false;
  
    
    const movidoPor = posicaoAtual - posicaoAnterior;
    
    if (movidoPor < -100) {
        indiceAtual += 1; 
    } else if (movidoPor > 100) {
        indiceAtual -= 1; 
    }

    indiceAtual = (indiceAtual + slides.length) % slides.length;

    definirPosicaoPorIndice();
}


function definirPosicaoPorIndice() {
    const larguraSlider = slider.offsetWidth;
    posicaoAtual = -indiceAtual * larguraSlider;
    posicaoAnterior = posicaoAtual;
    sliderWrapper.style.transform = `translateX(${posicaoAtual}px)`;
    atualizarIndicadores();
}

function atualizarIndicadores() {
    indicadores.forEach((indicador, indice) => indicador.classList.toggle('ativo', indice === indiceAtual));
}

indicadores.forEach(indicador => {
    indicador.addEventListener('click', () => {
        indiceAtual = parseInt(indicador.dataset.indice);
        definirPosicaoPorIndice();
    });
});

window.addEventListener('resize', definirPosicaoPorIndice);

setInterval(() => {
    indiceAtual = (indiceAtual + 1) % slides.length;
    definirPosicaoPorIndice();
}, 8000);

definirPosicaoPorIndice();
