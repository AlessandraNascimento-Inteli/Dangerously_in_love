// criação de uma classe para exibir a tela de Game Over do jogo
class TelaFinal extends Phaser.Scene {
    constructor() {
      super({ key: "TelaFinal" });
    }
/* Carregamento das imagens a serem utilizadas nesta classe */
    preload(){
        this.load.image('telaGameOver', 'assets/GameOver-bg.png');
        this.load.image('gameOver', 'assets/gameOver.gif');
        this.load.image('explosao', 'assets/explosaoGatinho.png');
        this.load.image('reset', 'assets/botaoReset.png');
        this.load.image('menu', 'assets/botaoMenu.png');

    }
 /* Criação das funcionalidades desta classe */
    create(){
        let largura = this.scale.width; /* Carrega o jogo na largura completa da tela */
        let altura = this.scale.height; /* Carrega o jogo na altura completa da tela */

        this.telaOver = this.add.image(largura/2, altura/2, 'telaGameOver') // adição da imagem de fundo da tela Game Over
        .setOrigin(0.5, 0.5)
        .setDisplaySize(largura, altura);
        
       // adição de mensagem "GAME OVER" 
       this.mensagemGameOver = this.add.text(largura / 2, altura / 2, 'GAME OVER', {fontSize: 90, fill: '#495613'})
       .setOrigin(0.5, 0.5);

        this.gatinhoExplosao = this.add.image(largura/2, 200, 'explosao') // adição de imagem indicando o Game Over 
        .setOrigin(0.5, 0.5);

        //adição de botão para reiniciar o jogo
        this.resetBotao = this.add.image(largura - 600, 500, 'reset')
        .setOrigin(0.3, 0.3)
        .setScale(0.5, 0.5)
        .setInteractive()
        .on('pointerdown', () => this.scene.start("CatGame")); // indicação de qual cena deve iniciar ao clicar no botão "reset"

        //adição do botão para voltar para tela inicial do jogo
        this.menuBotao = this.add.image(largura - 1000, 500, 'menu')
        .setOrigin(0.3, 0.3)
        .setScale(0.5, 0.5)
        .setInteractive()
        .on('pointerdown', () => this.scene.start("TelaInicial")) // indicação de qual cena deve ser iniciada ao clicar no botão "menu"

    }
}