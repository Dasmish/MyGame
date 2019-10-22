import React from 'react';
import Styled from 'styled-components';


//Элементы игры
import move from '../Spites/PinkMonster/PinkMonsterWalk.png'
import jump from '../Spites/PinkMonster/Pink_Monster_Jump_8.png'

import ground from '../Spites/Foreground/Tileset.png'

import Sky from '../Spites/Background/CloudsBack.png'

import Grass from '../Spites/Foreground/Grass.png'
import Wall_Vertical from '../Spites/Foreground/Wall1.png'

const Main = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
`

let keysPressed = {} // Объект для клавиш движения


let posX = 200; // Стартовая позиция
let posY = 700;
let Speed = 2;

const Scale = 2;
const BlockH = 16; // Левый верхний угол картинки
const BlockW = 18; // Правый верхний угол картинки

let ScaleW = Scale * BlockW; // Левый нижний угол картинки 
let ScaleH = Scale * BlockH; // Правый нижний угол картинки

const Frames = 12;
let FramesMoveCount = 0; //Движение

const Loop_Move = [0,30,60,90,125,160]; // Цикл картинок спрайта на движение

let loopMoveIndex = 0; // Индекс картинки движения

const GravitySpeed = 0.06;
let Gravity = 0;

let jumpVelocity = 3;

const Obstacle = {
    Large: {
        width: 150,
        height: 150,
    },
    Medium: {
        width: 100,
        height: 100,
    },
    Small: {
        width: 50,
        height: 50,
        x: Math.floor(Math.random() * 500),
        // x: 500,
        // y: Math.floor(Math.random() * 600),
        y: 750
    }
}


let img_move = new Image();
let img_jump = new Image();

let foreground = new Image();
let _Grass = new Image();
let _WallVert = new Image();
let _Sky = new Image();

img_move.src = move;
img_jump.src = jump;

foreground.src = ground;
_Grass.src = Grass;
_WallVert.src = Wall_Vertical;
_Sky.src = Sky;

let whichState = null;

export default class GameField extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            canvasHeight: 500,
        }
    }

    Canvas = () => {
        const cnv = document.querySelector('canvas');
        cnv.width = window.innerWidth;
        cnv.height = window.innerHeight;
    }

    drawPlayer = (x,y, frames, whichState, faceDirection) => {
        this.x = x;
        this.y = y;
        const ctx = document.querySelector('canvas').getContext('2d');
        ctx.drawImage(whichState, frames, faceDirection, ScaleW, ScaleH, this.x, this.y, 50,50)
    }

    drawLand = () => {
        const cnv = document.querySelector('canvas');
        const ctx = document.querySelector('canvas').getContext('2d');
        ctx.drawImage(_Grass, 0,790, 70, 30)
        ctx.drawImage(_WallVert, 0, 810, 70, 90)
        let iter = 65;
        for (let index = 0; index < 25; index++) {
            ctx.drawImage(_Grass, 0 + iter,790, 70, 30);
            ctx.drawImage(_WallVert, 0 + iter, 810, 70, 90)
            iter += 65;
        }
        
    }

    allowMove = (deltaX, deltaY) => {
        const cnv = document.querySelector('canvas');
        if(posX + deltaX > 0 && posX + ScaleW + deltaX < cnv.width) {
            // if(posX > Obstacle.Small.x - ScaleW) {
            //     posX = Obstacle.Small.x - ScaleW;
            // }
            if (posX + ScaleW > Obstacle.Small.x) {
                this.Collide()
            }
            posX += deltaX;
        }
        if(posY + deltaY > 0 && posY + ScaleH + deltaY < cnv.height) {
            if (posY + ScaleH  > Obstacle.Small.y ) {
                console.log('2222')
            }
            posY += deltaY;
        }
    }
    Collide = () => {
        console.log('object');
    }
    BottomCollide = () => {
        
        Gravity += GravitySpeed;
        posY = posY += Gravity;
        
        if(posY > this.state.canvasHeight) {
            posY = this.state.canvasHeight;
            Gravity = 0;
        }
    }

    redrawCnv = () => {
        const cnv = document.querySelector('canvas');
        const ctx = document.querySelector('canvas').getContext('2d');
        ctx.clearRect(0,0,cnv.width,cnv.height);
        ctx.drawImage(_Sky, 0, 0, cnv.width, cnv.height)
    }

    Obstacles = () => {
        const ctx = document.querySelector('canvas').getContext('2d');

        let randX = Math.floor(Math.random() * 100); 
        let randY = Math.floor(Math.random() * 200);

        ctx.fillStyle = 'blue';
        ctx.fillRect(Obstacle.Small.x, Obstacle.Small.y, Obstacle.Small.width,Obstacle.Small.height)
        
    }

    gameLoop = () => {
        let hasMoved = false;
        let faceDirect = 0;

        whichState = img_move;

        this.redrawCnv();
        this.drawLand();
        this.BottomCollide();
        this.Obstacles();


        if(keysPressed.w) {
            this.allowMove(0, -jumpVelocity);
            whichState = img_jump;
            hasMoved = true;
        } 
        /*else if(keysPressed.s) {
            this.allowMove(0, Speed);
        }*/
        if(keysPressed.a) {
            this.allowMove(-Speed, 0);
            hasMoved = true;
            faceDirect = 32;
        } else if(keysPressed.d) {
            this.allowMove(Speed, 0);
            hasMoved = true;
            faceDirect = 0;
        }

        
        // Move Sprite
        if(hasMoved) {
            FramesMoveCount++;
            if(FramesMoveCount >= Frames) {
                FramesMoveCount = 0;
                loopMoveIndex++;
                if(loopMoveIndex >= Loop_Move.length) {
                    loopMoveIndex = 0;
                }
            }
        }
        // Cancel Sprite animation
        if (!hasMoved) {
            loopMoveIndex = 0;
        }

        this.drawPlayer(posX,posY, Loop_Move[loopMoveIndex], whichState, faceDirect);

        window.requestAnimationFrame(this.gameLoop)
    }

    componentDidMount() {
        //Инициализация
        this.Canvas();
        
        

        var rockBottom = document.querySelector('canvas').height - 150;
        console.log(document.querySelector('canvas').height)
        this.setState({ canvasHeight: rockBottom })
        

        window.addEventListener('keydown', (e) => {
            keysPressed[e.key] = true;
        });
        window.addEventListener('keyup', (e) => {
            keysPressed[e.key] = false;
        });
        this.gameLoop();
    }    
    

    render() {
        return (
            <Main className="Menu">
                <canvas ref="canvas"></canvas>
            </Main>
        );
    }
}