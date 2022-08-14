let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
const HEIGHT = document.documentElement.clientHeight;
const WIDTH = document.documentElement.clientWidth;
canvas.height = HEIGHT;
canvas.width = WIDTH;

const JOYSTIC_INNER_BASE = {
    x: WIDTH*.1,
    y: HEIGHT * .8
}
const joystick = {

    outer: {
        color: "#22222250",
        x: JOYSTIC_INNER_BASE.x,
        y: JOYSTIC_INNER_BASE.y,
        size: Math.min(JOYSTIC_INNER_BASE.x, JOYSTIC_INNER_BASE.y)*.8
    },
    inner: {
        color: "#222222A0",
        x: JOYSTIC_INNER_BASE.x,
        y: JOYSTIC_INNER_BASE.y,
        size: Math.min(JOYSTIC_INNER_BASE.x, JOYSTIC_INNER_BASE.y)*.3
    },
    moving: false,

}

let drawCircle = (c) => {
    ctx.fillStyle = c.color;
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.size, 0, 2 * Math.PI);
    ctx.fill();
}

function drawBackground() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function drawJoystick() {

    drawBackground();
    drawCircle(joystick.outer);
    drawCircle(joystick.inner);

}

drawJoystick();

function insideCircle(circle, x, y) {
    let pad = circle;
    return (pad.x - x) * (pad.x - x) + (pad.y - y) * (pad.y - y) <= pad.size * pad.size;
}


function extractTouch(event){

    let e = event;
    if (event.touches){

        for (i =0; i < event.touches.length; i++){
            if ( insideCircle(joystick.inner, event.touches[i].clientX, event.touches[i].clientY)){
                e = event.touches[i];
                break;
            }
        }
    }
    return e;
}

function startMove(e){

    let x = e.clientX ;
    let y = e.clientY ;

    if (insideCircle(joystick.inner, x, y)) {
        joystick.moving = true;
    }
}

function stopMove(e){

    if (!e){
        return;
    }
    joystick.moving = false;
    joystick.inner.x = JOYSTIC_INNER_BASE.x;
    joystick.inner.y = JOYSTIC_INNER_BASE.y;
    drawJoystick();
}

function move(e){

    let x = e.clientX ;
    let y = e.clientY ;

    if (!insideCircle(joystick.outer,x, y)) {
        joystick.moving = false;
        return;
    }

    if (joystick.moving) {
        
        joystick.inner.x = x;
        joystick.inner.y = y;
        drawJoystick();
    }
}

canvas.addEventListener("touchstart", (e)=> startMove(extractTouch(e)),false);
canvas.addEventListener("mousedown", startMove);

canvas.addEventListener("touchend", (e)=>stopMove(extractTouch(e)), false);
canvas.addEventListener("mouseup", stopMove);

canvas.addEventListener("touchmove", (e)=>move(extractTouch(e)),false);
canvas.addEventListener("mousemove", move);
