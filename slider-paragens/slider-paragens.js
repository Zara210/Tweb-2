const sliderParagem = document.querySelector('.slider-paragens');
const sliderWrapperParagem = document.querySelector('.slider-wrapper-paragens');
const slidesParagem = Array.from(document.querySelectorAll('.slide-paragens'));
const indicadoresParagem = Array.from(document.querySelectorAll('.indicador-paragem'));

let arrastarParagem = false, inicioXParagem = 0, posicaoAtualParagem = 0, posicaoAnteriorParagem = 0, indiceAtualParagem = 0;


slidesParagem.forEach(slide => slide.addEventListener('dragstart', e => e.preventDefault()));


['mousedown', 'touchstart'].forEach(evento => sliderParagem.addEventListener(evento, iniciarArrasteParagem));
['mouseup', 'mouseleave', 'touchend'].forEach(evento => sliderParagem.addEventListener(evento, terminarArrasteParagem));
['mousemove', 'touchmove'].forEach(evento => sliderParagem.addEventListener(evento, moverArrasteParagem));


function atualizarIndicadoresParagem() {
    indicadoresParagem.forEach((indicador, indice) => indicador.classList.toggle('ativo', indice === indiceAtualParagem));
}
 

function iniciarArrasteParagem(evento) {
    arrastarParagem = true;
    inicioXParagem = obterPosicaoXParagem(evento);
    sliderParagem.classList.add('arrastando');
}


function terminarArrasteParagem() {
    if (!arrastarParagem) return;
    arrastarParagem = false;
    sliderParagem.classList.remove('arrastando');

    const movidoPor = posicaoAtualParagem - posicaoAnteriorParagem;

    if (movidoPor < -100) {
        indiceAtualParagem = (indiceAtualParagem + 1) % slidesParagem.length;
    } else if (movidoPor > 100) {
        indiceAtualParagem = (indiceAtualParagem - 1 + slidesParagem.length) % slidesParagem.length;
    }

    definirPosicaoPorIndiceParagem();
}


function moverArrasteParagem(evento) {
    if (!arrastarParagem) return;
    const posicaoAtualX = obterPosicaoXParagem(evento);
    posicaoAtualParagem = posicaoAnteriorParagem + posicaoAtualX - inicioXParagem;
    sliderWrapperParagem.style.transform = `translateX(${posicaoAtualParagem}px)`;
}


function obterPosicaoXParagem(evento) {
    return evento.type.includes('mouse') ? evento.pageX : evento.touches[0].clientX;
}


function definirPosicaoPorIndiceParagem() {
    const larguraSlider = sliderParagem.offsetWidth;
    posicaoAtualParagem = -indiceAtualParagem * larguraSlider;
    posicaoAnteriorParagem = posicaoAtualParagem;
    sliderWrapperParagem.style.transform = `translateX(${posicaoAtualParagem}px)`;
    atualizarIndicadoresParagem();
}


definirPosicaoPorIndiceParagem();


indicadoresParagem.forEach(indicador => {
    indicador.addEventListener('click', () => {
        indiceAtualParagem = parseInt(indicador.dataset.indice);
        definirPosicaoPorIndiceParagem();
    });
});


window.addEventListener('resize', definirPosicaoPorIndiceParagem);


