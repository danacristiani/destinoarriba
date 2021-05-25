class Juego extends Phaser.Scene {
  constructor() {
    super("juego");
  }

  create() {
    //  Crea el fondo
    this.add.image(400, 300, "sky");

    this.add.image(683, 40, "tiempo");
    this.add.image(115, 40, "puntuacion");

    //  Agrega el un grupo para las plataformas
    platforms = this.physics.add.staticGroup();
    plataformachica = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(600, 568, "ground");
    plataformachica.create(100, 568, "plata2");
    plataformachica.create(290, 430, "plata2");
    plataformachica.create(500, 300, "plata2");

    // Agrega el grupo de la puerta
    puerta = this.physics.add.group();
    puertarejas = this.physics.add.group();

    //crea la barrera que te mata y elimina las flores u hojas al tocarla

    invisible = this.physics.add.staticGroup();
    invisible.create(500, 605.9, "invi");

    //Agrega el grupo para la tarjeta

    tarjeta = this.physics.add.group();

    //  Agrega las plataformas
    platforms.create(140, 300, "ground").setScale(0.7).refreshBody();
    platforms.create(520, 200, "ground").setScale(0.7).refreshBody();

    // Agrega el Jugador
    player = this.physics.add.sprite(100, 450, "dude");

    //  Agrega las propiedades del jugador.
    player.setCollideWorldBounds(true);
    player.setScale(1.2);
    player.depth = 1000;

    //  Crea el movimiento si no se creo anteriormente
    if ((cursors = !undefined)) {
      cursors = this.input.keyboard.createCursorKeys();
    }

    //Añade las flores y sus childs
    flores = this.physics.add.group({
      key: "flor",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    //Propiedades de los child
    flores.children.iterate(function (child) {
      //  Cambia el rebote de los child
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.5));

      child.x += Phaser.Math.FloatBetween(-15, 15);
      if (Phaser.Math.FloatBetween(0, 1) > 0.5) {
        child.score = 10;
        child.depth = 1000;
      } else {
        child.score = 10;
        child.depth = 1000;
      }
    });

    //Añade las alas y sus childs
    hojas = this.physics.add.group({
      key: "hoja",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    //Propiedades de los child
    hojas.children.iterate(function (child) {
      //  Cambia el rebote de los child
      child.setBounceY(Phaser.Math.FloatBetween(0.5, 0.7));

      child.x += Phaser.Math.FloatBetween(-15, 15);
      if (Phaser.Math.FloatBetween(0, 1) > 0.5) {
        child.score = 20;
        child.depth = 1000;
      } else {
        child.score = 20;
        child.depth = 1000;
      }
    });

    //Añade el grupo de las bombas
    bombs = this.physics.add.group();

    //  Añade el puntaje
    scoreText = this.add.text(16, 23, "Puntaje: 0", {
      fontSize: "32px",
      fill: "#000",
    });

    //  Se declaran las colisiones de los objetos
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(flores, platforms);
    this.physics.add.collider(hojas, platforms);
    this.physics.add.collider(tarjeta, platforms);
    this.physics.add.collider(tarjeta, plataformachica);
    this.physics.add.collider(puertarejas, platforms);
    this.physics.add.collider(puerta, platforms);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(bombs, plataformachica);
    this.physics.add.collider(player, plataformachica);
    this.physics.add.collider(hojas, plataformachica);
    this.physics.add.collider(flores, plataformachica);
    this.physics.add.collider(puerta, plataformachica);
    this.physics.add.collider(puertarejas, plataformachica);
    this.physics.add.collider(player, invisible, this.hitBomb2, null, this);

    //  Se declaran los overlap de los objetos, y si lo hacen se ejecuta una funcion
    this.physics.add.overlap(player, flores, this.collectFlores, null, this);
    this.physics.add.overlap(player, hojas, this.collectHojas, null, this);
    this.physics.add.overlap(player, tarjeta, this.agarrarTarjeta, null, this);
    this.physics.add.overlap(player, puertarejas, this.destruir, null, this);
    this.physics.add.overlap(hojas, invisible, this.disableHojas, null, this);
    this.physics.add.overlap(flores, invisible, this.disableFlores, null, this);

    this.physics.add.collider(player, bombs, this.hitBomb, null, this);

    // Inicializacion de variables.
    score = 0;
    gameOver = false;

    // Si no junta las estrellas en 30 segundas --> Game Over
    initialTime = 100;
    //timedEvent = this.time.delayedCall(1000, this.onSecond, [], this, true);
    timedEvent = this.time.addEvent({
      delay: 1000,
      callback: this.onSecond,
      callbackScope: this,
      loop: true,
    });
    timeText = this.add.text(590, 23, "", { fontSize: "32px", fill: "#000" });

    this.jumps = 0;
  }

  //Update checkea cada frame las siguientes condiciones

  update() {
    //Checkea si hubo un gameover
    if (gameOver) {
      return;
    }
    //Checkea si se toco alguna tecla de accion
    if (cursors.left.isDown) {
      player.setVelocityX(-160);

      player.anims.play("left", true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);

      player.anims.play("right", true);
    } else {
      player.setVelocityX(0);

      player.anims.play("turn");
    }
    //Checkea si se saltó y si se cumplieron las condiciones para terminar el juego
    if (cursors.up.isDown && player.body.blocked.down) {
      player.setVelocityY(-330);

      if (
        player.x > 480 &&
        player.x < 550 &&
        player.y < 140 &&
        podersalir == true
      ) {
        this.scene.start("final");
      }
    }

    //Checkea si se debe spawnear la tarjeta
    if (tarjetaspawn == true) {
      var tarjetas = tarjeta.create(100, 450, "tarjeta");

      tarjetaspawn = false;
    }

    //Checkea si se spawneo la puerta, y si se abrió para cambiar el sprite
    if (puertabierta == false && cerrada == 0) {
      puertas = puertarejas
        .create(520, 130, "puertacerrada")
        .setCollideWorldBounds(true);
      cerrada = 1;
    } else if (puertabierta == true && spawnpuertabierta == true) {
      var puertasa = puerta.create(520, 130, "puerta");
      spawnpuertabierta = false;
    }

    //Checkea si se cumplen las condiciones para pasar de ronda y spawnear una bomba
    if ((FlorNiv == 2 || HojasNiv == 2) && bomba === 0) {
      var x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      var bomb = bombs.create(x, 16, "bomb");
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;
      bomba = 1;
    } else if (bomba == 1 && (FlorNiv == 3 || HojasNiv == 3)) {
      var x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      var bomb = bombs.create(x, 16, "bomb");
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;
      bomba = 2;
      tarjetaspawn = true;
    } else if (bomba == 2 && (FlorNiv == 4 || HojasNiv == 4)) {
      var x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      var bomb = bombs.create(x, 16, "bomb");
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;
      bomba = 5000;
    }
  }

  //Funcion para agarrar la tarjeta y permitir el abrir la puerta
  agarrarTarjeta(player, tarjeta) {
    tarjeta.disableBody(true, true);
    puertabierta = true;
  }

  disableFlores(flor, invisible) {
    flor.disableBody(true, true);
  }
  disableHojas(hoja, invisible) {
    hoja.disableBody(true, true);
  }

  //Funciones para spawnear los collectibles y checkear en que ronda esta cada uno
  collectFlores(player, flor) {
    flor.disableBody(true, true);

    //  Add and update the score
    score += flor.score; //10;
    scoreText.setText("Score: " + score);

    if (flores.countActive(true) === 0 && FlorNiv <= 4 && HojasNiv <= 4) {
      //  A new batch of stars to collect
      flores.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true);
      });

      FlorNiv = FlorNiv + 1;
    }
  }

  collectHojas(player, hoja) {
    hoja.disableBody(true, true);

    //  Add and update the score
    score += hoja.score; //10;
    scoreText.setText("Score: " + score);

    if (hojas.countActive(true) === 0 && FlorNiv <= 4 && HojasNiv <= 4) {
      //  A new batch of stars to collect
      hojas.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true);
      });

      HojasNiv = HojasNiv + 1;
    }
  }

  //Funcion que desaparece la puerta cerrada para que solamente se vea la abierta luego de abrirla
  destruir(player, puertarejas) {
    if (
      cursors.space.isDown &&
      player.body.blocked.down &&
      puertabierta == true
    ) {
      puertarejas.destroy();

      spawnpuertabierta = true;
      podersalir = true;
    }
  }

  //funcion que mata al jugador y termina la partida si colisiona con una bomba
  hitBomb(player, bomb) {
    this.gameOver();
  }

  hitBomb2(player, invisible) {
    muerte=true
    this.gameOver();
  }
  


  //Funcion que se ejecuta cuando el jugador muere o pierde por tiempo, inicia la escena gameover
  //cambia el color del personaje y pausa las fisicas.

  gameOver() {
    gameOver = true;
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play("turn");

    if (muerte==false) {
      var gameOverButton = this.add
      .text(700, 500, "Game Over", {
        fontFamily: "Arial",
        fontSize: 70,
        color: "#ff0000",
      })
      .setInteractive()
      .on("pointerdown", () => this.scene.start("final"));
    Phaser.Display.Align.In.Center(
      gameOverButton,
      this.add.zone(400, 300, 800, 600)
    );
    } else if(muerte==true) {
      var gameOverButton = this.add
      .text(700, 500, "Game Over", {
        fontFamily: "Arial",
        fontSize: 70,
        color: "#ff0000",
      })
      .setInteractive()
      .on("pointerdown", () => this.scene.start("muerta"));
    Phaser.Display.Align.In.Center(
      gameOverButton,
      this.add.zone(400, 300, 800, 600)
    );
    }

    
  }


  

  //Funcion responsable del timer, cada un segundo baja el numero en 1
  onSecond() {
    if (!gameOver) {
      initialTime = initialTime - 1; // One second
      timeText.setText("Tiempo: " + initialTime);
      if (initialTime == 0) {
        timedEvent.paused = true;
        this.gameOver();
      }
    }
  }
}
