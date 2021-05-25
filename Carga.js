class Carga extends Phaser.Scene {
  constructor() {
    super("carga");
  }

  //Carga los assets

  preload() {
    this.load.image("tarjeta", "assets/tarjetapase.png");
    this.load.image("sky", "assets/sky.png");
    this.load.image("skydeath", "assets/skydeath.png");
    this.load.image("iniciomenu", "assets/menu.png");
    this.load.image("ground", "assets/platform.png");
    this.load.image("flor", "assets/florcita.png");
    this.load.image("hoja", "assets/hojita.png");
    this.load.image("bomb", "assets/bomb.png");
    this.load.image("boton", "assets/boton.png");
    this.load.image("puerta", "assets/puerta.png");
    this.load.image("puertacerrada", "assets/puertacerrada.png");
    this.load.image("plata2", "assets/platform2.png");
    this.load.image("pared", "assets/pared.png");
    this.load.image("restart", "assets/restart.png");
    this.load.image("botoninicio", "assets/botoninicio.png");
    this.load.image("puntuacion", "assets/puntuacion.png");
    this.load.image("tiempo", "assets/tiempo.png");
    this.load.image("invi", "assets/invi.png");

    this.load.spritesheet("dude", "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    //  Crea las animaciones de movimiento del personaje.
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    // Funcion FLECHA
    // (param1, param2, …, paramN) => { sentencias }
    // (param1, param2, …, paramN) => expresion
    // Equivalente a: () => { return expresion; }
  }

  //Checkea si se cargo y lanza la escena del menu de inicio

  update() {
    var carga = 1;
    if (carga == 1) {
      this.scene.start("menu");
    }
  }
}
