const sliderParagem = document.querySelector('.slider-paragens');
const sliderWrapperParagem = document.querySelector('.slider-wrapper-paragens');
const slidesParagem = document.querySelectorAll('.slide-paragens');
const indicadoresParagem = document.querySelectorAll('.indicador-paragem');

let arrastarParagem = false, inicioXParagem = 0, posicaoAtualParagem = 0, posicaoAnteriorParagem = 0, indiceAtualParagem = 0;

slidesParagem.forEach(slide => slide.addEventListener('dragstart', evento => evento.preventDefault()));

sliderParagem.addEventListener('mousedown', iniciarArrasteParagem);
sliderParagem.addEventListener('mouseup', terminarArrasteParagem);
sliderParagem.addEventListener('mouseleave', terminarArrasteParagem);
sliderParagem.addEventListener('mousemove', moverArrasteParagem);


function iniciarArrasteParagem(evento) {
    arrastarParagem = true;
    inicioXParagem = evento.pageX; 
}

function moverArrasteParagem(evento) {
    if (!arrastarParagem) return;
    posicaoAtualParagem = posicaoAnteriorParagem + evento.pageX - inicioXParagem; 
    sliderWrapperParagem.style.transform = `translateX(${posicaoAtualParagem}px)`; 
}

function terminarArrasteParagem() {
    if (!arrastarParagem) return;
    arrastarParagem = false;

    const movidoPor = posicaoAtualParagem - posicaoAnteriorParagem;

    if (movidoPor < -100) {
        indiceAtualParagem += 1; 
    } else if (movidoPor > 100) {
        indiceAtualParagem -= 1; 
    }

    indiceAtualParagem = (indiceAtualParagem + slidesParagem.length) % slidesParagem.length;


    definirPosicaoPorIndiceParagem();
}

function definirPosicaoPorIndiceParagem() {
    const larguraSlider = sliderParagem.offsetWidth;
    posicaoAtualParagem = -indiceAtualParagem * larguraSlider; 
    posicaoAnteriorParagem = posicaoAtualParagem;
    sliderWrapperParagem.style.transform = `translateX(${posicaoAtualParagem}px)`; 
    atualizarIndicadoresParagem(); 
}

function atualizarIndicadoresParagem() {
    indicadoresParagem.forEach((indicador, indice) => indicador.classList.toggle('ativo', indice === indiceAtualParagem));
}


indicadoresParagem.forEach(indicador => {
    indicador.addEventListener('click', () => {
        indiceAtualParagem = parseInt(indicador.dataset.indice); 
        definirPosicaoPorIndiceParagem();
    });
});

window.addEventListener('resize', definirPosicaoPorIndiceParagem); 

definirPosicaoPorIndiceParagem();