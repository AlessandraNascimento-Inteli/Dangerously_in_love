// Definindo a largura e altura da página conforme a tela do dispositivo
var width =  window.innerWidth;
var height = window.innerHeight;

var config = {
    type: Phaser.AUTO,
    width: width, // ajusta à tela do jogador
    height: height, // ajusta à tela do jogador
    physics: {

    // tipo de jogo e configuração de gravidade
    default: 'arcade', 
    arcade: {
        gravity: {y: 300},
        debug: false

        }
    },
    
    // instanciação de cenas
    scene: 
        [TelaInicial, CatGame, TelaFinal]
};

// Instanciando o phaser
var game = new Phaser.Game(config);