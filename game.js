var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 380 },
      debug: true,
    },
  },
  scene: [Carga, Final, Juego, PantallaInicial, muerta]
};

var game = new Phaser.Game(config);

var score;
var gameOver;

var muerte = false
var invisible;
var plataformachica;
var podersalir = false;
var spawnpuertabierta = false;
var puertarejas;
var cerrada = 0;
var puertas;
var puertabierta = false;
var tarjetaspawn = false;
var tarjetas;
var tarjeta;
var puerta;
var bomba = 0;
var HojasNiv = 1;
var FlorNiv = 1;
var llave;
var puerta;
var hojas;
var flores;
var carga = 0;
var player;
var bombs;
var platforms;
var cursors;
var scoreText;

var timedEvent;
var initialTime;
var timeText;

var level = 0;
