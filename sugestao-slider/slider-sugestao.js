const sliderSugestao = document.querySelector('.slider-sugestao');
const sliderWrapperSugestao = document.querySelector('.slider-wrapper-sugestao');
const slidesSugestao = Array.from(document.querySelectorAll('.slide-sugestao'));
const indicadoresSugestao = Array.from(document.querySelectorAll('.indicador-sugestao'));

let SugestaoSugestao = false, inicioXSugestao = 0, posicaoAtualSugestao= 0, posicaoAnteriorSugestao = 0, indiceAtualSugestao = 0;

// Previne o arraste das imagens
slidesSugestao.forEach(slide => slide.addEventListener('dragstart', e => e.preventDefault()));

// Adiciona os ouvintes de evento para interação de arraste
['mousedown', 'touchstart'].forEach(evento => sliderSugestao.addEventListener(evento, iniciarArrasteSugestao));
['mouseup', 'mouseleave', 'touchend'].forEach(evento => sliderSugestao.addEventListener(evento, terminarArrasteSugestao));
['mousemove', 'touchmove'].forEach(evento => sliderSugestao.addEventListener(evento, moverArrasteSugestao));

// Atualiza o indicador ativo
function atualizarIndicadoresSugestao() {
    indicadoresSugestao.forEach((indicador, indice) => indicador.classList.toggle('ativo', indice === indiceAtualSugestao));
}

// Inicia o arraste
function iniciarArrasteSugestao(evento) {
    arrastarSugestao = true;
    inicioXSugestao = obterPosicaoX(evento);
    sliderSugestao.classList.add('arrastar');
}

// Termina o arraste e ajusta o índice do slide com base no movimento
function terminarArrasteSugestao() {
    if (!arrastarSugestao) return;
    arrastarSugestao = false;
    sliderSugestao.classList.remove('arrastar');

    const movidoPor = posicaoAtualSugestao - posicaoAnteriorSugestao;

    if (movidoPor < -100) {
        indiceAtualSugestao = (indiceAtualSugestao + 1) % slidesSugestao.length; // Próximo slide
    } else if (movidoPor > 100) {
        indiceAtualSugestao = (indiceAtualSugestao - 1 + slidesSugestao.length) % slidesSugestao.length; // Slide anterior
    }

    definirPosicaoPorIndiceSugestao();
}

// Move o slider de acordo com o movimento do mouse ou toque
function moverArrasteSugestao(evento) {
    if (!arrastarSugestao) return;
    const posicaoAtualSugestaoX = obterPosicaoXSugestao(evento);
    posicaoAtualSugestao = posicaoAnteriorSugestao + posicaoAtualSugestaoX - inicioXSugestao;
    sliderWrapperSugestao.style.transform = `translateX(${posicaoAtualSugestao}px)`;
}

// Obtém a posição X do mouse ou toque
function obterPosicaoXSugestao(evento) {
    return evento.type.includes('mouse') ? evento.pageX : evento.touches[0].clientX;
}

// Define a posição do slider com base no índice atual
function definirPosicaoPorIndiceSugestao() {
    const larguraSlider = slider.offsetWidth;
    posicaoAtualSugestao = -indiceAtualSugestao * larguraSlider;
    posicaoAnteriorSugestao = posicaoAtualSugestao;
    sliderWrapperSugestao.style.transform = `translateX(${posicaoAtualSugestao}px)`;
    atualizarIndicadoresSugestao();
}

// Define a posição inicial do slider
definirPosicaoPorIndiceSugestao();

// Adiciona os ouvintes de evento para os indicadoresSugestao de slide
indicadoresSugestao.forEach(indicador => {
    indicador.addEventListener('click', () => {
        indiceAtualSugestao = parseInt(indicador.dataset.indice);
        definirPosicaoPorIndiceSugestao();
    });
});

// Ajusta o slider ao redimensionar a janela
window.addEventListener('resize', definirPosicaoPorIndiceSugestao);






