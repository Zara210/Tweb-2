// Selecionar os elementos
const reservarVooHeader = document.getElementById("reservar-voo-header");
const reservaVooContainer = document.getElementById("reserva-voo-container");
const estadoVooHeader = document.getElementById("estado-voo-header");
const estadoVooContainer = document.getElementById("estado-voo-container");

// Adicionar evento de clique no cabeçalho
reservarVooHeader.addEventListener("click", () => {
    if (reservaVooContainer.classList.contains("expandido")) {
        // Remover a classe para colapsar
        reservaVooContainer.classList.remove("expandido");
        reservaVooContainer.style.display = "none"; // Ocultar
    } else {
        // Adicionar a classe para expandir
        reservaVooContainer.classList.add("expandido");
        reservaVooContainer.style.display = "flex"; // Exibir como flex
    }
});

// Adicionar evento de clique no cabeçalho
estadoVooHeader.addEventListener("click", () => {
    if (estadoVooContainer.classList.contains("expandido")) {
        // Remover a classe para colapsar
        estadoVooContainer.classList.remove("expandido");
        estadoVooContainer.style.display = "none"; // Ocultar
    } else {
        // Adicionar a classe para expandir
        estadoVooContainer.classList.add("expandido");
        estadoVooContainer.style.display = "flex"; // Exibir como flex
    }
});

