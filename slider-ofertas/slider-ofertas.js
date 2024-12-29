
const sliderOferta = document.querySelector('.slider-ofertas');
const sliderWrapperOferta = document.querySelector('.slider-wrapper-ofertas');
const slidesOferta = document.querySelectorAll('.slide-ofertas');

let arrastarSliderOferta = false, inicioXSliderOferta = 0, posicaoAtualSliderOferta = 0, posicaoAnteriorSliderOferta = 0, indiceAtualSliderOferta = 0;


slidesOferta.forEach(slide => slide.addEventListener('dragstart', evento => evento.preventDefault()));


sliderOferta.addEventListener('mousedown', iniciarArrasteSliderOferta);
sliderOferta.addEventListener('mouseup', terminarArrasteSliderOferta);
sliderOferta.addEventListener('mouseleave', terminarArrasteSliderOferta);
sliderOferta.addEventListener('mousemove', moverArrasteSliderOferta);


function iniciarArrasteSliderOferta(evento) {
    arrastarSliderOferta = true;
    inicioXSliderOferta = evento.pageX;
}


function moverArrasteSliderOferta(evento) {
    if (!arrastarSliderOferta) return;
    posicaoAtualSliderOferta = posicaoAnteriorSliderOferta + evento.pageX  - inicioXSliderOferta;
    sliderWrapperOferta.style.transform = `translateX(${posicaoAtualSliderOferta}px)`;
}


function terminarArrasteSliderOferta() {
    if (!arrastarSliderOferta) return;
    arrastarSliderOferta = false;

    const movidoPor = posicaoAtualSliderOferta - posicaoAnteriorSliderOferta;

    if (movidoPor < -100) {
        indiceAtualSliderOferta += 1; 
    } else if (movidoPor > 100) {
        indiceAtualSliderOferta  -= 1; 
    }

    indiceAtualSliderOferta = (indiceAtualSliderOferta + slides.length) % slides.length;

    definirPosicaoPorIndiceSliderOferta();
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
