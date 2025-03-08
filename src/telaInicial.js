// criação de uma classe para exibir a tela inical do jogo
class TelaInicial extends Phaser.Scene {
    constructor() {
      super({ key: "TelaInicial" });
    }
    /* Carregamento das imagens a serem utilizadas nesta classe */
    preload(){
        this.load.image('bg-telaInicial', 'assets/telaPrincipal-bg.png');
        this.load.image('startBotao', 'assets/botaoStart.png');
        this.load.image('gatinhos', 'assets/GatinhosdeAmores.png');
        this.load.image('textoTitulo', 'assets/tituloJogo.png');
    }

    /* Criação das funcionalidades desta classe */
    create(){
        let largura = this.scale.width; /* Carrega o jogo na largura completa da tela */
        let altura = this.scale.height;  /* Carrega o jogo na altura completa da tela */

        this.telaPrincipal = this.add.image(largura/2, altura/2, 'bg-telaInicial') //criação da tela principal do jogo
        .setOrigin(0.5, 0.5)
        .setDisplaySize(largura, altura);

        this.titulo = this.add.image(largura/2, 100, 'textoTitulo') // adição do título do jogo que foi implementado por meio de uma imagem
        .setOrigin(0.5, 0.5)
        .setScale(2);

        this.gatinhosAmor = this.add.image(largura/2, 350, 'gatinhos') // adição de imagem que represente a história do jogo
        .setOrigin(0.5, 0.5)
        .setScale(0.7);

        this.start = this.add.image(largura - 850, 550, 'startBotao') // adição do botão de iniciar o jogo
        .setOrigin(0.3, 0.3)
        .setScale(0.5, 0.5)
        .setInteractive()
        .on('pointerdown', () => this.scene.start("CatGame")); // define que ao botão ser clicado a próxima cena a ser executada é a da fase do jogo

    }
}
