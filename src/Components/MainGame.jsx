import React from 'react';
import Styled from 'styled-components';

//Элементы игры
import idle from '../Spites/PinkMonster/Pink_Monster_Idle_4.png';
import move from '../Spites/PinkMonster/PinkMonsterWalk.png';
import jump from '../Spites/PinkMonster/Pink_Monster_Jump_8.png';
import attack from '../Spites/PinkMonster/Pink_Monster_Attack1_4.png';

import ground from '../Spites/Foreground/Tileset.png';

import Sky from '../Spites/Background/CloudsBack.png';

import Grass from '../Spites/Foreground/Grass.png';
import Wall_Vertical from '../Spites/Foreground/Wall1.png';

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


const Frames = 12;
const AttackFrames = 9;
const IdleFrames = 100;

const Seconds = 3;

//Перемещение
let currentMoveFrame = 0;
var SrcX, SrcY;
const MovementSpritesheetWidth = 192, MovementSpritesheetHeight = 64;
const MoveCols = 6, Row = 2;
const FrameWidth = MovementSpritesheetWidth / MoveCols, FrameHeight = MovementSpritesheetHeight / Row;

//Айдл
let currentIdleFrame = 0
var SrcIdleX, SrcIdleY;
const IdleSpritesheetWidth = 164, IdleSpritesheetHeight = 64;
const IdleCols = 5;
const IdleFrameWidth = IdleSpritesheetWidth / IdleCols, IdleFrameHeight = IdleSpritesheetHeight / Row;

let FramesMoveCount = 0; //Движение
const Loop_Move = [0,30,60,90,125,160]; // Цикл картинок спрайта на движение
let loopMoveIndex = 0; // Индекс картинки движения

let AttackFramesCount = 0;
const Attack_Loop = [0,30,65,100];
let AttackLoopIndex = 0;

let IdleFramesCount = 0;
const Idle_Loop = [0,30,60,90];
let IdleLoopIndex = 0;

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

_WallVert.width = 30;

let whichState = null;

