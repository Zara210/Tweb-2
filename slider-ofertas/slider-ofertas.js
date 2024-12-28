
const sliderOferta = document.querySelector('.slider-ofertas');
const sliderWrapperOferta = document.querySelector('.slider-wrapper-ofertas');
const slidesOferta = Array.from(document.querySelectorAll('.slide-ofertas'));

let arrastarSliderOferta = false, inicioXSliderOferta = 0, posicaoAtualSliderOferta = 0, posicaoAnteriorSliderOferta = 0, indiceAtualSliderOferta = 0;


slidesOferta.forEach(slide => slide.addEventListener('dragstart', e => e.preventDefault()));


['mousedown', 'touchstart'].forEach(evento => sliderOferta.addEventListener(evento, iniciarArrasteSliderOferta));
['mouseup', 'mouseleave', 'touchend'].forEach(evento => sliderOferta.addEventListener(evento, terminarArrasteSliderOferta));
['mousemove', 'touchmove'].forEach(evento => sliderOferta.addEventListener(evento, moverArrasteSliderOferta));


function iniciarArrasteSliderOferta(evento) {
    arrastarSliderOferta = true;
    inicioXSliderOferta = obterPosicaoX(evento);
    sliderOferta.classList.add('arrastar');
}


function terminarArrasteSliderOferta() {
    if (!arrastarSliderOferta) return;
    arrastarSliderOferta = false;
    sliderOferta.classList.remove('arrastar');

    const movidoPor = posicaoAtualSliderOferta - posicaoAnteriorSliderOferta;

    if (movidoPor < -100) {
        indiceAtualSliderOferta = Math.min(indiceAtualSliderOferta + 1, slidesOferta.length - 1); 
    } else if (movidoPor > 100) {
        indiceAtualSliderOferta = Math.max(indiceAtualSliderOferta - 1, 0); 
    }

    definirPosicaoPorIndiceSliderOferta();
}


function moverArrasteSliderOferta(evento) {
    if (!arrastarSliderOferta) return;
    const posicaoAtualX = obterPosicaoX(evento);
    posicaoAtualSliderOferta = posicaoAnteriorSliderOferta + posicaoAtualX - inicioXSliderOferta;
    sliderWrapperOferta.style.transform = `translateX(${posicaoAtualSliderOferta}px)`;
}


function obterPosicaoX(evento) {
    return evento.type.includes('mouse') ? evento.pageX : evento.touches[0].clientX;
}


function definirPosicaoPorIndiceSliderOferta() {
    const larguraSlider = sliderOferta.offsetWidth; 
    const larguraSlide = slidesOferta[0].offsetWidth; 
    const posicaoCentral = slidesOferta[indiceAtualSliderOferta].offsetLeft - (larguraSlider / 2 - larguraSlide / 2);

    posicaoAtualSliderOferta = -posicaoCentral;
    posicaoAnteriorSliderOferta = posicaoAtualSliderOferta;
    sliderWrapperOferta.style.transform = `translateX(${posicaoAtualSliderOferta}px)`;
}


window.addEventListener('resize', definirPosicaoPorIndiceSliderOferta);


definirPosicaoPorIndiceSliderOferta();
