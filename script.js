// Variáveis para controlar o estado do jogo
let perguntaAtual = 0;
let placar = 0;

// Lista de perguntas
const perguntas = [
    { pergunta: "Qual é o maior campeão Brasileiro?", opcoes: ["São Paulo", "Palmeiras", "Flamengo", "Corinthians"], respostaCorreta: 1, valor: 1000, audio: "audio1000" },
    { pergunta: "Quantos jogadores cada time possui em campo durante uma partida oficial de futebol?", opcoes: ["9", "10", "11", "12"], respostaCorreta: 2, valor: 2000, audio: "audio2000" },
    { pergunta: "Qual é o tempo regulamentar de uma partida de futebol profissional?", opcoes: ["70", "80", "90", "100"], respostaCorreta: 2, valor: 3000, audio: "audio3000" },
    { pergunta: "Qual jogador é conhecido como O Rei do Futebol?", opcoes: ["Maradona", "Zico", "Neymar", "Pelé"], respostaCorreta: 3, valor: 4000, audio: "audio4000" },
    { pergunta: "Em qual país aconteceu a primeira Copa do Mundo?", opcoes: ["Uruguai", "Brasil", "Argentina", "Italia"], respostaCorreta: 0, valor: 5000, audio: "audio5000" },
    { pergunta: "Quantas Copas do Mundo a Seleção Brasileira de Futebol venceu até 2022?", opcoes: ["3", "5", "4", "0"], respostaCorreta: 1, valor: 10000, audio: "audio10000" },
    { pergunta: "Qual a cor do cartão que um árbitro mostra para um jogador que é expulso?", opcoes: ["Vermelho", "Amarelo", "Laranja", "Azul"], respostaCorreta: 0, valor: 20000, audio: "audio20000" },
    { pergunta: "Qual o nome da posição do jogador que defende o gol?", opcoes: ["Gandula", "Lateral", "Goleiro", "Atacante"], respostaCorreta: 2, valor: 30000, audio: "audio30000" },
    { pergunta: "Qual país ganhou a Copa do Mundo de 2018?", opcoes: ["Brasil", "França", "Argentina", "Italia"], respostaCorreta: 1, valor: 40000, audio: "audio40000" },
    { pergunta: "Em que cidade foi inaugurado o famoso estádio de Wembley?", opcoes: ["Paris", "londres", "Buenos Aires", "São Paulo"], respostaCorreta: 1, valor: 50000, audio: "audio50000" },
    { pergunta: "Qual é a maior competição de clubes da Europa?", opcoes: ["Copa do mundo", "Liga dos Campeões", "Libertadores", "Copa do Rei"], respostaCorreta: 1, valor: 100000, audio: "audio100000" },
    { pergunta: "Qual desses clubes é conhecido como “Blaugrana”?", opcoes: ["Barcelona", "Milan", "Real Madrid", "Palmeiras"], respostaCorreta: 0, valor: 200000, audio: "audio200000" },
    { pergunta: "Em qual ano o Brasil sediou a Copa do Mundo pela primeira vez?", opcoes: ["2014", "1970", "1962", "1950"], respostaCorreta: 3, valor: 300000, audio: "audio300000" },
    { pergunta: "Quantos títulos de Copa do Mundo a Seleção da Alemanha conquistou até 2022?", opcoes: ["2", "3", "5", "4"], respostaCorreta: 3, valor: 400000, audio: "audio400000" },
    { pergunta: "Qual é o nome do famoso torneio anual entre seleções sul-americanas?", opcoes: ["Copa Libertadores", "Copa do Mundo", "Copa América", "Liga das Nações"], respostaCorreta: 2, valor: 500000, audio: "audio500000" },
    { pergunta: "Qual jogador argentino é considerado um dos maiores rivais históricos de Pelé?", opcoes: ["Diego Maradona", "Cafú", "Messi", "Cristiano Ronaldo"], respostaCorreta: 0, valor: 1000000, audio: "audio1000000" }
];


// Selecionando elementos do DOM
const startButton = document.getElementById('start-button');
const startScreen = document.getElementById('start-screen');
const gameContainer = document.querySelector('.game-container');
const audioAbertura = document.getElementById('audioAbertura');
const audioErrou = document.getElementById('audioErrou');
const audioGanhou = document.getElementById('audioGanhou');
const audioParabens = document.getElementById('audioParabens');
const mensagem = document.getElementById("mensagem"); // Elemento para mostrar mensagem ao usuário

