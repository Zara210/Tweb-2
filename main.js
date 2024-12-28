window.onscroll = function () {
    atualizarNavbar();
    atualizarDropdownPosition(); 
};

window.onresize = function () {
    atualizarNavbar(); 
    atualizarDropdownPosition(); 
};

function atualizarNavbar() {
    const navbar = document.querySelector('nav');
    const profileIcon = document.querySelector('.nav-buttons_pc .login-btn img');
    const logoBranco = document.querySelector('.logo_branco'); 
    const logoNormal = document.querySelector('.logo');

    if (window.scrollY > 15) {
        navbar.classList.add('navbar-scroll'); 
        profileIcon.src = 'img/profile_verde.jpg';

        if (window.innerWidth > 1148) {
            logoBranco.style.display = 'none';
            logoNormal.style.display = 'block';
        }
    } else {
        navbar.classList.remove('navbar-scroll');
        profileIcon.src = 'img/profile_branco.png';

        if (window.innerWidth > 1148) {
            logoBranco.style.display = 'block';
            logoNormal.style.display = 'none';
        }
    }

    if (window.innerWidth <= 1148) {
        logoBranco.style.display = 'none';
        logoNormal.style.display = 'none';
    }

    if (window.innerWidth < 1024) {
        logoBranco.style.display = 'none';
        logoNormal.style.display = 'block';
    }
}

function atualizarDropdownPosition() {
    const dropdowns = document.querySelectorAll('.nav-link-item.has-dropdown .dropdown-background');

    dropdowns.forEach(function(dropdownBackground) {
        if (window.scrollY > 15) {
            dropdownBackground.style.top = '50px';
        } else {
            dropdownBackground.style.top = '135px';
        }
    });
}


const descriptions = document.querySelectorAll('.descricao');
    let currentIndex = 0;

    const updateDescription = (direction) => {
        currentIndex = (currentIndex + direction + descriptions.length) % descriptions.length;
        descriptions.forEach((desc, i) => desc.classList.toggle('active', i === currentIndex));
    };

    document.getElementById('prev').addEventListener('click', () => updateDescription(-1));
    document.getElementById('next').addEventListener('click', () => updateDescription(1));

    
    updateDescription(0);