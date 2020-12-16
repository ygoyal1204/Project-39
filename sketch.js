var PLAY = 1;
var END = 0;
var INTRO=2;
var RULE = 3;
var gameState =INTRO;

var monkey , monkey_running, monkeyStop;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var time=0
var score=0
var lives=3
var ground, invisibleGround, groundImage
var sun, sun_ani
var over, overImg
var restart, restartImg
var introImg, intro
var introBImg, introB
var moon, moonImg;
var rules, rulesImg, rulesb, rulesbImg;
var bg1, bg2

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  sun_ani = loadAnimation("sun1.png", "sun2.png");
  groundImage = loadImage("ground.png");
  
  overImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
monkeyStop = loadAnimation("sprite_0.png");
  
  introImg = loadImage("intro.png");
  
  introBImg=loadImage("introB.png");

  moonImg=loadImage("moon.png");

  rulesbImg=loadImage("rulesb.png");

  rulesImg=loadImage("rules2.png");

  bg1 = loadImage("bg1.png");
  bg2 = loadImage("bg2.jpg");
 }

function setup() {
  createCanvas(displayWidth, 400);
  //original width = 600
  
monkey = createSprite(80,335,20,20);
  monkey.addAnimation("move", monkey_running);
  monkey.scale = 0.1;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();

  
  time=0;
  monkey.setCollider("circle", 0, 0, 150);
  monkey.debug=false;
  
   ground = createSprite(200,474,600,30);
  ground.addImage("ground", groundImage);
  ground.scale=45;
  ground.x = ground.width /2;
  
  sun = createSprite(40, 40);
  sun.addAnimation("shine", sun_ani);
  sun.scale=0.6;

  moon = createSprite(65, 65);
  moon.addImage(moonImg);
  moon.scale=1.5
  
  invisibleGround = createSprite(200, 380, 300, 10);
  invisibleGround.visible=false;
  
  over = createSprite(displayWidth/2, 220);
  over.addImage(overImg);
  
  restart = createSprite(displayWidth/2, 275);
  restart.addImage(restartImg);
  
   intro = createSprite(displayWidth/2-50, 180);
  intro.addImage(introImg);
  intro.scale=0.45;
  
  introB = createSprite(displayWidth/2-50, 325);
  introB.addImage(introBImg);
  introB.scale=0.4;

  rulesb = createSprite(displayWidth/2+195, 220);
  rulesb.addImage(rulesbImg);
  rulesb.scale=0.4;

  rules = createSprite(displayWidth/2-180, 200);
  rules.addImage(rulesImg);
  rules.scale=0.8;
  rules.visible=false;

}


function draw() {
  
  if(gameState===INTRO){
    intro.visible=true;
    monkey.visible=false;
    over.visible=false;
    restart.visible=false;
    ground.visible=false;
    introB.visible=true;
    sun.visible=false;
    moon.visible=false;
    rules.visible=false;
    rulesb.visible=true;
    introB.x=displayWidth/2-50;
    introB.y=325;
    introB.scale=0.4;
    background("lightgreen");
    if(mousePressedOver(introB)){
      gameState=PLAY;
    }
    if(mousePressedOver(rulesb)){
      gameState=RULE;
    }
  }

  if(gameState===RULE){
    intro.visible=false;
    monkey.visible=false;
    over.visible=false;
    restart.visible=false;
    ground.visible=false;
    introB.visible=true;
    sun.visible=false;
    moon.visible=false;
    rules.visible=true;
    rulesb.visible=false;
    background("lightgreen");
    introB.x=displayWidth/2+150;
    introB.y=300;
    introB.scale=0.5;
    if(mousePressedOver(introB)){
      gameState=PLAY;
    }
    fill("black");
    textSize(30);
    text("ALL THE BEST!!", displayWidth/2+50,200);
  }
  
  if(gameState===PLAY){
  
    rulesb.visible=false;
    rules.visible=false;
  time = time + Math.round((Math.round(World.frameRate/62))*0.5);
  ground.velocityX = -(3 + time/200);
    
    over.visible=false;
    restart.visible=false;
    monkey.visible=true;
    ground.visible=true;
    introB.visible=false;
    intro.visible=false;
    
    if (ground.x <0){
      ground.x = ground.width/2;
    }
    
     
  if(keyDown("space")&&monkey.y>=355){
    monkey.velocityY = -16.5;
  }
  if(keyDown("up")&&monkey.y>=355){
    monkey.velocityY=-13;
  }
    
    if(monkey.isTouching(FoodGroup)){
    score=score+1;
    FoodGroup.destroyEach();
  }
    
     time = time + Math.round((Math.round(World.frameRate/60))*0.5);
  ground.velocityX = -(3 + time/200);

  if(time<1000){
    background(bg1);
    sun.visible=true;
    moon.visible=false;
  }

  if(time>1000 && time<2000){
    background(bg2);
    sun.visible=false;
    moon.visible=true;
  }

  if(time>2000){
    background(bg1);
    sun.visible=true;
    moon.visible=false;
  }

  if(time>3000){
    gameState=END;
    textSize(27);
    fill("red");
    textAlign(CENTER)
    text("CONGRATS! You have finished your Journey!", displayWidth/2, 170);
    fill("blue");
    textSize(33);
    text("YOU WIN!", displayWidth/2, 120);
  }
    
      spawnBanana();
  spawnObstacles();

  switch(score){
    case 2: monkey.scale=0.11;
    break;
    case 4: monkey.scale=0.12;
    break;
    case 6: monkey.scale=0.13;
    break;
    case 8: monkey.scale=0.14;
    break;
    case 10: monkey.scale=0.15;
    break;
    case 12: monkey.scale=0.16;
    break;
    case 14: monkey.scale=0.17;
    break;
    case 16: monkey.scale=0.18;
    break;
    case 18: monkey.scale=0.19;
    break;
    case 20: monkey.scale=0.2;
    break;
    case 22: monkey.scale=0.21;
    break;
    case 24: monkey.scale=0.22;
    break;
    case 26: monkey.scale=0.23;
    break;
    case 28: monkey.scale=0.24;
    break;
    case 30: monkey.scale=0.25;
    break;
    default: break;
  }
    
    if(monkey.isTouching(obstacleGroup)){
      textSize(27);
      fill("red");
      textAlign(CENTER);
      text("Sorry! Try Again to survive till 3000 time!", displayWidth/2, 170);
      fill("green");
      textSize(33);
      text("YOU LOST!", displayWidth/2, 120);
      obstacleGroup.destroyEach();
      monkey.scale=0.1;
      gameState=END;
    }
    
  }
  if(gameState===END){
    
    over.visible=true;
    restart.visible=true;
    ground.velocityX=0;
    monkey.velocityY=0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    monkey.visible=false;
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    
    if(mousePressedOver(restart)){
      gameState=INTRO;
      time=0;
      score=0;
    }
  }
  
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(invisibleGround);
 
  console.log(monkey.y);

  fill("red");
  textSize(25);
  text("Survival Time: "+ time, displayWidth-225,30);
  text("Score: "+score, displayWidth-220, 60);
  
 drawSprites();
  
}

function spawnObstacles(){
  if(frameCount%130===0){
    var obstacle = createSprite(displayWidth, 365);
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.12;
    obstacle.velocityX=ground.velocityX;
    obstacle.lifetime=2000;
    obstacleGroup.add(obstacle);
  }
}

function spawnBanana(){
  var rand = Math.round(random(220, 300));
  if(frameCount%260===0){
    var banana = createSprite(displayWidth, rand);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.lifetime=2000;
    banana.velocityX=ground.velocityX;
    FoodGroup.add(banana);
  }
}








