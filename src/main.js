// Definindo a largura e altura da página
var width =  window.innerWidth;
var height = window.innerHeight;

var config = {
    type: Phaser.AUTO,
    width: width,
    height: height,
    physics: {

    default: 'arcade', 
    arcade: {
        gravity: {y: 300},
        debug: false

        }
    },

    scene: 
        [TelaInicial, CatGame, TelaFinal]
};

// Instanciando o phaser
var game = new Phaser.Game(config);