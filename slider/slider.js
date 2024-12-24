const slider = document.querySelector('.slider');
const sliderWrapper = document.querySelector('.slider-wrapper');
const slides = Array.from(document.querySelectorAll('.slide'));
const indicadores = Array.from(document.querySelectorAll('.indicador'));

let arrastando = false, inicioX = 0, posicaoAtual = 0, posicaoAnterior = 0, indiceAtual = 0;

// Previne o arraste das imagens
slides.forEach(slide => slide.addEventListener('dragstart', e => e.preventDefault()));

// Adiciona os ouvintes de evento para interação de arraste
['mousedown', 'touchstart'].forEach(evento => slider.addEventListener(evento, iniciarArraste));
['mouseup', 'mouseleave', 'touchend'].forEach(evento => slider.addEventListener(evento, terminarArraste));
['mousemove', 'touchmove'].forEach(evento => slider.addEventListener(evento, moverArraste));

// Atualiza o indicador ativo
function atualizarIndicadores() {
    indicadores.forEach((indicador, indice) => indicador.classList.toggle('ativo', indice === indiceAtual));
}

// Inicia o arraste
function iniciarArraste(evento) {
    arrastando = true;
    inicioX = obterPosicaoX(evento);
    slider.classList.add('arrastando');
}

// Termina o arraste e ajusta o índice do slide com base no movimento
function terminarArraste() {
    if (!arrastando) return;
    arrastando = false;
    slider.classList.remove('arrastando');

    const movidoPor = posicaoAtual - posicaoAnterior;

    if (movidoPor < -100) {
        indiceAtual = (indiceAtual + 1) % slides.length; // Próximo slide
    } else if (movidoPor > 100) {
        indiceAtual = (indiceAtual - 1 + slides.length) % slides.length; // Slide anterior
    }

    definirPosicaoPorIndice();
}

// Move o slider de acordo com o movimento do mouse ou toque
function moverArraste(evento) {
    if (!arrastando) return;
    const posicaoAtualX = obterPosicaoX(evento);
    posicaoAtual = posicaoAnterior + posicaoAtualX - inicioX;
    sliderWrapper.style.transform = `translateX(${posicaoAtual}px)`;
}

// Obtém a posição X do mouse ou toque
function obterPosicaoX(evento) {
    return evento.type.includes('mouse') ? evento.pageX : evento.touches[0].clientX;
}

// Define a posição do slider com base no índice atual
function definirPosicaoPorIndice() {
    const larguraSlider = slider.offsetWidth;
    posicaoAtual = -indiceAtual * larguraSlider;
    posicaoAnterior = posicaoAtual;
    sliderWrapper.style.transform = `translateX(${posicaoAtual}px)`;
    atualizarIndicadores();
}

// Define a posição inicial do slider
definirPosicaoPorIndice();

// Adiciona os ouvintes de evento para os indicadores de slide
indicadores.forEach(indicador => {
    indicador.addEventListener('click', () => {
        indiceAtual = parseInt(indicador.dataset.indice);
        definirPosicaoPorIndice();
    });
});

// Ajusta o slider ao redimensionar a janela
window.addEventListener('resize', definirPosicaoPorIndice);
