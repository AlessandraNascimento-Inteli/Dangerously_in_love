class TelaInicial extends Phaser.Scene {
    constructor() {
      super({ key: "TelaInicial" });
    }

    preload(){
        this.load.image('bg-telaInicial', 'assets/telaPrincipal-bg.png');
        this.load.image('startBotao', 'assets/botaoStart.png');
        this.load.image('gatinhos', 'assets/lovers.PNG');
        this.load.image('textoTitulo', 'assets/tituloJogo.png');
    }

    create(){
        let largura = this.scale.width;
        let altura = this.scale.height;

        this.telaPrincipal = this.add.image(largura/2, altura/2, 'bg-telaInicial')
        .setOrigin(0.5, 0.5)
        .setDisplaySize(largura, altura);

        this.titulo = this.add.image(largura/2, 100, 'textoTitulo')
        .setOrigin(0.5, 0.5)
        .setScale(2);

        this.gatinhosAmor = this.add.image(largura/2, 350, 'gatinhos')
        .setOrigin(0.5, 0.5)
        .setScale(0.8);

        this.start = this.add.image(largura - 850, 550, 'startBotao')
        .setOrigin(0.3, 0.3)
        .setScale(0.5, 0.5)
        .setInteractive()
        .on('pointerdown', () => this.scene.start("CatGame"));

    }

    update (){

    }
}