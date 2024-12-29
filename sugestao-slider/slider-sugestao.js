const sliderSugestao = document.querySelector('.slider-sugestao');
const sliderWrapperSugestao = document.querySelector('.slider-wrapper-sugestao');
const slidesSugestao = document.querySelectorAll('.slide-sugestao');
const indicadoresSugestao = document.querySelectorAll('.indicador-sugestao');

let arrastarSugestao = false, inicioXSugestao = 0, posicaoAtualSugestao = 0, posicaoAnteriorSugestao = 0, indiceAtualSugestao = 0;

slidesSugestao.forEach(slide => slide.addEventListener('dragstart', evento => evento.preventDefault()));

sliderSugestao.addEventListener('mousedown', iniciarArrasteSugestao);
sliderSugestao.addEventListener('mouseup', terminarArrasteSugestao);
sliderSugestao.addEventListener('mouseleave', terminarArrasteSugestao);
sliderSugestao.addEventListener('mousemove', moverArrasteSugestao);


function iniciarArrasteSugestao(evento) {
    arrastarSugestao = true;
    inicioXSugestao = evento.pageX; 
}

function terminarArrasteSugestao() {
    if (!arrastarSugestao) return;
    arrastarSugestao = false;

    const movidoPor = posicaoAtualSugestao - posicaoAnteriorSugestao;

    if (movidoPor < -100) {
        indiceAtualSugestao += 1; 
    } else if (movidoPor > 100) {
        indiceAtualSugestao -= 1; 
    }

    indiceAtualSugestao = (indiceAtualSugestao + slidesSugestao.length) % slidesSugestao.length;

    definirPosicaoPorIndiceSugestao();
}

function moverArrasteSugestao(evento) {
    if (!arrastarSugestao) return;
    posicaoAtualSugestao = posicaoAnteriorSugestao + evento.pageX - inicioXSugestao; 
    sliderWrapperSugestao.style.transform = `translateX(${posicaoAtualSugestao}px)`;
}

function definirPosicaoPorIndiceSugestao() {
    const larguraSlider = sliderSugestao.offsetWidth;
    posicaoAtualSugestao = -indiceAtualSugestao * larguraSlider;
    posicaoAnteriorSugestao = posicaoAtualSugestao;
    sliderWrapperSugestao.style.transform = `translateX(${posicaoAtualSugestao}px)`; 
    atualizarIndicadoresSugestao();
}

function atualizarIndicadoresSugestao() {
    indicadoresSugestao.forEach((indicador, indice) => indicador.classList.toggle('ativo', indice === indiceAtualSugestao));
}


indicadoresSugestao.forEach(indicador => {
    indicador.addEventListener('click', () => {
        indiceAtualSugestao = parseInt(indicador.dataset.indice); 
        definirPosicaoPorIndiceSugestao();
    });
});

window.addEventListener('resize', definirPosicaoPorIndiceSugestao);

definirPosicaoPorIndiceSugestao();