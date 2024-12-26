
const sliderOferta = document.querySelector('.slider-ofertas');
const sliderWrapperOferta = document.querySelector('.slider-wrapper-ofertas');
const slidesOferta = Array.from(document.querySelectorAll('.slide-ofertas'));

let arrastarSliderOferta = false, inicioXSliderOferta = 0, posicaoAtualSliderOferta = 0, posicaoAnteriorSliderOferta = 0, indiceAtualSliderOferta = 0;

// Previne o arraste das imagens
slidesOferta.forEach(slide => slide.addEventListener('dragstart', e => e.preventDefault()));

// Adiciona os ouvintes de evento para interação de arraste
['mousedown', 'touchstart'].forEach(evento => sliderOferta.addEventListener(evento, iniciarArrasteSliderOferta));
['mouseup', 'mouseleave', 'touchend'].forEach(evento => sliderOferta.addEventListener(evento, terminarArrasteSliderOferta));
['mousemove', 'touchmove'].forEach(evento => sliderOferta.addEventListener(evento, moverArrasteSliderOferta));

// Inicia o arraste
function iniciarArrasteSliderOferta(evento) {
    arrastarSliderOferta = true;
    inicioXSliderOferta = obterPosicaoX(evento);
    sliderOferta.classList.add('arrastar');
}

// Termina o arraste e ajusta o índice do slide com base no movimento
function terminarArrasteSliderOferta() {
    if (!arrastarSliderOferta) return;
    arrastarSliderOferta = false;
    sliderOferta.classList.remove('arrastar');

    const movidoPor = posicaoAtualSliderOferta - posicaoAnteriorSliderOferta;

    if (movidoPor < -100) {
        indiceAtualSliderOferta = Math.min(indiceAtualSliderOferta + 1, slidesOferta.length - 1); // Próximo slide
    } else if (movidoPor > 100) {
        indiceAtualSliderOferta = Math.max(indiceAtualSliderOferta - 1, 0); // Slide anterior
    }

    definirPosicaoPorIndiceSliderOferta();
}

// Move o slider de acordo com o movimento do mouse ou toque
function moverArrasteSliderOferta(evento) {
    if (!arrastarSliderOferta) return;
    const posicaoAtualX = obterPosicaoX(evento);
    posicaoAtualSliderOferta = posicaoAnteriorSliderOferta + posicaoAtualX - inicioXSliderOferta;
    sliderWrapperOferta.style.transform = `translateX(${posicaoAtualSliderOferta}px)`;
}

// Obtém a posição X do mouse ou toque
function obterPosicaoX(evento) {
    return evento.type.includes('mouse') ? evento.pageX : evento.touches[0].clientX;
}

// Define a posição do slider com base no índice atual
function definirPosicaoPorIndiceSliderOferta() {
    const larguraSlider = sliderOferta.offsetWidth; // Largura do contêiner pai
    const larguraSlide = slidesOferta[0].offsetWidth; // Largura de um slide
    const posicaoCentral = slidesOferta[indiceAtualSliderOferta].offsetLeft - (larguraSlider / 2 - larguraSlide / 2);

    posicaoAtualSliderOferta = -posicaoCentral;
    posicaoAnteriorSliderOferta = posicaoAtualSliderOferta;
    sliderWrapperOferta.style.transform = `translateX(${posicaoAtualSliderOferta}px)`;
}

// Ajusta o slider ao redimensionar a janela
window.addEventListener('resize', definirPosicaoPorIndiceSliderOferta);

// Define a posição inicial do slider
definirPosicaoPorIndiceSliderOferta();
