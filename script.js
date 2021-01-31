const dino = document.querySelector('.dino'); 
const background = document.querySelector('.background');

let isJumping = false;
let position = 0;
let isGameOver = false;

function Keyup(event)
{
    if (event.keyCode === 32)
    {
        if(!isJumping) {
            pulo();
        }
    }
}

function pulo ()
{
    isJumping = true;

    let upinterval = setInterval(() => 
    {
        if (position >=150)
        {
            clearInterval(upinterval);

            let downinterval = setInterval(() =>
            {
                if (position <= 0)
                {
                    clearInterval(downinterval);
                    isJumping = false;
                } else
                    {
                       position -= 20;
                       dino.style.bottom = position + 'px';
                    }
            }, 20);
        } else 
            {
                position += 20;
                dino.style.bottom = position + 'px';
            }       
    }, 25);
}

function Createcactus ()
{
    const cactus = document.createElement('div');
    let positioncactus = 1000;
    let randomTime = Math.random() * 6000;

    if (isGameOver) return;

    cactus.classList.add('cactus');
    background.appendChild(cactus);
    cactus.style.left = positioncactus + 'px';

    let leftinterval = setInterval(() =>
    {
        if (positioncactus < -60)
        {
            clearInterval(leftinterval);
            background.removeChild(cactus);
        } else if (positioncactus > 0 && positioncactus <60 && position <60) 
            {
                clearInterval(leftinterval);
                isGameOver = true;
                document.body.innerHTML = '<h1 class = "game-over">Game over</h1>';
            }
        else
            {
                positioncactus -= 10;
                cactus.style.left = positioncactus + 'px'; 
            }
        }, 20);
    setTimeout(Createcactus, randomTime);
}

Createcactus();
document.addEventListener('keyup', Keyup);