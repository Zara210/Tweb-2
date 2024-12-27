document.addEventListener('DOMContentLoaded', () => {
    // Função para gerenciar submenus no footer
    const manageFooterSubmenus = () => {
        const footerMenuItems = document.querySelectorAll('.footer-sub-menus .menu-item');

        footerMenuItems.forEach(item => {
            item.addEventListener('click', function (e) {
                e.preventDefault(); // Impede o comportamento padrão do link
                e.stopPropagation(); // Impede a propagação do clique

                const submenu = this.nextElementSibling; // Submenu associado
                const arrowIcon = this.querySelector('.arrow-icon'); // Ícone da seta
                const isOpen = submenu.style.display === 'block'; // Verifica o estado do submenu

                // Fecha todos os submenus antes de abrir o submenu atual
                closeAllFooterSubmenus();

                // Alterna a visibilidade do submenu atual
                if (!isOpen) {
                    submenu.style.display = 'block';
                    this.parentElement.classList.add('open'); // Marca o submenu como aberto
                    arrowIcon.src = "footer/img/up-arrow-preto.svg"; // Muda para seta para cima
                } else {
                    submenu.style.display = 'none';
                    this.parentElement.classList.remove('open'); // Marca o submenu como fechado
                    arrowIcon.src = "footer/img/down-arrow-preto.svg"; // Muda para seta para baixo
                }
            });
        });
    };

    // Função para fechar todos os submenus do footer
    const closeAllFooterSubmenus = () => {
        const footerSubmenus = document.querySelectorAll('.footer-sub-menus .footer-submenu');
        footerSubmenus.forEach(submenu => {
            submenu.style.display = 'none'; // Fecha o submenu
        });

        const openItems = document.querySelectorAll('.footer-sub-menus .has-submenu.open');
        openItems.forEach(item => {
            const arrowIcon = item.querySelector('.arrow-icon');
            if (arrowIcon) {
                arrowIcon.src = "img/down-arrow2-svgrepo-com.svg"; // Reseta a seta para baixo
            }
            item.classList.remove('open'); // Remove a marcação de aberto
        });
    };

    // Inicializar o gerenciador de submenus do footer
    manageFooterSubmenus();
});
