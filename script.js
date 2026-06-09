
document.addEventListener('DOMContentLoaded', function() {
    criarHamburger();
    setupFormulario();
    setupNavbar();
    setupLinks();

    iniciarQuiz();
    iniciarSlideshow();
});

function trocarTema(tema) {
    document.body.className = tema;
}

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

const imagens = [
    "heroGS.webp",
    "imagem2.jpg",
    "imagem3.jpeg",
    "imagem4.jpg"
];

let slideAtual = 0;

function iniciarSlideshow() {

    const slide = document.getElementById("slide");

    if (!slide) return;

    setInterval(() => {

        slideAtual++;

        if (slideAtual >= imagens.length) {
            slideAtual = 0;
        }

        slide.src = imagens[slideAtual];

    }, 3000);
}


const perguntas = [
{
    pergunta: "Qual desastre é causado pelo excesso de água?",
    opcoes: ["Enchente", "Terremoto", "Seca"],
    correta: 0
},
{
    pergunta: "Qual instrumento detecta terremotos?",
    opcoes: ["Sismógrafo", "Termômetro", "Barômetro"],
    correta: 0
},
{
    pergunta: "O lixo pode agravar enchentes?",
    opcoes: ["Sim", "Não", "Nunca"],
    correta: 0
},
{
    pergunta: "Qual estado sofreu grandes enchentes em 2024?",
    opcoes: ["Rio Grande do Sul", "Amazonas", "Acre"],
    correta: 0
},
{
    pergunta: "Satélites ajudam no monitoramento?",
    opcoes: ["Sim", "Não", "Nunca"],
    correta: 0
},
{
    pergunta: "A IA pode analisar riscos?",
    opcoes: ["Sim", "Não", "Nunca"],
    correta: 0
},
{
    pergunta: "Bueiros entupidos favorecem enchentes?",
    opcoes: ["Sim", "Não", "Nunca"],
    correta: 0
},
{
    pergunta: "Terremotos acontecem pela movimentação das placas tectônicas?",
    opcoes: ["Sim", "Não", "Nunca"],
    correta: 0
},
{
    pergunta: "Alertas antecipados salvam vidas?",
    opcoes: ["Sim", "Não", "Nunca"],
    correta: 0
},
{
    pergunta: "O SIGMA monitora enchentes e terremotos?",
    opcoes: ["Sim", "Não", "Nunca"],
    correta: 0
}
];

let perguntaAtual = 0;
let pontuacao = 0;

function iniciarQuiz() {
    carregarPergunta();

    document.getElementById("a").onclick = () => responder(0);
    document.getElementById("b").onclick = () => responder(1);
    document.getElementById("c").onclick = () => responder(2);
}

function carregarPergunta() {

    if (perguntaAtual >= perguntas.length) {

        document.querySelector(".quiz-opcoes").innerHTML = "";

        document.getElementById("resultado").innerHTML =
            `<h3>Você acertou ${pontuacao} de ${perguntas.length} perguntas!</h3>`;

        return;
    }

    const pergunta = perguntas[perguntaAtual];

    document.getElementById("pergunta").textContent =
        pergunta.pergunta;

    document.getElementById("a").textContent =
        pergunta.opcoes[0];

    document.getElementById("b").textContent =
        pergunta.opcoes[1];

    document.getElementById("c").textContent =
        pergunta.opcoes[2];
}

function responder(opcao) {

    if (opcao === perguntas[perguntaAtual].correta) {
        pontuacao++;
    }

    perguntaAtual++;

    carregarPergunta();
}
