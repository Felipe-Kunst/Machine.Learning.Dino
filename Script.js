import utilitarios from './Utils.js';
import RNA from './Rna.js';
import controles from './Controls.js';

const AMOSTRAS = 20;
const jogo = Runner.instance_;
let listaDeDinos = [];
let indiceDoDino = 0;

let melhorPontuacao = 0;
let melhorRNA = null;

function preencherListaDeDinos () {
  for (let i = 0; i < AMOSTRAS; i++) {
    listaDeDinos[i] = new RNA(3, [10, 10, 2]);
    listaDeDinos[i].carregar(melhorRNA);  // Correção aqui: método `carregar`
    if (i > 0) listaDeDinos[i].mutar(0.5);
  }
  console.log('Lista de Dinossauros criada!');
}

setTimeout(() => {
  preencherListaDeDinos();
  controles.dispatch('pular');
}, 1000);

setInterval(() => {
  if (!jogo.activated) return;

  const dino = listaDeDinos[indiceDoDino];

  if (jogo.crashed) {
    if(dino.pontuação > melhorPontuacao) {
      melhorPontuacao = dino.pontuação;
      melhorRNA = dino.salvar();
      console.log('Melhor Pontuação: ', melhorPontuacao);
    }
    indiceDoDino++;

  if (indiceDoDino === AMOSTRAS) {
    preencherListaDeDinos();
    indiceDoDino = 0;
    melhorPontuacao = 0;
  }
  jogo.restart();
}

 const {tRex, horizon, currentSpeed, distanceRan, dimensions} = jogo;
 dino.pontuação = distanceRan - 2000;

 const jogador = {
  x: tRex.xPos,
  y: tRex.yPos,
  velocidade: currentSpeed
 };

 const [obstaculo] = horizon.obstacles
    .map((obstaculo) => {
    return {
      x: obstaculo.xPos,
      y: obstaculo.yPos
    }
  })
    .filter((obstaculo) => obstaculo.x > jogador.x)

    if (obstaculo) {
      const distancia = 1 - (utilitarios.getDistance(jogador, obstaculo) / dimensions.WIDTH);
      const velocidade = jogador.velocidade / 6;
      const altura = Math.tanh(105 - obstaculo.y);

      const [pular, agachar] = dino.calcular([
        distancia,
        velocidade,
        altura
      ]);   

      if (pular === agachar) return;
      if (pular) controles.dispatch('pular'); // Se for verdadeiro, o dinossauro pula
      if (agachar) controles.dispatch('agachar');
    };
}, 100);
