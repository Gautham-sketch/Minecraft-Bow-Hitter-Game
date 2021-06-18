var Zombie,Bow1,Bow2,Arrow,bg,zombieG,zombieS,arrowG,GameOver;
var gameState = 1;
var score = 0;

function preload(){
  Zombie = loadImage("Zombie.jfif");
  Arrow = loadImage("Arrow.png");
  Bow1 = loadImage("Bow1.jpg");
  Bow2 = loadImage("Bow2.jpg");
  bg = loadImage("BackgroundImg.jfif");
  zombieS = loadSound("old-sound-of-zombie-in-minecraft.mp3");
  GameOver = loadImage("gameover.png");
}

function setup() {
  createCanvas(800,400);
  path = createSprite(400,200);
  path.addImage(bg);
  path.scale = 4;

  gameOver = createSprite(400,200);
  gameOver.addImage(GameOver);
  
  bow1 = createSprite(50,200);
  bow1.addImage(Bow1);
  bow1.scale = 0.5;

  zombieG = new Group();
  arrowG = new Group();
}

function draw() {
  background("white");
  
  if(gameState === 1){
    gameOver.visible = false;
    path.velocityX = -5;
    fill(255,0,0);
    textSize(32);
    text("Score : " + score,600,50);
    if (path.x < 0){
      path.x = path.width/2;
    }
    if(keyDown("space")){
      createArrow();
    }
    if(arrowG.isTouching(zombieG)){
      zombieG.destroyEach();
      arrowG.destroyEach();
      score += 1;
      zombieS.play();
    }
    if(bow1.isTouching(zombieG)){
      gameState = 0;
    }
    bow1.y = World.mouseY;
    spawnZombies();
  }
  else if(gameState = 0){
    path.velocityX = 0;
    path.x = 400
    path.y = 200
    zombieG.setLifeTimeEach(-1);
    zombieG.velocityX = 0;
    gameOver.visible = true;
  }
  drawSprites();
}

function spawnZombies(){
  if(frameCount % 100 === 0){
    var zombie = createSprite(Math.round(random(250,750)),Math.round(random(50,300)),10,10);
    zombie.addImage(Zombie);
    zombieG.add(zombie);
    zombie.LifeTime = 200;
    zombie.velocityX = -5;
    zombie.scale = 0.4;
  }
}

function createArrow() {
  var arrow= createSprite(bow1.x, bow1.y, 60, 10);
  arrow.addImage(Arrow);
  arrowG.add(arrow);
  arrow.x = 100;
  arrow.y=bow1.y;
  arrow.velocityX = 3;
  arrow.lifetime = 100;
  arrow.scale = 0.3;
}
