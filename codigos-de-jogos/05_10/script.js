/* ===========================================================
   Clique no alvo — Versão com Limite de Bombas/Dourados e Regras
   =========================================================== */

// 1. Cada nível possui duracao, tempoDoAlvo, tamanho, recorde e limites de bombas/dourados
const niveis = [
    { nome: 'Fácil', duracao: 30, tempoDoAlvo: 1500, tamanho: 72, recorde: 0, maxDourados: 3, maxBombas: 2 },
    { nome: 'Médio', duracao: 30, tempoDoAlvo: 1200, tamanho: 56, recorde: 0, maxDourados: 4, maxBombas: 3 },
    { nome: 'Difícil', duracao: 20, tempoDoAlvo: 900, tamanho: 40, recorde: 0, maxDourados: 5, maxBombas: 4 }
];

/* -----------------------------------------------------------
   Funções auxiliares
   ----------------------------------------------------------- */

function sortearNumero(minimo, maximo) {    
    return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
}

function sortearDourado() {
    return sortearNumero(1, 5) === 1; // 1 chance em 5
}

function sortearBomba() {
    return sortearNumero(1, 8) === 1; // 1 chance em 8
}

function bateuRecorde(pontos, recorde) {
    return pontos > recorde;
}

function montarMensagemDeFim(pontos, recorde) {
    if (bateuRecorde(pontos, recorde)) {
        return 'Novo recorde: ' + pontos + ' pontos!';
    }
    return 'Fim! ' + pontos + ' pontos. O recorde é ' + recorde + '.';
}

function calcularTempoDoAlvo(nivel, pontos) {
    const vezesReduzir = Math.floor(pontos / 10);
    const tempoReduzido = nivel.tempoDoAlvo - (vezesReduzir * 150);
    return Math.max(500, tempoReduzido);
}

/* -----------------------------------------------------------
   Selecionar elementos do DOM
   ----------------------------------------------------------- */

const campoNivel = document.querySelector('.campo-nivel');
const alvo = document.querySelector('.alvo');
const botaoComecar = document.querySelector('.botao-comecar');
const mensagem = document.querySelector('.mensagem');
const arena = document.querySelector('.arena');

const telaPontos = document.querySelector('.pontos');
const telaTempo = document.querySelector('.tempo');
const telaRecorde = document.querySelector('.recorde');

const jogo = {
    pontos: 0,
    tempoRestante: 0,
    douradosExibidos: 0,
    bombasExibidas: 0
};

let opcoesNiveis = '';
for (let index = 0; index < niveis.length; index++) {
    opcoesNiveis += `<option value="${index}">${niveis[index].nome}</option>`;
} 
campoNivel.innerHTML = opcoesNiveis;

let cronometro;
let fuga;

/* -----------------------------------------------------------
   Funções de fluxo do jogo
   ----------------------------------------------------------- */

function moverAlvo() {
    alvo.style.left = sortearNumero(10, 90) + '%';
    alvo.style.top = sortearNumero(10, 90) + '%';

    // Limpa as classes antes de sortear a próxima
    alvo.classList.remove('dourado', 'bomba');

    const nivelAtual = niveis[campoNivel.value];

    // Sorteia respeitando os limites máximos permitidos no nível atual
    const podeSerBomba = jogo.bombasExibidas < nivelAtual.maxBombas;
    const podeSerDourado = jogo.douradosExibidos < nivelAtual.maxDourados;

    if (podeSerBomba && sortearBomba()) {
        alvo.classList.add('bomba');
        jogo.bombasExibidas++;
    } else if (podeSerDourado && sortearDourado()) {
        alvo.classList.add('dourado');
        jogo.douradosExibidos++;
    }

    const tempoFuga = calcularTempoDoAlvo(nivelAtual, jogo.pontos);

    clearTimeout(fuga);
    fuga = setTimeout(function () {
        moverAlvo();
    }, tempoFuga); 
}

function mostrarPlacar() {
    const nivelAtual = niveis[campoNivel.value];

    telaPontos.textContent = jogo.pontos;
    
    if (jogo.tempoRestante > 0 && jogo.tempoRestante <= 5){
        telaTempo.style.color = 'red';
    } else {
        telaTempo.style.color = 'white';
    }

    telaTempo.textContent = jogo.tempoRestante;
    telaRecorde.textContent = nivelAtual.recorde;
}

function iniciarJogo() {
    const nivelAtual = niveis[campoNivel.value];

    jogo.pontos = 0;
    jogo.tempoRestante = nivelAtual.duracao; 
    jogo.douradosExibidos = 0; // Reseta contadores da partida
    jogo.bombasExibidas = 0;

    botaoComecar.disabled = true;
    campoNivel.disabled = true; 
    mensagem.textContent = 'Vai!';

    alvo.style.width = nivelAtual.tamanho + 'px';
    alvo.style.height = nivelAtual.tamanho + 'px';

    alvo.classList.remove('escondido');
    moverAlvo();
    mostrarPlacar();

    cronometro = setInterval(function () {
        passarUmSegundo();
    }, 1000);
}

function passarUmSegundo() {
    jogo.tempoRestante -= 1;
    mostrarPlacar();

    if (jogo.tempoRestante === 0) {
        encerrarJogo();
    }
}

function encerrarJogo() {
    clearInterval(cronometro);
    clearTimeout(fuga);

    const nivelAtual = niveis[campoNivel.value];

    mensagem.textContent = montarMensagemDeFim(jogo.pontos, nivelAtual.recorde);
    
    if (bateuRecorde(jogo.pontos, nivelAtual.recorde)) {
        nivelAtual.recorde = jogo.pontos;
    }

    alvo.classList.add('escondido');
    botaoComecar.disabled = false;
    campoNivel.disabled = false; 
    botaoComecar.textContent = 'Jogar de novo';
    mostrarPlacar();
}

/* -----------------------------------------------------------
   Eventos
   ----------------------------------------------------------- */

botaoComecar.addEventListener('click', function () {
    iniciarJogo();
});

campoNivel.addEventListener('change', function () {
    mostrarPlacar();
});

alvo.addEventListener('click', function (evento) {
    evento.stopPropagation();

    if (alvo.classList.contains('bomba')) {
        jogo.pontos = Math.max(0, jogo.pontos - 5);
    } else if (alvo.classList.contains('dourado')) {
        jogo.pontos += 3;
    } else {
        jogo.pontos += 1;
    }
    
    mostrarPlacar();
    moverAlvo();
});

arena.addEventListener('click', function () {
    const nivelAtual = niveis[campoNivel.value];

    if (jogo.tempoRestante > 0 && nivelAtual.nome === 'Difícil') {
        jogo.pontos = Math.max(0, jogo.pontos - 1);
        mostrarPlacar();
    }
});