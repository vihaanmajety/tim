var missileImg,backgroundimg,spaceshipimg,ufoImg,Ufo2img,BeamImg
var Ufo,Missilebase,missile,missileGroup,Ufo2,beam
var number,missileCount=100,UfoLife=15,score=0,gameState="fight"
function preload(){
  missileImg=loadImage('Missile.png')
  backgroundimg=loadImage('Background.png')
  spaceshipimg=loadImage('walker (1).png')
  ufoImg=loadImage('Ufo enemy.png')
  Ufo2img=loadImage('Ufo 2 (1).png')
  BeamImg=loadImage('alien beam.png')

}


function setup(){
  
  createCanvas(windowWidth,windowHeight);
   Ufo=createSprite(width/2,height/2-300)
Ufo.addImage('ufo',ufoImg)
Ufo.scale=0.75
Missilebase=createSprite(width/2,height-150)
Missilebase.addImage('base',spaceshipimg)
Missilebase.scale=0.25
Ufo.velocityX=5
Ufo2=createSprite(width/2-100,height/2,40,40)
Ufo2.addImage('ufo',Ufo2img)
Ufo2.scale=0.15
Ufo2.velocityX=7
beam=createSprite(Ufo.x,Ufo.y+260)
beam.addImage('beam',BeamImg)
beam.scale=1.5
beam.visible=false

edges = createEdgeSprites()
missileGroup=new Group()

}

function draw() {
  background(0);
  image(backgroundimg,0,0,width,height)
if(gameState=="fight"){
 beam.x=Ufo.x
if(frameCount%100==0 || frameCount%101==0 || frameCount %102 ==0){
  beam.visible=true
  
}
else{
  beam.visible=false
}
  if(keyDown(RIGHT_ARROW)){
    Missilebase.x+=2
  }
  if(keyDown(LEFT_ARROW)){
    Missilebase.x-=2
  }
 /* if(Ufo.x>1000){
    Ufo.x=500
    Ufo.velocityX=-5
  }
  console.log(Ufo.x)
  if(Ufo.x>200){
    Ufo.velocityX=5
  }*/
 Ufo2.bounceOff(edges)
  Ufo.bounceOff(edges);
  //UFo.bounceOff(rightEdge);
 if(keyWentDown("space")){
   spawnMissiles()
 }
if(missileGroup.isTouching(Ufo)){
for(var i=0;i<missileGroup.length;i++){
  if(missileGroup[i].isTouching(Ufo)){
    missileGroup[i].destroy()
    UfoLife-=1
    score+=5
  }
}
}
  if(missileGroup.isTouching(Ufo2)){
    for(var i=0;i<missileGroup.length;i++){
      if(missileGroup[i].isTouching(Ufo2)){
        missileGroup[i].destroy()
        
      }
}
}
if(UfoLife==0){
  Ufo2.destroy()
  Ufo.destroy()
  fill("red")
  textSize(60)
  text("You won the Ufo ran out of lives",width/2-300,height/2)
}
if(missileCount==0){
  
  Ufo.destroy()
  missileGroup.destroyEach()
  Missilebase.destroy()
  gameState="end"
}
}
if(gameState=="end"){
  fill("red")
  textSize(60)
  text("You Ran Out Of Missiles,You Lose",width/2-300,height/2)
}
  drawSprites()
  fill("white")
  textSize(20)
  text("Score:"+score,width-200,40)
  text("MissilesLeft:"+missileCount,width-200,60)
}
function spawnMissiles(){
missile=createSprite(Missilebase.x,height-200)
missile.addImage(missileImg)
missile.velocityY=-5
missile.scale=0.25
missileCount-=1
missile.lifeTime=400
missileGroup.add(missile)
}