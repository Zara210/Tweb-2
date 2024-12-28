const slider = document.querySelector('.slider');
const sliderWrapper = document.querySelector('.slider-wrapper');
const slides = Array.from(document.querySelectorAll('.slide'));
const indicadores = Array.from(document.querySelectorAll('.indicador'));

let arrastando = false, inicioX = 0, posicaoAtual = 0, posicaoAnterior = 0, indiceAtual = 0;


slides.forEach(slide => slide.addEventListener('dragstart', e => e.preventDefault()));


['mousedown', 'touchstart'].forEach(evento => slider.addEventListener(evento, iniciarArraste));
['mouseup', 'mouseleave', 'touchend'].forEach(evento => slider.addEventListener(evento, terminarArraste));
['mousemove', 'touchmove'].forEach(evento => slider.addEventListener(evento, moverArraste));


function atualizarIndicadores() {
    indicadores.forEach((indicador, indice) => indicador.classList.toggle('ativo', indice === indiceAtual));
}


function iniciarArraste(evento) {
    arrastando = true;
    inicioX = obterPosicaoX(evento);
    slider.classList.add('arrastando');
}


function terminarArraste() {
    if (!arrastando) return;
    arrastando = false;
    slider.classList.remove('arrastando');

    const movidoPor = posicaoAtual - posicaoAnterior;

    if (movidoPor < -100) {
        indiceAtual = (indiceAtual + 1) % slides.length; 
    } else if (movidoPor > 100) {
        indiceAtual = (indiceAtual - 1 + slides.length) % slides.length; 
    }

    definirPosicaoPorIndice();
}


function moverArraste(evento) {
    if (!arrastando) return;
    const posicaoAtualX = obterPosicaoX(evento);
    posicaoAtual = posicaoAnterior + posicaoAtualX - inicioX;
    sliderWrapper.style.transform = `translateX(${posicaoAtual}px)`;
}


function obterPosicaoX(evento) {
    return evento.type.includes('mouse') ? evento.pageX : evento.touches[0].clientX;
}


function definirPosicaoPorIndice() {
    const larguraSlider = slider.offsetWidth;
    posicaoAtual = -indiceAtual * larguraSlider;
    posicaoAnterior = posicaoAtual;
    sliderWrapper.style.transform = `translateX(${posicaoAtual}px)`;
    atualizarIndicadores();
}


definirPosicaoPorIndice();


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
