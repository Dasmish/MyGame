import React from 'react';
import Styled from 'styled-components';

//Элементы игры
// import drawPlayer from './Player';
// import MainMenu from './MainMenu';
import move from '../Spites/PinkMonster/Pink_Monster_Walk_6.png'
import jump from '../Spites/PinkMonster/Pink_Monster_Jump_8.png'

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
let FramesJumpCount = 0;

const Loop_Move = [0,30,60,90,125,160]; // Цикл картинок спрайта на движение
let loopMoveIndex = 0; // Индекс картинки движения

const Loop_Jump = [0, 25, 60, 125, 185]; // Цикл картинок спрайта для прыжка
let loopJumpIndex = 0; // Индекс картинки прыжка

const GravitySpeed = 0.06;
let Gravity = 0;

let jumpVelocity = 0.6;

const FaceLeft = -1; // Поворот влево
const FaceRight = 0; // Поворот вправо
let currentFacing = FaceRight; // По умолчанию картинка смотрит вправо

let img_move = new Image();
let img_jump = new Image();

img_move.src = move;
img_jump.src = jump;

console.log('omve',img_move)
console.log('jump',img_jump)

export default class GameField extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            canvasHeight: 0,
            whichState: img_move,
        }
    }

    Canvas = () => {
        var cnv = document.querySelector('canvas');
        cnv.width = window.innerWidth;
        cnv.height = window.innerHeight;
    }

    drawPlayer = (x,y, framesRight, whichState) => {
        this.x = x;
        this.y = y;
        var ctx = document.querySelector('canvas').getContext('2d');
        ctx.drawImage(whichState, framesRight, 0, ScaleW, ScaleH, this.x, this.y, 50,50)
    }

    drawLand = () => {
        var cnv = document.querySelector('canvas');
        var ctx = document.querySelector('canvas').getContext('2d');
        ctx.fillStyle = 'grey';
        ctx.fillRect(0,800, cnv.width, cnv.height)
    }

    allowMove = (deltaX, deltaY) => {
        var cnv = document.querySelector('canvas');
        if(posX + deltaX > 0 && posX + ScaleW + deltaX < cnv.width) {
            posX += deltaX;
        }
        if(posY + deltaY > 0 && posY + ScaleH + deltaY < cnv.height) {
            posY += deltaY;
        }
    }
    hitBottom = () => {
        
        Gravity += GravitySpeed;
        posY = posY += Gravity;
        
        if(posY > this.state.canvasHeight) {
            posY = this.state.canvasHeight;
            Gravity = 0;
        }
    }

    redrawCnv = () => {
        var cnv = document.querySelector('canvas');
        var ctx = document.querySelector('canvas').getContext('2d');
        ctx.clearRect(0,0,cnv.width,cnv.height);
    }

    gameLoop = () => {
        let hasMoved = false;
        let hasJumped = false;

        this.redrawCnv();
        this.drawLand();
        this.hitBottom();

        if(keysPressed.w) {
            this.setState({ whichState: img_jump })
            this.allowMove(0, -2);
        } 
        /*else if(keysPressed.s) {
            this.allowMove(0, Speed);
        }*/
        if(keysPressed.a) {
            this.setState({ whichState: img_move })
            this.allowMove(-Speed, 0);
            hasMoved = true;
        } else if(keysPressed.d) {
            this.setState({ whichState: img_move })
            this.allowMove(Speed, 0);
            hasMoved = true;
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

        this.drawPlayer(posX,posY, Loop_Move[loopMoveIndex], this.state.whichState);

        window.requestAnimationFrame(this.gameLoop)
    }


    componentDidMount() {

        

        //Инициализация
        this.Canvas();
        this.drawLand();

        var rockBottom = document.querySelector('canvas').height - 150;
        this.setState({ canvasHeight: rockBottom })

        window.addEventListener('keydown', (e) => {
            keysPressed[e.key] = true;
        });
        window.addEventListener('keyup', (e) => {
            keysPressed[e.key] = false;
        });
        this.gameLoop();

        /*window.addEventListener('keydown', (e) => {
            this.redraw(e)           
        })*/
        //Движения игрока
        // window.addEventListener('keydown', this.playerMovement)
    }    
    

    render() {
        return (
            <Main className="Menu">
                <canvas ref="canvas"></canvas>
            </Main>
        );
    }
}