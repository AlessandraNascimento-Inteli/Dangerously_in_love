class CatGame extends Phaser.Scene {
    constructor() {
      super({ key: "CatGame" });
    }

    preload (){
        this.load.image('background', 'assets/bg.jpg');
        this.load.image('cartinha', 'assets/cartinha.jpg');
        this.load.image('gatinho', 'assets/gatow.png');
        this.load.image('bombinha', 'assets/bombinha.png');
    }

    create (){
        let largura = this.scale.width;
        let altura = this.scale.height;

        this.background = this.add.image(largura/2, altura/2, 'background')
        .setOrigin(0.5, 0.5)
        .setDisplaySize(largura, altura);

        this.gatinho = this.physics.add.image(largura/2, altura - 100, 'gatinho')
        .setCollideWorldBounds(true)
        .setScale(0.5, 0.5)
        .refreshBody();

        this.gatinho.body.setGravityY(0);

        this.teclado = this.input.keyboard.createCursorKeys();

        this.cartinha = this.physics.add.image(largura/2, 100, 'cartinha')
        .setCollideWorldBounds(true)
        .setScale(0.3, 0.3)
        .refreshBody();

        this.cartinha.setBounce(0.5);

        this.bombinha = this.physics.add.image(300, 110, 'bombinha')
        .setCollideWorldBounds(true)
        .setScale(0.4, 0.4)
        .refreshBody();
        
        this.bombinha.body.onWorldBounds = true;

        this.physics.world.on('worldbounds', (body) => {
            if (body.gameObject === this.bombinha) {
                this.bombinha.setVisible(false);
        
                // Escolhe uma nova posição para a próxima bombinha
                let posicaoBombinha_X = Phaser.Math.Between(0, largura);
                let posicaoBombinha_Y = Phaser.Math.Between(0, altura);
        
                this.bombinha.setPosition(posicaoBombinha_X, posicaoBombinha_Y);
        
                // Faz ela reaparecer
                this.time.delayedCall(500, () => {
                    this.bombinha.setVisible(true);
                });
            }
        });
        

        this.pontuacao = 0;

        this.placar = this.add.text(50, 75, 'Cartinhas: ' + this.pontuacao, {fontSize: '50px', fill: '#495613'});

        this.physics.add.overlap(this.gatinho, this.cartinha, () => {
            this.cartinha.setVisible(false);

            let posicaoCartinha_Y = Phaser.Math.Between (0, altura);
            let posicaoCartinha_X = Phaser.Math.Between (0, largura);
            this.cartinha.setPosition(posicaoCartinha_Y, posicaoCartinha_X);
            
            this.pontuacao += 1;
            this.placar.setText('Cartinhas: ' + this.pontuacao);
            this.cartinha.setVisible(true);
        })

        this.physics.add.overlap(this.gatinho, this.bombinha, () => {
            this.bombinha.setVisible(true);

            let posicaoBombinha_X = Phaser.Math.Between(0, largura);
            let posicaoBombinha_Y = Phaser.Math.Between(0, altura);

            this.bombinha.setPosition(posicaoBombinha_X, posicaoBombinha_Y);
        })

        this.physics.add.overlap(this.gatinho, this.bombinha, () =>{
            this.physics.pause();
            this.scene.start("TelaFinal")
        })
            
    }

    update(){
        if(this.teclado.left.isDown){
            this.gatinho.setVelocityX(-300);
        }

        else if(this.teclado.right.isDown){
            this.gatinho.setVelocityX(300)
        }
        else {
            this.gatinho.setVelocityX(0);
        }

    }
}
