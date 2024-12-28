document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM totalmente carregado');

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
   
            containerActions.forEach(otherContainer => {
                if (otherContainer !== container) {
                    otherContainer.classList.remove('expandido'); 
                    resultadoVooDiv.style.display = 'none';
                }
            });

          
            container.classList.toggle('expandido');
        });
    });


   
    document.getElementById('prosseguir-btn').addEventListener('click', function () {
        console.log("Botão Prosseguir clicado");
        const tipoVoo = document.getElementById('tipo-voo').value; 
        const dataVoo = document.getElementById('data-voo').value;
        const cidade = document.getElementById('cidade').value || "Lisboa"; 
    
    
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

       
        document.getElementById('resultado-voo').style.display = 'block'; 
    
       
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
