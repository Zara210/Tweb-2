const sliderSugestao = document.querySelector('.slider-sugestao');
const sliderWrapperSugestao = document.querySelector('.slider-wrapper-sugestao');
const slidesSugestao = Array.from(document.querySelectorAll('.slide-sugestao'));
const indicadoresSugestao = Array.from(document.querySelectorAll('.indicador-sugestao'));

let SugestaoSugestao = false, inicioXSugestao = 0, posicaoAtualSugestao= 0, posicaoAnteriorSugestao = 0, indiceAtualSugestao = 0;


slidesSugestao.forEach(slide => slide.addEventListener('dragstart', e => e.preventDefault()));

['mousedown', 'touchstart'].forEach(evento => sliderSugestao.addEventListener(evento, iniciarArrasteSugestao));
['mouseup', 'mouseleave', 'touchend'].forEach(evento => sliderSugestao.addEventListener(evento, terminarArrasteSugestao));
['mousemove', 'touchmove'].forEach(evento => sliderSugestao.addEventListener(evento, moverArrasteSugestao));


function atualizarIndicadoresSugestao() {
    indicadoresSugestao.forEach((indicador, indice) => indicador.classList.toggle('ativo', indice === indiceAtualSugestao));
}


function iniciarArrasteSugestao(evento) {
    arrastarSugestao = true;
    inicioXSugestao = obterPosicaoX(evento);
    sliderSugestao.classList.add('arrastar');
}


function terminarArrasteSugestao() {
    if (!arrastarSugestao) return;
    arrastarSugestao = false;
    sliderSugestao.classList.remove('arrastar');

    const movidoPor = posicaoAtualSugestao - posicaoAnteriorSugestao;

    if (movidoPor < -100) {
        indiceAtualSugestao = (indiceAtualSugestao + 1) % slidesSugestao.length; 
    } else if (movidoPor > 100) {
        indiceAtualSugestao = (indiceAtualSugestao - 1 + slidesSugestao.length) % slidesSugestao.length; or
    }

    definirPosicaoPorIndiceSugestao();
}


function moverArrasteSugestao(evento) {
    if (!arrastarSugestao) return;
    const posicaoAtualSugestaoX = obterPosicaoXSugestao(evento);
    posicaoAtualSugestao = posicaoAnteriorSugestao + posicaoAtualSugestaoX - inicioXSugestao;
    sliderWrapperSugestao.style.transform = `translateX(${posicaoAtualSugestao}px)`;
}


function obterPosicaoXSugestao(evento) {
    return evento.type.includes('mouse') ? evento.pageX : evento.touches[0].clientX;
}


function definirPosicaoPorIndiceSugestao() {
    const larguraSlider = slider.offsetWidth;
    posicaoAtualSugestao = -indiceAtualSugestao * larguraSlider;
    posicaoAnteriorSugestao = posicaoAtualSugestao;
    sliderWrapperSugestao.style.transform = `translateX(${posicaoAtualSugestao}px)`;
    atualizarIndicadoresSugestao();
}


definirPosicaoPorIndiceSugestao();


indicadoresSugestao.forEach(indicador => {
    indicador.addEventListener('click', () => {
        indiceAtualSugestao = parseInt(indicador.dataset.indice);
        definirPosicaoPorIndiceSugestao();
    });
});


window.addEventListener('resize', definirPosicaoPorIndiceSugestao);






