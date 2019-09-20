import React from 'react';
import Styled from 'styled-components';
import { setInterval } from 'timers';

//Элементы игры
// import drawPlayer from './Player';
// import MainMenu from './MainMenu';
import a from '../Spites/PinkMonster/Pink_Monster_Walk_6.png'

const Main = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
`
const MainTitle = Styled.h1`
    font-size: 72px;
    padding-bottom: 100px;
`

const StyledLi = Styled.li`
    font-size: 40px;
    cursor: pointer;

    :hover {
        color: red;
    }
`
const BackBtn = {
    position: 'absolute',
    top: '5%',
    left: '5%',
}


const Player = {
    position: 'absolute',
    left: '20%',
    bottom: '20%',
    border: '2px solid red',
    width: '20px',
    height: '20px',
}

const MenuItems = {
    start: 'Start',
    options: 'Options',
}
const  MoveBtns = {
    ArrowLeft: 37,
    ArrowRight: 39,
}

let keysPressed = {}

let posX = 200;
let posY = 500;
let Speed = 2;

const Scale = 2;
const BlockH = 16;
const BlockW = 18;

let ScaleW = Scale * BlockW;
let ScaleH = Scale * BlockH;

const Frames = 6;
let FramesCount = 0;
const Loop_Cycle = [0,50, 150];
let loopIndex = 0;

const Gravity = 0.6;
const GravitySpeed = 0;

let FaceRight = false;
let FaleLeft = false;

let img = new Image();
img.src = a;

export default class GameField extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isCollide: false,
        };
        this.interval = null;
        
    }

    Canvas = () => {
        var cnv = document.querySelector('canvas');
        cnv.width = window.innerWidth;
        cnv.height = window.innerHeight;
    }

    drawPlayer = (x,y, frames) => {
        this.x = x;
        this.y = y;
        var ctx = document.querySelector('canvas').getContext('2d');
        ctx.drawImage(img, frames, 0, ScaleW, ScaleH, this.x, this.y, 50,50)
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

    redrawCnv = () => {
        var cnv = document.querySelector('canvas');
        var ctx = document.querySelector('canvas').getContext('2d');
        ctx.clearRect(0,0,cnv.width,cnv.height);
    }

    gameLoop = () => {
        let hasMoved = false;

        this.redrawCnv();
        this.drawLand();

        if(keysPressed.w) {
            this.allowMove(0, -Speed);
            hasMoved = true;
        } else if(keysPressed.s) {
            this.allowMove(0, Speed);
            hasMoved = true;
        }
        if(keysPressed.a) {
            this.allowMove(-Speed, 0);
            hasMoved = true;
        } else if(keysPressed.d) {
            this.allowMove(Speed, 0);
            hasMoved = true;
        }

        if(hasMoved) {
            FramesCount++;
            if(FramesCount >= Frames) {
                loopIndex++;
                if(loopIndex >= Loop_Cycle.length) {
                    loopIndex = 0;
                }
            }
        }
        if (!hasMoved) {
            loopIndex = 0;
        }
        
        this.drawPlayer(posX,posY, Loop_Cycle[loopIndex]);

        window.requestAnimationFrame(this.gameLoop)
    }


    componentDidMount() {

        let img = new Image();
            img.src = 'https://opengameart.org/sites/default/files/Green-Cap-Character-16x18.png';
        img.onload = function() {
            // window.requestAnimationFrame(this.gameLoop());
        };
        
        //Инициализация
        this.Canvas();
        this.drawLand();
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
        var Menu_Page = this.state.menuOpened;
        return (
            <Main className="Menu">
                <canvas ref="canvas"></canvas>
            </Main>
        );
    }
}