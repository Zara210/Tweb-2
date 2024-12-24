document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM totalmente carregado');
   // Verifica se a largura da tela é menor que 1024px
   console.log(window.innerWidth )

    const containerActions = document.querySelectorAll('.container-action');
    const resultadoVooDiv = document.getElementById('resultado-voo');
    const prosseguirBtn = document.getElementById('prosseguir-btn');
    
    if (!prosseguirBtn) {
        console.error('Botão "Prosseguir" não encontrado!');
        return;
    }

    containerActions.forEach(container => {
        const headerContainer = container.querySelector('.header-container');

        headerContainer.addEventListener('click', function () {
            // Fechar qualquer container aberto
            containerActions.forEach(otherContainer => {
                if (otherContainer !== container) {
                    otherContainer.classList.remove('expandido'); 
                    resultadoVooDiv.style.display = 'none';
                }
            });

            // Alterna a classe 'expandido' no container clicado
            container.classList.toggle('expandido');
        });
    });


   
    document.getElementById('prosseguir-btn').addEventListener('click', function () {
        console.log("Botão Prosseguir clicado");
        const tipoVoo = document.getElementById('tipo-voo').value; // Obtém o valor do select
        const dataVoo = document.getElementById('data-voo').value;
        const cidade = document.getElementById('cidade').value || "Lisboa"; // Default: Lisboa
    
        // Verifica se todos os campos estão preenchidos
        if (!dataVoo || !cidade) {
            alert("Por favor, preencha todos os campos.");
            return;
        }
    
        // Criação das informações do voo
        const data = new Date(dataVoo);
        const dia = data.getDate();
        const mes = data.getMonth() + 1; // Mes é 0-indexed (0 = Janeiro)


        console.log("dia:", dia);
        console.log("mes :", mes);
        console.log("cidade:", cidade);
        console.log("tipo-voo:", tipoVoo);
        console.log("--------------------------");
    
      // Geração das informações de voos
        const voo1 = {
            numero: `TP1`, // O primeiro voo é sempre TP1
            dia: dia,
            hora: cidade === "Lisboa" ? "10:05" : "12:10", // Define a hora de acordo com a cidade
            estado: determinarEstado(tipoVoo, dia, mes) // Usa uma função para determinar o estado
        };

        const voo2 = {
            numero: `TP2`, // O segundo voo é sempre TP2
            dia: dia,
            hora: cidade === "Lisboa" ? "18:05" : "20:10", // Define a hora de acordo com a cidade
            estado: determinarEstado(tipoVoo, dia, mes) // Usa a mesma função para determinar o estado
        };

        // Função para determinar o estado do voo
        function determinarEstado(tipoVoo, dia, mes) {
            console.log("Dia selecionado:", dia);
            console.log("Mês selecionado:", mes);
            if (tipoVoo === "ida") {
                return dia % 2 === 0 ? "No horário" : "Atrasado";
            } else if (tipoVoo === "regresso") {
                return mes % 2 === 0 ? "No horário" : "Chegou";
            }
            return "Desconhecido"; // Caso nenhum tipo seja selecionado
        }

        // Exibe o conteúdo do resultado
        document.getElementById('resultado-voo').style.display = 'block'; // Exibe a div com os resultados
    
        // Exibindo as informações do voo
        document.getElementById('numero-voo1').textContent = voo1.numero;
        document.getElementById('dia-voo1').textContent = voo1.dia;
        document.getElementById('hora-voo1').textContent = voo1.hora;
        document.getElementById('estado-voo1').textContent = voo1.estado;
    
        document.getElementById('numero-voo2').textContent = voo2.numero;
        document.getElementById('dia-voo2').textContent = voo2.dia;
        document.getElementById('hora-voo2').textContent = voo2.hora;
        document.getElementById('estado-voo2').textContent = voo2.estado;
    
        document.getElementById('cidade-voo').textContent = cidade;
    });

});
