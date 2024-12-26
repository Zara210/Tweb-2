const sliderParagem = document.querySelector('.slider-paragens');
const sliderWrapperParagem = document.querySelector('.slider-wrapper-paragens');
const slidesParagem = Array.from(document.querySelectorAll('.slide-paragens'));
const indicadoresParagem = Array.from(document.querySelectorAll('.indicador-paragem'));

let arrastarParagem = false, inicioXParagem = 0, posicaoAtualParagem = 0, posicaoAnteriorParagem = 0, indiceAtualParagem = 0;

// Previne o arraste das imagens
slidesParagem.forEach(slide => slide.addEventListener('dragstart', e => e.preventDefault()));

// Adiciona eventos de arraste
['mousedown', 'touchstart'].forEach(evento => sliderParagem.addEventListener(evento, iniciarArrasteParagem));
['mouseup', 'mouseleave', 'touchend'].forEach(evento => sliderParagem.addEventListener(evento, terminarArrasteParagem));
['mousemove', 'touchmove'].forEach(evento => sliderParagem.addEventListener(evento, moverArrasteParagem));

// Atualiza os indicadores
function atualizarIndicadoresParagem() {
    indicadoresParagem.forEach((indicador, indice) => indicador.classList.toggle('ativo', indice === indiceAtualParagem));
}
 
// Inicia o arraste
function iniciarArrasteParagem(evento) {
    arrastarParagem = true;
    inicioXParagem = obterPosicaoXParagem(evento);
    sliderParagem.classList.add('arrastando');
}

// Termina o arraste
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

// Move o slider
function moverArrasteParagem(evento) {
    if (!arrastarParagem) return;
    const posicaoAtualX = obterPosicaoXParagem(evento);
    posicaoAtualParagem = posicaoAnteriorParagem + posicaoAtualX - inicioXParagem;
    sliderWrapperParagem.style.transform = `translateX(${posicaoAtualParagem}px)`;
}

// Obtém a posição X
function obterPosicaoXParagem(evento) {
    return evento.type.includes('mouse') ? evento.pageX : evento.touches[0].clientX;
}

// Define a posição com base no índice atual
function definirPosicaoPorIndiceParagem() {
    const larguraSlider = sliderParagem.offsetWidth;
    posicaoAtualParagem = -indiceAtualParagem * larguraSlider;
    posicaoAnteriorParagem = posicaoAtualParagem;
    sliderWrapperParagem.style.transform = `translateX(${posicaoAtualParagem}px)`;
    atualizarIndicadoresParagem();
}

// Inicializa a posição
definirPosicaoPorIndiceParagem();

// Eventos nos indicadores
indicadoresParagem.forEach(indicador => {
    indicador.addEventListener('click', () => {
        indiceAtualParagem = parseInt(indicador.dataset.indice);
        definirPosicaoPorIndiceParagem();
    });
});

// Ajusta o slider ao redimensionar
window.addEventListener('resize', definirPosicaoPorIndiceParagem);


