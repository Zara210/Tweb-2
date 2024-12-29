document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menuBtn'); 
    const closeBtn = document.getElementById('closeBtn');
    const menu = document.getElementById('menu');
    const nav = document.querySelector('nav');
    const body = document.body; 

    
    menuBtn.addEventListener('click', () => {
        menu.classList.add('menu-open');
        nav.classList.add('menu-open');
        body.classList.add('menu-open'); 
    });

    
    closeBtn.addEventListener('click', () => {
        closeMenu();
    });

   
    document.addEventListener('click', (clique) => {
        if (!menu.contains(clique.target) && !menuBtn.contains(clique.target)) {
            closeMenu();
        }
    });

   
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            closeMenu();
        }
    });

   
    const closeMenu = () => {
        menu.classList.remove('menu-open'); 
        nav.classList.remove('menu-open'); 
        body.classList.remove('menu-open');
    };

   
    const mainMenuItems = document.querySelectorAll('.menu-list > li.has-submenu > .menu-item'); 

    mainMenuItems.forEach(item => {
        item.addEventListener('click', function (clique) {
            clique.stopPropagation(); 

            const submenu = this.nextElementSibling; 
            const arrowIcon = this.querySelector('.arrow-icon'); 
            const isOpen = submenu.style.display === 'block'; 

        
            closeAllSubmenus();

          
            if (!isOpen) {
                submenu.style.display = 'block';
                this.parentElement.classList.add('open'); 
                arrowIcon.src = "img/up-arrow2-svgrepo-com.svg"; 
            } else {
                submenu.style.display = 'none';
                this.parentElement.classList.remove('open'); 
                arrowIcon.src = "img/down-arrow2-svgrepo-com.svg";
            }
        });
    });

  
    const submenuItems = document.querySelectorAll('.submenu li.has-submenu > .menu-item');

    submenuItems.forEach(item => {
        item.addEventListener('click', function (clique) {
            clique.stopPropagation(); 

            const submenu = this.nextElementSibling; 
            const arrowIcon = this.querySelector('.arrow-icon');
            const isOpen = submenu.style.display === 'block'; 

        
            if (!isOpen) {
                submenu.style.display = 'block';
                this.parentElement.classList.add('open');
                arrowIcon.src = "img/up-arrow2-svgrepo-com.svg"; 
            } else {
                submenu.style.display = 'none';
                this.parentElement.classList.remove('open'); 
                arrowIcon.src = "img/down-arrow2-svgrepo-com.svg"; 
            }
        });
    });

   
    const closeAllSubmenus = () => {
        const submenus = document.querySelectorAll('.submenu');
        submenus.forEach(submenu => {
            submenu.style.display = 'none'; 
        });
        const openItems = document.querySelectorAll('.has-submenu.open');
        openItems.forEach(item => {
            const arrowIcon = item.querySelector('.arrow-icon');
            if (arrowIcon) {
                arrowIcon.src = "img/down-arrow2-svgrepo-com.svg"; 
            }
            item.classList.remove('open'); 
        });
    };
});
