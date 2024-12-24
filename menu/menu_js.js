document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menuBtn'); // Botão para abrir o menu
    const closeBtn = document.getElementById('closeBtn'); // Botão para fechar o menu
    const menu = document.getElementById('menu'); // Container do menu principal
    const nav = document.querySelector('nav'); // Elemento do navegador
    const body = document.body; // Corpo da página

    // Abrir o menu
    menuBtn.addEventListener('click', () => {
        menu.classList.add('menu-open'); // Adiciona a classe para mostrar o menu
        nav.classList.add('menu-open'); // Adiciona a classe para estilização
        body.classList.add('menu-open'); // Adiciona o fundo escurecido
        body.style.overflow = 'hidden'; // Desativa o scroll global
    });

    // Fechar o menu
    closeBtn.addEventListener('click', () => {
        closeMenu();
    });

    // Fechar o menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
            closeMenu();
        }
    });

    // Fechar o menu ao redimensionar a tela
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            closeMenu();
        }
    });

    // Função para fechar o menu
    const closeMenu = () => {
        menu.classList.remove('menu-open'); // Remove a classe para ocultar o menu
        nav.classList.remove('menu-open'); // Remove a classe de estilização
        body.classList.remove('menu-open'); // Remove o fundo escurecido
        body.style.overflow = ''; // Restaura o scroll global
    };

    // Gerenciar submenus de primeiro nível
    const mainMenuItems = document.querySelectorAll('.menu-list > li.has-submenu > .menu-item'); // Itens com submenus

    mainMenuItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.stopPropagation(); // Impede a propagação do clique

            const submenu = this.nextElementSibling; // Submenu associado
            const arrowIcon = this.querySelector('.arrow-icon'); // Ícone da seta
            const isOpen = submenu.style.display === 'block'; // Verifica o estado do submenu

            // Fecha todos os submenus antes de abrir o submenu atual
            closeAllSubmenus();

            // Alterna a visibilidade do submenu atual
            if (!isOpen) {
                submenu.style.display = 'block';
                this.parentElement.classList.add('open'); // Marca o submenu como aberto
                arrowIcon.src = "img/up-arrow2-svgrepo-com.svg"; // Muda para seta para cima
            } else {
                submenu.style.display = 'none';
                this.parentElement.classList.remove('open'); // Marca o submenu como fechado
                arrowIcon.src = "img/down-arrow2-svgrepo-com.svg"; // Muda para seta para baixo
            }
        });
    });

    // Gerenciar submenus de segundo nível
    const submenuItems = document.querySelectorAll('.submenu li.has-submenu > .menu-item');

    submenuItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.stopPropagation(); // Impede a propagação do clique

            const submenu = this.nextElementSibling; // Sub-submenu associado
            const arrowIcon = this.querySelector('.arrow-icon'); // Ícone da seta
            const isOpen = submenu.style.display === 'block'; // Verifica o estado do sub-submenu

            // Alterna a visibilidade do sub-submenu
            if (!isOpen) {
                submenu.style.display = 'block';
                this.parentElement.classList.add('open'); // Marca o sub-submenu como aberto
                arrowIcon.src = "img/up-arrow2-svgrepo-com.svg"; // Muda para seta para cima
            } else {
                submenu.style.display = 'none';
                this.parentElement.classList.remove('open'); // Marca o sub-submenu como fechado
                arrowIcon.src = "img/down-arrow2-svgrepo-com.svg"; // Muda para seta para baixo
            }
        });
    });

    // Função para fechar todos os submenus
    const closeAllSubmenus = () => {
        const submenus = document.querySelectorAll('.submenu');
        submenus.forEach(submenu => {
            submenu.style.display = 'none'; // Fecha o submenu
        });
        const openItems = document.querySelectorAll('.has-submenu.open');
        openItems.forEach(item => {
            const arrowIcon = item.querySelector('.arrow-icon');
            if (arrowIcon) {
                arrowIcon.src = "img/down-arrow2-svgrepo-com.svg"; // Reseta a seta para baixo
            }
            item.classList.remove('open'); // Remove a marcação de aberto
        });
    };
});
