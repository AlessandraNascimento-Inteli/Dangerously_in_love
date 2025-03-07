class TelaInicial extends Phaser.Scene {
    constructor() {
      super({ key: "TelaInicial" });
    }

    preload(){
        this.load.image('bg-telaInicial', 'assets/telaPrincipal-bg.png');
        this.load.image('startBotao', 'assets/botaoStart.png');
        this.load.image('gatinhos', 'assets/lovers.png');
        this.load.image('textoTitulo', 'assets/tituloJogo.png');
    }

    create(){
        let largura = this.scale.width;
        let altura = this.scale.height;

        this.telaPrincipal = this.add.image(largura/2, altura/2, 'bg-telaInicial')
        .setOrigin(0.5, 0.5)
        .setDisplaySize(largura, altura);

        this.titulo = this.add.image(largura/2, altura/2, 'textoTitulo')
        .setOrigin(0.5, 0.5)
        .setScale(0.2, 0.2);

        this.gatinhosAmor = this.add.image(largura/2, 700, 'gatinhos')
        .setOrigin(0.5, 0.5);

        this.start = this.add.image(largura - 600, 500, 'startBotao')
        .setOrigin(0.3, 0.3)
        .setScale(0.5, 0.5)
        .setInteractive()
        .on('pointerdown', () => this.scene.start("CatGame"));

    }

    update (){

    }
}