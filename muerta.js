class muerta extends Phaser.Scene {
  constructor() {
    super("muerta");
  }

  preload() {
    this.load.image("logo2D", "assets/logo2D.png");
  }

  create() {

      this.add.image(400, 300, "skydeath");
      muerte = 0;

    var puntajefinal = this.add.text(0, 0, "Score: " + score, {
      fontFamily: "Arial",
      fontSize: 70,
      color: "#000000",
    });

    Phaser.Display.Align.In.Center(
      puntajefinal,
      this.add.zone(400, 300, 800, 600)
    );

    var restartButton = this.add
      .image(400, 400, "restart")
      //Añade la interactividad con el boton
      .setInteractive({ cursor: "pointer", pixelPerfect: "true" });

    //Añade la accion cuando se presiona el boton
    restartButton.on("pointerdown", () => {
      this.scene.start("juego");
      podersalir = false;
      puertabierta = false;
      spawnpuertabierta = false;
      bomba = 0;
      cerrada = 0;
      FlorNiv = 1;
      HojasNiv = 1;
      score = 0;
    });
    //Estos dos son responsables del cambio de color cuando se pasa el mouse por encima
    restartButton.on("pointerover", () => {
      restartButton.setTint(0x7c5200);
    });
    restartButton.on("pointerout", () => {
      restartButton.clearTint();
    });

    boton = this.add
      .image(650, 530, "botoninicio")

      //Añade la interactividad con el boton
      .setInteractive({ cursor: "pointer", pixelPerfect: "true" });

    //Añade la accion cuando se presiona el boton
    boton.on("pointerdown", () => {
      this.scene.start("menu");
    });
    //Estos dos son responsables del cambio de color cuando se pasa el mouse por encima
    boton.on("pointerover", () => {
      boton.setTint(0x7c5200);
    });
    boton.on("pointerout", () => {
      boton.clearTint();
    });
  }
}
