/* Criação de uma classe para execução da fase do jogo */
class CatGame extends Phaser.Scene {
    constructor() {
      super({ key: "CatGame" });
    }

    /* Carregamento das imagens a serem utilizadas nesta classe */
    preload (){
        this.load.image('background', 'assets/bg.jpg');
        this.load.image('cartinha', 'assets/cartinha.jpg');
        this.load.image('gatinho', 'assets/gatow.png');
        this.load.image('bombinha', 'assets/bombinha.png');
    }

    /* Criação das funcionalidades desta classe */
    create (){
        let largura = this.scale.width; /* Carrega o jogo na largura completa da tela */
        let altura = this.scale.height; /* Carrega o jogo na altura completa da tela */

        this.background = this.add.image(largura/2, altura/2, 'background') /* adição de tela de fundo */
        .setOrigin(0.5, 0.5)
        .setDisplaySize(largura, altura);

        this.gatinho = this.physics.add.image(largura/2, altura - 100, 'gatinho') /* adição do player deste jogo*/
        .setCollideWorldBounds(true)
        .setScale(0.5, 0.5)
        .refreshBody();

        this.gatinho.body.setGravityY(0); // definindo o efeito da gravidade sobre o player, mantendo-o no eixo x

        this.teclado = this.input.keyboard.createCursorKeys(); // adição de utilização de teclas do teclado

        this.cartinha = this.physics.add.image(largura/2, 100, 'cartinha') // adição da cartinha
        .setCollideWorldBounds(true) // ela irá colidir com o mundo
        .setScale(0.3, 0.3)
        .refreshBody();

        this.cartinha.setBounce(0.5); // pulo que a cartinha exibirá ao alcançar a extremidade inferior da tela

        //loop para garantir que a bombinha não inicie na mesma posição que o gatinho (player)
        do {
            this.bombinha = this.physics.add.image(
                Phaser.Math.Between(0, largura),
                Phaser.Math.Between(0, altura),
                'bombinha'
            ).setCollideWorldBounds(true)
            .setScale(0.4);
        } while (Phaser.Geom.Intersects.RectangleToRectangle(
            this.gatinho.getBounds(), this.bombinha.getBounds()
        ));
        
        this.bombinha.body.onWorldBounds = true; // garante a colisão da bombinha com o limite inferior da tela

        this.physics.world.on('worldbounds', (body) => {
            if (body.gameObject === this.bombinha) {
                this.bombinha.setVisible(false);
        
                // define uma nova posição para a bombinha
                let posicaoBombinha_X = Phaser.Math.Between(0, largura);
                let posicaoBombinha_Y = Phaser.Math.Between(0, altura);
        
                this.bombinha.setPosition(posicaoBombinha_X, posicaoBombinha_Y);
        
                // faz outra bombinha aparecer quando a anterior colidir com o limite definido
                this.time.delayedCall(500, () => {
                    this.bombinha.setVisible(true);
                });
            }
        });
        

        this.pontuacao = 0; // declaração da variável de pontuação para ser utilizada no platar

        //adição de placar
        this.placar = this.add.text(50, 75, 'Cartinhas: ' + this.pontuacao, {fontSize: '50px', fill: '#495613'});

        // garatia da colisão do gatinho com as cartinhas e o aumento da pontuação sempre que ocorre esta colisão
        this.physics.add.overlap(this.gatinho, this.cartinha, () => {
            this.cartinha.setVisible(false);

            let posicaoCartinha_Y = Phaser.Math.Between (0, altura);
            let posicaoCartinha_X = Phaser.Math.Between (0, largura);
            this.cartinha.setPosition(posicaoCartinha_Y, posicaoCartinha_X);
            
            this.pontuacao += 1;
            this.placar.setText('Cartinhas: ' + this.pontuacao);
            this.cartinha.setVisible(true);
        })

        //define a colisão do gatinho (player) com a bombinha
        this.physics.add.overlap(this.gatinho, this.bombinha, () => {
            this.bombinha.setVisible(true);

            let posicaoBombinha_X = Phaser.Math.Between(0, largura);
            let posicaoBombinha_Y = Phaser.Math.Between(0, altura);

            this.bombinha.setPosition(posicaoBombinha_X, posicaoBombinha_Y);
        })
        
        //inicia outra cena (a tela de Game Over) quando o gatinho colidir com a bombinha
        this.physics.add.overlap(this.gatinho, this.bombinha, () =>{
            this.physics.pause();
            this.scene.start("TelaFinal")
        })

        //adição das instruções para o jogador
        this.instrucoes = this.add.text(largura/2, 100, "Utilize as teclas < e > do seu teclado\npara movimentar o gatinho.\nPegue as cartas e fuja das bombas!", {fontSize: 30, fill: '#495613'})
            
    }

    update(){

        // define a velocidade do gatinho quando a tecla left é utilizada
        if(this.teclado.left.isDown){
            this.gatinho.setVelocityX(-300);
        }

        // define a velocidade do gatinho quando a tecla rigth é utilizada
        else if(this.teclado.right.isDown){
            this.gatinho.setVelocityX(300)
        }

        // define a velocidade do gatinho quando nehuma tecla definida está sendo utilizada
        else {
            this.gatinho.setVelocityX(0);
        }

    }
}
