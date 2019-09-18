import React from 'react';
import Styled from 'styled-components';
import { setInterval } from 'timers';

//Элементы игры
// import drawPlayer from './Player';
// import MainMenu from './MainMenu';
import a from '../Spites/PinkMonster/PinkMonster.png'

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
let posY = 800;

let BlockH = 50;
let BlockW = 50;

let Gravity = 0.6;
let GravitySpeed = 0;

let FaceRight = false;
let FaleLeft = false;

export default class GameField extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {

        };
        this.interval = null;
        
    }

    Canvas = () => {
        var cnv = document.querySelector('canvas');
        cnv.width = window.innerWidth;
        cnv.height = window.innerHeight;
    }

    drawPlayer = (x,y) => {
        this.x = x;
        this.y = y;
        var ctx = document.querySelector('canvas').getContext('2d');
        /*var player_img = new Image();
        player_img.onload = function () {
            ctx.drawImage(player_img,this.x,this.y,50,50)
        }
        player_img.src = a;*/
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, BlockH,BlockW)
    }

    moving = (e) => {
        switch(e.key) {
            case 'ArrowLeft':
                this.drawPlayer(this.x -= 2.5, this.y);
                break;
            case 'ArrowUp':
                this.drawPlayer(this.x, this.y -= 1);
                break;
            case 'ArrowRight':
                this.drawPlayer(this.x += 2.5, this.y);
                break; 
            case 'ArrowDown':
                this.drawPlayer(this.x, this.y += 1);
                break;
            default:
                this.drawPlayer(this.x, this.y) 
        }
    }

    bottomCollideAndGravity = () => {
        var cnv = document.querySelector('canvas').height - BlockH;
        if(posY > cnv) {
            this.drawPlayer(this.x, cnv)
        }
    }

    redraw = (e) => {
        var cnv = document.querySelector('canvas');
        var ctx = document.querySelector('canvas').getContext('2d');
        ctx.clearRect(0,0,cnv.width,cnv.height);
        this.moving(e);
        var player_img = new Image();
        player_img.src = a;
        ctx.drawImage(player_img,this.x,this.y,50,50)
    }

    redrawCnv = () => {
        var cnv = document.querySelector('canvas');
        var ctx = document.querySelector('canvas').getContext('2d');
        ctx.clearRect(0,0,cnv.width,cnv.height);
    }

    gameLoop = () => {
        this.redrawCnv();
        
        if(keysPressed.w) {
            this.drawPlayer(posX, posY -= 2);
        } else if(keysPressed.s) {
            this.drawPlayer(posX, posY += 2);
        }
        if(keysPressed.a) {
            this.drawPlayer(posX -= 2, posY);
        } else if(keysPressed.d) {
            this.drawPlayer(posX +=2, posY);
        }
        
        this.drawPlayer(posX,posY);
        

        requestAnimationFrame(this.gameLoop)
    }


    componentDidMount() {
        
        //Инициализация
        this.Canvas();
        // this.drawPlayer(0,0);
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