var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running, bananaImage, obstacleImage, monkeyCollide, groundImg;
var ground, banana, obstacle, invisibleGround, GameOver;
var bananaGroup, obstacleGroup;
var survivalTime = 0;
var score = 0;

function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkeyCollide = loadAnimation("sprite_2.png");


}

function setup() {
  createCanvas(600, 400);
  monkey = createSprite(80, 277, 2, 8);
  monkey.scale = 0.1
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkeyCollide);


  ground = createSprite(450, 340, 1200, 10);
  ground.velocityX = -6;
  //  invisiGround = createSprite(300,278,600,7);
  //  invisiGround.visible = false;

  obstacleGroup = new Group();
  bananaGroup = new Group();
  // score=0;


}

function draw() {
  background(180);
  fill("black");
  textSize(20);
  text("score:" + score, 470, 20);
  text("Survival Time :" + survivalTime, 300, 20);
  if (gameState === PLAY) {
    banana();
    obstacles();
    monkey.changeAnimation("monkey", monkey_running);
    ground.velocityX = -4;
    survivalTime = Math.ceil(frameCount / frameRate());
    if (keyDown("space") && monkey.y >= 235) {
      monkey.velocityY = -13;
    }
    monkey.velocityY = monkey.velocityY + 0.8
    if (ground.x < 0) {
      ground.x = 450;
    }
    if (bananaGroup.isTouching(monkey)) {
      bananaGroup.destroyEach();
      score = score + 2;

    }
    if (obstacleGroup.isTouching(monkey)) {
      gameState = END;
    }
  }                                            

  if (gameState === END) {     
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    ground.velocityX = 0;
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    monkey.velocityY = 0;
    monkey.changeAnimation("collide", monkeyCollide);
    textSize(29);
    fill("black");
    text("GameOver", 200, 200);
  }
  drawSprites();

  monkey.collide(ground);
}

function banana() {
  if (World.frameCount % 80 === 0) {
    var banana = createSprite(500, 200)
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.velocityX = -3;
    banana.lifetime = 200;
    banana.scale = 0.1
    bananaGroup.add(banana)
  }
}

function obstacles() {
  if (World.frameCount % 200 === 0) {
    obstacle = createSprite(620, 320, 50, 50);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -7;
    obstacle.scale = 0.1;
    obstacle.lifetime = 100;

    obstacleGroup.add(obstacle);
  }
}