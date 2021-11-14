var PLAY = 1;
var END = 0;
var gameState = PLAY;

var skybg, waterbg, shipimg, helicopterimg, bombimg;
var water, ship, helicopter, bomb;
var helicopterGroup, bombGroup;
var score = 0;



function preload(){
  skybg = loadImage("skybg.jpg");
  waterbg = loadImage("waterbg.png");
  shipimg = loadImage("ship.png");
  helicopterimg = loadImage("helicopter.png");
  bombimg = loadImage("bomb.png");
}

function setup() {
  createCanvas(800, 450);
  
  //creating water ground
  water=createSprite(200,200);
  water.addImage(waterbg);
  water.velocityX = 4;
 
  
  
  //creating ship
  ship = createSprite(70,580,20,20);
  ship.addAnimation("ShipMoving", shipimg);
  //ship.debug = "true";
  ship.setCollider("rectangle", 0, 10,100,50)
  
  //creating helicopter group
  helicopterG=new Group();

  //creating bomb group
  bombG=new Group();

}

function draw() {
  background(skybg);
  fill("yellow")
  textSize(15);
  text("SURVIVAL TIME: "+ score, 600,30);
  
    
  //gameState play
  if(gameState === PLAY){
    //increase score
    score = score + Math.round(frameCount/300);

    
    //Call user defined function
   spawnHelicopter();
   spawnBomb();

    
    if(bombGroup.isTouching(ship)){
        gameState = END;
    }
    
  }
  
  //gameState end
  else if(gameState === END){
    ship.addImage("ship",restartimg)
   //water velocity becomes zero
water.velocityX=0;

   //destroy Helicopter group
helicopterG.destroyEach();

   //destroy bomb group
   bombG.destroyEach();
  
    
  }
  
 
 //for infinite background 
 if(water.position.x < 300){
    water.position.x = 400;
    }
    
  
  drawSprites();
}


function spawnHelicopter(){
  if(frameCount%200 === 0){
    helicopter = createSprite(800,80,200,50);
    helicopter.addImage("helicopter",helicopterimg);
    helicopter.setVelocity(-5,0);
    
    helicopter.scale = 0.5;
    
    helicopterGroup.add(helicopter);
  }
}

function spawnBomb(){
 // create bombs at random position
 //use Math.random
 var bomb= createSprite(Math.round(random(50, 350)),40, 10, 10);
 bomb.addImage(bombimg);
 bomb.scale=0.1;
  //bomb.debug = "true";
  bomb.velocityY = 3;
  bomb.lifetime = 200;
  bombGroup.add(bomb);
  }




