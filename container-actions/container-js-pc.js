

const reservarVooHeader = document.getElementById("reservar-voo-header");
const reservaVooContainer = document.getElementById("reserva-voo-container");
const minhasViagensHeader = document.getElementById("minhas-viagens-header");
const minhasViagensContainer = document.getElementById("minhas-viagens-container");
const checkInHeader = document.getElementById("check-in-header");
const checkInContainer = document.getElementById("check-in-container");
const estadoVooHeader = document.getElementById("estado-voo-header");
const estadoVooContainer = document.getElementById("estado-voo-container");
const resultadoVooDiv = document.getElementById("resultado-voo-pc");
const fecharModalBtn = document.getElementById("fechar-resultado");



window.addEventListener('DOMContentLoaded', () => {
    toggleContainer(reservaVooContainer, reservarVooHeader);
});


function fecharTodosContainers() {
    const containers = [reservaVooContainer,estadoVooContainer,minhasViagensContainer,checkInContainer,];
    const headers = [reservarVooHeader,estadoVooHeader,minhasViagensHeader,checkInHeader,];

    containers.forEach(container => {
        
            container.classList.remove("expandido");
            container.style.display = "none";
    });

    headers.forEach(header => {
            header.classList.remove("linha");
    });
    resultadoVooDiv.style.display = "none";
}


function toggleContainer(container, header) {
    if (container.classList.contains("expandido")) {
  
        container.classList.remove("expandido");
        container.style.display = "none";
        header.classList.remove("linha"); 
    } else {
       
        fecharTodosContainers();

      
        container.classList.add("expandido");
        container.style.display = "flex";
        header.classList.add("linha");
    }
}


reservarVooHeader.addEventListener("click", () => {
    toggleContainer(reservaVooContainer, reservarVooHeader);
});


minhasViagensHeader.addEventListener("click", () => {
    toggleContainer(minhasViagensContainer, minhasViagensHeader);
});

checkInHeader.addEventListener("click", () => {
    toggleContainer(checkInContainer, checkInHeader);
});


estadoVooHeader.addEventListener("click", () => {
    toggleContainer(estadoVooContainer, estadoVooHeader);
});





document.getElementById('prosseguir-btn-pc').addEventListener('click', function () {
    console.log("Botão Prosseguir clicado");
    const tipoVoo = document.getElementById('tipo-voo-pc').value; 
    const dataVoo = document.getElementById('data-voo-pc').value;
    const cidade = document.getElementById('cidade-pc').value || "Lisboa"; 

 
    if (!dataVoo || !cidade) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

   
    const data = new Date(dataVoo);
    const dia = data.getDate();
    const mes = data.getMonth() + 1; 

    console.log("dia:", dia);
    console.log("mes :", mes);
    console.log("cidade:", cidade);
    console.log("tipo-voo:", tipoVoo);
    console.log("--------------------------");

  
    const voo1 = {
        numero: `TP1`, 
        dia: dia,
        hora: cidade === "Lisboa" ? "10:05" : "12:10", 
        estado: determinarEstado(tipoVoo, dia, mes) 
    };

    const voo2 = {
        numero: `TP2`,
        dia: dia,
        hora: cidade === "Lisboa" ? "18:05" : "20:10", 
        estado: determinarEstado(tipoVoo, dia, mes)
    };

   
    function determinarEstado(tipoVoo, dia, mes) {
        console.log("Dia selecionado:", dia);
        console.log("Mês selecionado:", mes);
        if (tipoVoo === "ida") {
            return dia % 2 === 0 ? "No horário" : "Atrasado";
        } else if (tipoVoo === "regresso") {
            return mes % 2 === 0 ? "No horário" : "Chegou";
        }
        return "Desconhecido";
    }

  
    document.getElementById('resultado-voo-pc').style.display = 'block'; 

  
    document.getElementById('numero-voo1-pc').textContent = voo1.numero;
    document.getElementById('dia-voo1-pc').textContent = voo1.dia;
    document.getElementById('hora-voo1-pc').textContent = voo1.hora;
    document.getElementById('estado-voo1-pc').textContent = voo1.estado;

    document.getElementById('numero-voo2-pc').textContent = voo2.numero;
    document.getElementById('dia-voo2-pc').textContent = voo2.dia;
    document.getElementById('hora-voo2-pc').textContent = voo2.hora;
    document.getElementById('estado-voo2-pc').textContent = voo2.estado;

    document.getElementById('cidade-voo-pc').textContent = cidade;

     
    fecharModalBtn.addEventListener("click", () => {
        console.log("clicado fecahr")
        resultadoVooDiv.style.display = "none";

    });

});
