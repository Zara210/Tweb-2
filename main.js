window.onscroll = function () {
    atualizarNavbar();
    atualizarDropdownPosition();  // Atualiza a posição do dropdown quando rolar
};

window.onresize = function () {
    atualizarNavbar(); // Atualiza a navbar também no redimensionamento
    atualizarDropdownPosition(); // Atualiza a posição do dropdown ao redimensionar
};

function atualizarNavbar() {
    const navbar = document.querySelector('nav');
    const profileIcon = document.querySelector('.nav-buttons_pc .login-btn img');
    const logoBranco = document.querySelector('.logo_branco'); // Seleciona o logo branco
    const logoNormal = document.querySelector('.logo'); // Seleciona o logo normal

    // Quando o rolar mais de 20px
    if (window.scrollY > 15) {
        navbar.classList.add('navbar-scroll'); // Adiciona a classe "navbar-scroll"
        profileIcon.src = 'img/profile_verde.jpg'; // Altera o ícone para verde

        // Troca o logo apenas se a tela for maior que 1124px
        if (window.innerWidth > 1124) {
            logoBranco.style.display = 'none'; // Esconde o logo branco
            logoNormal.style.display = 'block'; // Exibe o logo normal
        }
    } else {
        navbar.classList.remove('navbar-scroll'); // Remove a classe "navbar-scroll"
        profileIcon.src = 'img/profile_branco.png'; // Volta para o ícone branco

        // Troca o logo apenas se a tela for maior que 1124px
        if (window.innerWidth > 1124) {
            logoBranco.style.display = 'block'; // Exibe o logo branco
            logoNormal.style.display = 'none'; // Esconde o logo normal
        }
    }

    // Ao redimensionar a tela, esconde o logo branco se for menor que 1124px
    if (window.innerWidth <= 1124) {
        logoBranco.style.display = 'none'; // Esconde o logo branco
        logoNormal.style.display = 'none'; // Esconde o logo normal
    }

    // Adiciona a condição para telas menores que 768px
    if (window.innerWidth < 1024) {
        logoBranco.style.display = 'none'; // Esconde o logo branco
        logoNormal.style.display = 'block'; // Exibe o logo normal
    }
}

// Função para atualizar a posição do dropdown em todos os links com a classe .has-dropdown
function atualizarDropdownPosition() {
    // Seleciona todos os itens de navegação com a classe .has-dropdown
    const dropdowns = document.querySelectorAll('.nav-link-item.has-dropdown .dropdown-background');

    // Itera sobre todos os dropdowns e altera o valor de 'top'
    dropdowns.forEach(function(dropdownBackground) {
        if (window.scrollY > 15) {
            dropdownBackground.style.top = '50px';  // Muda o valor de top para 60px quando há rolagem
        } else {
            dropdownBackground.style.top = '135px'; // Restaura o valor original de top quando não há rolagem
        }
    });
}
