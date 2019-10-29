import React from 'react';
import Styled from 'styled-components';


//Элементы игры
import idle from '../Spites/PinkMonster/Pink_Monster_Idle_4.png';
import move from '../Spites/PinkMonster/PinkMonsterWalk.png'
import jump from '../Spites/PinkMonster/Pink_Monster_Jump_8.png'
import attack from '../Spites/PinkMonster/Pink_Monster_Attack1_4.png'

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
let InitialSpeed = 0;


const Scale = 2;
const BlockH = 16; // Левый верхний угол картинки
const BlockW = 18; // Правый верхний угол картинки

let ScaleW = Scale * BlockW; // Левый нижний угол картинки 
let ScaleH = Scale * BlockH; // Правый нижний угол картинки


let faceDirect = 0;

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
        // x: Math.floor(Math.random() * 500),
        x: 400,
        // y: Math.floor(Math.random() * 600),
        y: 750
    }
}

// Спрайты для персонажа
let img_move = new Image();
let img_jump = new Image();
let img_idle = new Image();
let img_attack = new Image();

// Спрайты и картинки для мира
let foreground = new Image();
let _Grass = new Image();
let _WallVert = new Image();
let _Sky = new Image();

img_move.src = move;
img_jump.src = jump;
img_idle.src = idle;
img_attack.src = attack;

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
            move: false,
            animate: null,
        }
    }

    Canvas = () => {
        const cnv = document.querySelector('canvas');
        cnv.width = window.innerWidth;
        cnv.height = window.innerHeight;
    }

    drawPlayer = (x,y, frames, whichState, faceDirection) => {
        const ctx = document.querySelector('canvas').getContext('2d');
        ctx.drawImage(whichState, frames, faceDirection, ScaleW, ScaleH, x, y, 50,50)
    }

    drawLand = () => {
        const cnv = document.querySelector('canvas');
        const ctx = document.querySelector('canvas').getContext('2d');
        ctx.drawImage(_Grass, 0,790, 70, 30)
        ctx.drawImage(_WallVert, 0, 810, _WallVert.width, 90)
        // ctx.drawImage(_WallVert, 0, 810, _WallVert.width + _WallVert.width, 90)

        // let iter = 70;
        // for (let index = 0; index < 1000; index++) {
        //     ctx.drawImage(_Grass, 0 + iter,790, 70, 30);
        //     ctx.drawImage(_WallVert, 0 + _WallVert.width, 810, _WallVert.width, 90)
        // }
        
    }

    PlayerInteract = () => {
        whichState = img_move;

        if(keysPressed.ArrowUp) {
            this.allowMove(0, -jumpVelocity);
            whichState = img_jump;
            this.setState({move: true})
            this.setState({animate: this.Animate()})
        } 
        /*else if(keysPressed.s) {
            this.allowMove(0, Speed);
        }*/
        if (keysPressed.z) {
            whichState = img_attack;
            this.setState({animate: this.Animate()})
        }
        if(keysPressed.ArrowLeft) {
            InitialSpeed = Speed;
            this.allowMove(-InitialSpeed, 0);
            faceDirect = 32;
            this.setState({move: true})
            this.setState({animate: this.Animate()})
            
        } else if(keysPressed.ArrowRight) {
            InitialSpeed = Speed;
            faceDirect = 0;
            this.allowMove(InitialSpeed, 0);
            this.setState({move: true})
            this.setState({animate: this.Animate()})
        }
        this.drawPlayer(posX,posY, Loop_Move[loopMoveIndex], whichState, faceDirect);
    }

    allowMove = (deltaX, deltaY) => {
        const cnv = document.querySelector('canvas');
        if(posX + deltaX > 0) {
            posX += deltaX;
        }
        if(posY + deltaY > 0 && posY + ScaleH + deltaY < cnv.height) {
            posY += deltaY;
        }
    }

    Animate = () => {
        // Движение по массиву спрайтов для анимации
        if(this.state.move) {
            FramesMoveCount++;
            if(FramesMoveCount >= Frames) {
                FramesMoveCount = 0;
                loopMoveIndex++;
                if(loopMoveIndex >= Loop_Move.length) {
                    loopMoveIndex = 0;
                }
            }
        }
    }

    ParralaxBg = () => {
        const cnv = document.querySelector('canvas');
        const ctx = document.querySelector('canvas').getContext('2d');
        
        ctx.drawImage(_Sky, 0, 0, cnv.width, cnv.height)
        ctx.drawImage(_Sky, 0, 0, cnv.width + _Sky.width, cnv.height)
        if (posX > cnv.width - 900) {
            if (InitialSpeed === 0) {
                return;
            }
            ctx.translate(-Speed, 0)
        }
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
    }

    Obstacles = () => {
        const ctx = document.querySelector('canvas').getContext('2d');

        let randX = Math.floor(Math.random() * 100); 
        let randY = Math.floor(Math.random() * 200);

        ctx.fillStyle = 'blue';
        ctx.fillRect(Obstacle.Small.x, Obstacle.Small.y, Obstacle.Small.width,Obstacle.Small.height)
        
    }

    gameLoop = () => {

        // this.redrawCnv();
        
        this.ParralaxBg();
        this.drawLand();
    
        this.Obstacles();

        this.BottomCollide();

        this.PlayerInteract();

        window.requestAnimationFrame(this.gameLoop)
    }

    componentDidMount() {
        //Инициализация
        this.Canvas();
        

        var rockBottom = document.querySelector('canvas').height - 150;
        this.setState({ canvasHeight: rockBottom })
        

        window.addEventListener('keydown', (e) => {
            keysPressed[e.key] = true;
            this.setState({move: true})
        });
        window.addEventListener('keyup', (e) => {
            keysPressed[e.key] = false;

            InitialSpeed = 0;
            this.setState({move: false})
            this.setState({animate: null})
            loopMoveIndex = 0;
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