export default class GameField extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            canvasHeight: 500,
            move: false,
            attack: false,
            animate: null,
            idle: true,
            interact: null,
            facedir: 0,
            action: img_idle,
            frames: null,
        }
    }

    drawPlayer = (x,y, frames, whichState, faceDirection) => {
        const ctx = document.querySelector('canvas').getContext('2d');
        ctx.drawImage(whichState, frames, faceDirection, FrameWidth, FrameHeight, x, y, 50,50);
    }

    drawLand = () => {
        const cnv = document.querySelector('canvas');
        const ctx = document.querySelector('canvas').getContext('2d');

        let count = cnv.width / _WallVert.width;

        // ctx.drawImage(_Grass, 0,790, 70, 30)
        ctx.drawImage(_WallVert, 0, 810, _WallVert.width, 90)
        // ctx.drawImage(_WallVert, 0, 810, _WallVert.width + _WallVert.width, 90)

        // let iter = 70;
        // for (let index = 0; index < count; index++) {
        //     // ctx.drawImage(_Grass, 0 + iter,790, 70, 30);
        //     ctx.drawImage(_WallVert, iter + _WallVert.width, 810, _WallVert.width, 90);
        //     iter += 70;
        // }
        
    }

    PlayerInteract = () => {
        this.setState({animate: this.NewAnimate()})

        // if(keysPressed.ArrowUp) {
        //     this.allowMove(0, -jumpVelocity);
        //     this.setState({move: true, action: img_jump, interact: Loop_Move[loopMoveIndex]})
        // }
        // if (keysPressed.z) {
        //     this.setState({attack: true, action: img_attack, interact: Attack_Loop[AttackLoopIndex]})
        // }
        if(keysPressed.ArrowLeft) {
            InitialSpeed = Speed;
            this.allowMove(-InitialSpeed, 0);
            this.setState({move: true, action: img_move, frames: SrcX, facedir: FrameHeight})
            
        } else if(keysPressed.ArrowRight) {
            InitialSpeed = Speed;
            this.allowMove(InitialSpeed, 0);
            this.setState({move: true, action: img_move, frames: SrcX, facedir: 0})
        }
        
    }

    allowMove = (deltaX, deltaY) => {
        if(posX + deltaX > 0) {
            posX += deltaX;
        }
        if(posY + deltaY > 0) {
            posY += deltaY;
        }
    }

    Collision = () => {
        if (posX + ScaleW > Obstacle.Small.x &&
            posX < Obstacle.Small.x + Obstacle.Small.width &&
            posY + ScaleH > Obstacle.Small.y &&
            posY < Obstacle.Small.y + Obstacle.Small.height) 
        {
            console.log('object')
        }
    }

    NewAnimate = () => {
        if (this.state.move) {
            currentMoveFrame = ++currentMoveFrame % MoveCols;
            SrcX = currentMoveFrame * FrameWidth;
            SrcY = 0;
        }
        if (!this.state.move) {
            currentIdleFrame = ++currentIdleFrame & IdleCols;
            SrcIdleX = currentIdleFrame * IdleFrameWidth;
            SrcIdleY = 0;
        }
    }

    Animate = () => {
        // Движение по массиву спрайтов для анимации
        if (this.state.move) {
            FramesMoveCount++;
            if(FramesMoveCount >= Frames) {
                FramesMoveCount = 0;
                loopMoveIndex++;
                if(loopMoveIndex >= Loop_Move.length) {
                    loopMoveIndex = 0;
                }
            }
        } else {
            IdleFramesCount++;
            if(IdleFramesCount >= IdleFrames) {
                IdleFramesCount = 0;
                IdleLoopIndex++;
                if(IdleLoopIndex >= Idle_Loop.length) {
                    IdleLoopIndex = 0;
                }
            }
        }
        if (this.state.attack) {
            AttackFramesCount++;
            if (AttackFramesCount >= AttackFrames) {
                AttackFramesCount = 0;
                AttackLoopIndex++;
                if (AttackLoopIndex >= Attack_Loop.length) {
                    AttackLoopIndex = 0;
                }
            }
        }
    }

    ParralaxBg = () => {
        const cnv = document.querySelector('canvas');
        const ctx = document.querySelector('canvas').getContext('2d');
        
        ctx.drawImage(_Sky, 0, 0, cnv.width, cnv.height)
        ctx.drawImage(_Sky, 0, 0, cnv.width + _Sky.width, cnv.height);

        if (InitialSpeed === 0) {
            return;
        } 
        else if (InitialSpeed > 0) {
            if (this.state.facedir === 0) {
                ctx.translate(-Speed, 0)
            } else if (this.state.facedir === 32) {
                ctx.translate(Speed, 0)
            }
        }
    }

    CameraController = () => {
        const cnv = document.querySelector('canvas');
        const ctx = document.querySelector('canvas').getContext('2d');

        console.log(ctx)
        ctx.save();
        ctx.translate(1, 0);
        ctx.restore();
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
        ctx.fillStyle = 'blue';
        ctx.fillRect(Obstacle.Small.x, Obstacle.Small.y, Obstacle.Small.width,Obstacle.Small.height)
    }

    gameLoop = () => {
        window.requestAnimationFrame(this.gameLoop);

        this.ParralaxBg();
        this.CameraController();
        
        this.drawLand();
        this.Obstacles();

        this.Collision();
        this.BottomCollide();

        this.PlayerInteract();

        this.drawPlayer(posX,posY, this.state.frames, this.state.action, this.state.facedir);
    }

    componentDidMount() {

        var rockBottom = document.querySelector('canvas').height - 150;
        this.setState({ canvasHeight: rockBottom, action: img_move, frames: SrcX })

        window.addEventListener('keydown', (e) => {
            keysPressed[e.key] = true;

            this.setState({move: true})
        });
        window.addEventListener('keyup', (e) => {
            keysPressed[e.key] = false;

            InitialSpeed = 0;
            this.setState({move: false, animate: this.NewAnimate(), attack: false, action: img_move, frames: SrcX})
        });
        this.gameLoop();
    }    
    

    render() {
        return (
            <Main className="Menu">
                <canvas width={window.innerWidth} height={window.innerHeight} ref="canvas"></canvas>
            </Main>
        );
    }
}