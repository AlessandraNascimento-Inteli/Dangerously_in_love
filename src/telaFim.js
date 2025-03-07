class TelaFinal extends Phaser.Scene {
    constructor() {
      super({ key: "TelaFinal" });
    }

    preload(){
        this.load.image('telaGameOver', 'assets/GameOver-bg.png');
        this.load.image('gameOver', 'assets/gameOver.gif');
        this.load.image('explosao', 'assets/explosaoGatinho.png');
        this.load.image('reset', 'assets/botaoReset.png');
        this.load.image('menu', 'assets/botaoMenu.png');

    }

    create(){
        let largura = this.scale.width;
        let altura = this.scale.height;

        this.telaOver = this.add.image(largura/2, altura/2, 'telaGameOver')
        .setOrigin(0.5, 0.5)
        .setDisplaySize(largura, altura);

       this.mensagemGameOver = this.add.text(largura / 2, altura / 2, 'GAME OVER', {fontSize: 90, fill: '#495613'})
       .setOrigin(0.5, 0.5);

        this.gatinhoExplosao = this.add.image(largura/2, 200, 'explosao')
        .setOrigin(0.5, 0.5);

        this.resetBotao = this.add.image(largura - 600, 500, 'reset')
        .setOrigin(0.3, 0.3)
        .setScale(0.5, 0.5)
        .setInteractive()
        .on('pointerdown', () => this.scene.start("CatGame"));

        this.menuBotao = this.add.image(largura - 1000, 500, 'menu')
        .setOrigin(0.3, 0.3)
        .setScale(0.5, 0.5)
        .setInteractive()
        .on('pointerdown', () => this.scene.start("TelaInicial"))

    }

    update (){

    }
}