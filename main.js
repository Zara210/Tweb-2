window.onscroll = function () {
    atualizarNavbar();
    atualizarHoverPosition(); 
};

window.onresize = function () {
    atualizarNavbar(); 
    atualizarHoverPosition(); 
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

function atualizarHoverPosition() {
    const hovers = document.querySelectorAll('.nav-link-item.has-hover .hover-background');

    hovers.forEach(function(hoverBackground) {
        if (window.scrollY > 15) {
            hoverBackground.style.top = '50px';
        } else {
            hoverBackground.style.top = '135px';
        }
    });
}


const descricao = document.querySelectorAll('.descricao');
    let Indice = 0;

    const updateDescription = (direcao) => {
        Indice = (Indice + direcao + descricao.length) % descricao.length;
        descricao.forEach((desc, i) => desc.classList.toggle('active', i === Indice));
    };

    document.getElementById('prev').addEventListener('click', () => updateDescription(-1));
    document.getElementById('next').addEventListener('click', () => updateDescription(1));

    
    updateDescription(0);