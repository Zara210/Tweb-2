
const manageFooterSubmenus = () => {
    const footerMenuItems = document.querySelectorAll('.footer-sub-menus .menu-item');

    footerMenuItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault(); 
            e.stopPropagation(); 

            const submenu = this.nextElementSibling; 
            const arrowIcon = this.querySelector('.arrow-icon'); 
            const isOpen = submenu.style.display === 'block'; 

            closeAllFooterSubmenus();

      
            if (!isOpen) {
                submenu.style.display = 'block';
                this.parentElement.classList.add('open'); 
                arrowIcon.src = "footer/img/up-arrow-preto.svg";
            } else {
                submenu.style.display = 'none';
                this.parentElement.classList.remove('open');
                arrowIcon.src = "footer/img/down-arrow-preto.svg";
            }
        });
    });
};

const closeAllFooterSubmenus = () => {
    const footerSubmenus = document.querySelectorAll('.footer-sub-menus .footer-submenu');
    footerSubmenus.forEach(submenu => {
        submenu.style.display = 'none'; 
    });

    const openItems = document.querySelectorAll('.footer-sub-menus .has-submenu.open');
    openItems.forEach(item => {
        const arrowIcon = item.querySelector('.arrow-icon');
        if (arrowIcon) {
            arrowIcon.src = "img/down-arrow2-svgrepo-com.svg"; 
        }
        item.classList.remove('open');
    });
};

manageFooterSubmenus();

