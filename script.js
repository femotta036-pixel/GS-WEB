// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    criarHamburger();
    setupFormulario();
    setupNavbar();
    setupLinks();
});

// ===== MENU RESPONSIVO (HAMBURGER MENU) =====
function criarHamburger() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    navbar.appendChild(hamburger);

    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ===== VALIDAÇÃO DE FORMULÁRIO =====
function setupFormulario() {
    const form = document.querySelector('.form-contato');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            if (validarFormulario(form)) {
                mostrarSucesso(form);
                form.reset();
            }
        });
    }
}

function validarFormulario(form) {
    const nome = form.querySelector('input[name="nome"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const assunto = form.querySelector('input[name="assunto"]').value.trim();
    const mensagem = form.querySelector('textarea[name="mensagem"]').value.trim();

    document.querySelectorAll('.erro').forEach(el => el.remove());

    let temErro = false;

    if (nome.length < 3) {
        mostrarErro(form.querySelector('input[name="nome"]'), 'Nome deve ter pelo menos 3 caracteres');
        temErro = true;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        mostrarErro(form.querySelector('input[name="email"]'), 'Email inválido');
        temErro = true;
    }

    if (assunto.length < 3) {
        mostrarErro(form.querySelector('input[name="assunto"]'), 'Assunto deve ter pelo menos 3 caracteres');
        temErro = true;
    }

    if (mensagem.length < 10) {
        mostrarErro(form.querySelector('textarea[name="mensagem"]'), 'Mensagem deve ter pelo menos 10 caracteres');
        temErro = true;
    }

    return !temErro;
}

function mostrarErro(element, mensagem) {
    const erro = document.createElement('span');
    erro.className = 'erro';
    erro.textContent = mensagem;
    element.parentElement.appendChild(erro);
}

function mostrarSucesso(form) {
    const sucesso = document.createElement('div');
    sucesso.className = 'sucesso';
    sucesso.textContent = '✓ Mensagem enviada com sucesso! Entraremos em contato em breve.';
    form.parentElement.insertBefore(sucesso, form);

    setTimeout(() => {
        sucesso.remove();
    }, 5000);
}

// ===== EFEITO NA NAVBAR AO SCROLL =====
function setupNavbar() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const scrollAtual = window.scrollY;
        
        if (scrollAtual > 100) {
            navbar.classList.add('scrollado');
        } else {
            navbar.classList.remove('scrollado');
        }
    });
}

// ===== NAVEGAÇÃO SUAVIZADA =====
function setupLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
            }
        });
    });
}