// Toca o áudio de abertura quando a página é carregada
window.onload = function() {
    const audioAbertura = new Audio('assets/audio/abertura-show-do-milhao.mp3');
    audioAbertura.play().catch(error => {
        console.log("Autoplay falhou devido às restrições do navegador.", error);
    });
};

// Escuta o evento de clique no botão de iniciar
startButton.addEventListener("click", function() {
    startScreen.style.display = "none"; // Esconde a tela de início
    gameContainer.style.display = "flex"; // Mostra a tela do jogo
    exibirPergunta(); // Chama a função para exibir a primeira pergunta
});

// Função para exibir a pergunta atual
function exibirPergunta() {
    mensagem.innerText = "";
    const pergunta = perguntas[perguntaAtual];
    document.getElementById("question").innerText = pergunta.pergunta;

    // Exibir opções
    pergunta.opcoes.forEach((opcao, index) => {
        const botaoOpcao = document.getElementById(`option${index + 1}`);
        botaoOpcao.innerText = opcao;
        botaoOpcao.onclick = () => verificarResposta(index);
    });

    // Exibir valor da pergunta
    document.getElementById("score").innerText = `Valendo: R$ ${pergunta.valor}`;

    // Toca o áudio específico da pergunta
    const audioPergunta = document.getElementById(pergunta.audio);
    if (audioPergunta) {
        audioPergunta.play().catch(error => {
            console.error("Erro ao tocar o áudio da pergunta:", error);
        });
    }
}

// Função para verificar a resposta do usuário
function verificarResposta(opcaoSelecionada) {
    const pergunta = perguntas[perguntaAtual];

    if (opcaoSelecionada === pergunta.respostaCorreta) {
        handleAnswer(true, pergunta.valor); // Chama a função de resposta correta
    } else {
        handleAnswer(false);
    }
}

// Função para manipular a resposta do usuário
function handleAnswer(isCorrect, valor) {
    const audioWrong = document.getElementById("audioErrou");

    if (isCorrect) {
        // Verifica se é a última pergunta
        if (perguntaAtual === perguntas.length - 1) {
            // Última pergunta: tocar o áudio de "ganhou" e mostrar a mensagem final
            audioGanhou.play();
            mensagem.innerText = "Parabéns! Você ganhou R$ 1.000.000!";
            setTimeout(finalizarJogo, 2000); // Espera um tempo antes de finalizar o jogo
            return; // Encerra o jogo sem avançar para a próxima pergunta
        } else {
            // Outras perguntas: tocar o áudio de "parabéns" e mostrar a mensagem simples
            audioParabens.play();
            mensagem.innerText = "Parabéns! Você acertou!";
            mensagem.style.color = "green";
        }

        // Atualizar o placar
        placar += valor;
        document.getElementById("score").innerText = `Placar: R$ ${placar}`;
    } else {
        audioWrong.play();
        mensagem.innerText = "Resposta Incorreta!";
        mensagem.style.color = "red";
        placar = 0; // Zera o placar em caso de erro
        resetarJogo();
        return; // Sai da função para evitar chamada do próximo
    }

    // Avança para a próxima pergunta após 2 segundos
    setTimeout(() => {
        perguntaAtual++; // Avança para a próxima pergunta
        if (perguntaAtual < perguntas.length) {
            exibirPergunta(); // Exibe a próxima pergunta
        }
    }, 2000);
}

// Função para finalizar o jogo
function finalizarJogo() {
    gameContainer.style.display = "none";
    document.getElementById("end-screen").style.display = "block";
    document.getElementById("final-message").innerText = "Parabéns! Você completou o Show do Milhão e ganhou R$ 1.000.000!";
}

// Função para reiniciar o jogo
document.getElementById("restart-button").addEventListener("click", function() {
    document.getElementById("end-screen").style.display = "none";
    startScreen.style.display = "block";
    perguntaAtual = 0;
    placar = 0;
});

// Código para as opções de resposta
document.addEventListener("DOMContentLoaded", () => {
    for (let i = 1; i <= 4; i++) {
        const botaoOpcao = document.getElementById(`option${i}`);
        if (botaoOpcao) {
            botaoOpcao.onclick = () => verificarResposta(i - 1);
        }
    }
});
















