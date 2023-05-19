//Game constants
let inputDir= {x:0 , y:0};
//const foodSound= new Audio('music/yea.m4a');
const foodSound= new Audio('music/food.mp3');
//const gameoverSound= new Audio('music/maki.m4a');
const gameoverSound= new Audio('music/gameover.mp3');

const moveSound= new Audio('music/move.mp3');
const musicSound= new Audio('music/music.mp3');
let speed=8;
let score=0;
let lastpaint=0;
let snakearray= [
    {x:7 , y:5 } ];

food={ x:16 , y:5}; 


// Game functions
function main(ctime)
{
    window.requestAnimationFrame(main);
   // console.log(ctime);
    if((ctime-lastpaint)/1000 < (1/speed))
    {
        return;
    }
    lastpaint = ctime;
    gameEngine();
}
//alert('tesssssst')


function isCollide(snake)
{
    for(let i=1;i<snake.length;i++)
    {
        if(snake[0].x===snake[i].x && snake[0].y===snake[i].y)
        return true;
    }
    if (snake[0].x>=18 || snake[0].x<=0  || snake[0].y>=18 || snake[0].x<=0)
    return true;
}


function gameEngine()
{
    // Part 1:  Updating snake array and food
    if(isCollide(snakearray))
    {
        gameoverSound.play();
        musicSound.pause();
        inputDir={x:0 , y:0};
        alert("Game over bro");
        snakearray= [{ x:13 , y:15 }];
        musicSound.play();
        score=0;

    }

    if(snakearray[0].y===food.y && snakearray[0].x ===food.x)
    {
       foodSound.play();
        score+=1;
        scoreBox.innerHTML= " Score: " +score;
        snakearray.unshift({x: snakearray[0].x + inputDir.x  , y: snakearray[0].y + inputDir.y });
        let a=2;
        let b=16;
        food= {x: Math.round(a+(b-1)*Math.random()), y: Math.round(a+(b-a)*Math.random())};
    }

    for(let i=snakearray.length-2; i>=0;i--)
    {
      //  const element=array[i];
        snakearray[i+1]={...snakearray[i]};
    }

    snakearray[0].x +=inputDir.x;
    snakearray[0].y +=inputDir.y;


    board.innerHTML= ""; 
    snakearray.forEach((e, index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart= e.x;

        if(index===0)
        {
            snakeElement.classList.add('head'); 
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // Part 2: Display snake and food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart= food.y;
    foodElement.style.gridColumnStart =food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir = {x:0 , y:1}    //start the game
    moveSound.play();
    switch(e.key)
    {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x= 0;
            inputDir.y= -1;
            break;

         case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x= 0;
            inputDir.y= 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x= -1;
            inputDir.y= 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x= 1;
            inputDir.y= 0;
            break;
        default: break;

    }
});

