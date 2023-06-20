 //game constants & variables
 let inputdir ={x: 0, y: 0};
 const foodSound = new Audio('food.mp3');
 const gameOverSound =new Audio('GameOver.mp3');
 const moveSound = new Audio('starting.mp3');
 const musicSound = new Audio('music.mp3');
 let speed = 8;
 let score = 0;
 let lastpainttime = 0;
 let snakeArr = [
    {x: 13,y: 15}
]
food = {x: 6,y: 7};


//game function 
  function main(ctime) {
    window.requestAnimationFrame(main);
   // console.log(ctime)
     if((ctime-lastpainttime)/1000 < 1/speed)
     {
        return;
     }
     lastpainttime = ctime;
     gameEngine();
   }

    function isCollide(snake) {
        // if you bump into yourself 
        for(let i = 1; i < snakeArr.length; i++){
            if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
                return true;
            }
        }
        if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0 )
        {
            return true;
        }
    }
  function gameEngine()
   {
      // part 1: updating the snake array and food 
      if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputdir = {x: 0,y: 0};
        alert("Game Over. Press any key to play again!");
        snakeArr =[ {x: 13,y: 15}];
        musicSound.play();
        score = 0;
      }

      //if you have the food , increment  the score and regenerate the food 
      if(snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
      
        scoreBox.innerHTML = "score: "+ score;
        
        snakeArr.unshift({x: snakeArr[0].x + inputdir.x, y: snakeArr[0].y + inputdir.y});
        let a = 2;
        let b =16;
        food = {x: Math.round(a+(b-a)*Math.random()),y: Math.round(a + (b-a)* Math.random())}
        

      }

      //moving the snake 
      for(let i = snakeArr.length - 2;i>=0 ;i--){
        snakeArr[i+1]={...snakeArr[i]};
      }
      snakeArr[0].x += inputdir.x;
      snakeArr[0].y += inputdir.y;

      // part 2:  display the snake and food 
      //dispay the snake
      board.innerHTML="";
      snakeArr.forEach((e, index)=>{
          snakeElement = document.createElement('div');
          snakeElement.style.gridRowStart = e.y;
          snakeElement.style.gridColumnStart = e.x;
        
          if(index === 0)
          {
            snakeElement.classList.add('head');
          }
          else{
            snakeElement.classList.add('snake');
          }
          board.appendChild(snakeElement);
      });
      //display the food
      foodElement = document.createElement('div');
      foodElement.style.gridRowStart = food.y;
      foodElement.style.gridColumnStart = food.x;
      foodElement.classList.add('food')
      board.appendChild(foodElement);

   } 

//main logic stars here 


window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
     inputdir = {x:0 ,y: 1} // start the game in y direction
        musicSound.play();
     switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputdir.x = 0;
            inputdir.y = -1;
            break;

         case "ArrowDown":
             console.log("ArrowDown")
            inputdir.x = 0;
            inputdir.y = 1;
              break;

        case "ArrowLeft":
             console.log("ArrowLeft")
            inputdir.x = -1;
            inputdir.y = 0;
            break;

         case "ArrowRight":
              console.log("ArrowRight")
            inputdir.x = 1;
            inputdir.y = 0;
              break;

        default:
            break;
     }

});