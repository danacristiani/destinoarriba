var boton;
class PantallaInicial extends Phaser.Scene {
  constructor() {
    super("menu");
  }

  create() {
    //  Agrega el fondo del inicio
    this.add.image(400, 300, "iniciomenu");

    //Agrega el boton para jugar
    boton = this.add
      .image(650, 500, "boton")

      //Añade la interactividad con el boton
      .setInteractive({ cursor: "pointer", pixelPerfect: "true" });

    //Añade la accion cuando se presiona el boton
    boton.on("pointerdown", () => {
      this.scene.start("juego");
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
