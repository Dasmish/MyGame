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

var GameP;

export default class GameField extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.interval = null;
    }

    Canvas = () => {
        var canvas = document.querySelector('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    drawPlayer = (x,y) => {
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 0;
        var ctx = document.querySelector('canvas').getContext('2d');
        var player_img = new Image();
        player_img.onload = function () {
            ctx.drawImage(player_img,this.x,this.y,50,50)
        }
        player_img.src = a;
        console.log('width',player_img.width, 'height', player_img.height)
    }

    moving = (e) => {
        console.log(e)
        switch(e.key) {
            case 'ArrowLeft':
                this.drawPlayer(this.x -= 2, this.y);
                break;
            case 'ArrowUp':
                this.drawPlayer(this.x, this.y -= 1);
                break;
            case 'ArrowRight':
                this.drawPlayer(this.x += 2, this.y);
                break; 
            case 'ArrowDown':
                this.drawPlayer(this.x, this.y += 1);
                break;
            default:
                this.drawPlayer(this.x, this.y) 
        }
    }

    redraw = (e) => {
        console.log("!")
        var cnv = document.querySelector('canvas');
        var ctx = document.querySelector('canvas').getContext('2d');
        console.log(cnv,ctx);
        ctx.clearRect(100,100,cnv.width,cnv.height);
        this.moving(e);
    }

    componentDidMount() {
        // this.canvas = React.createRef()
        // this.drawPlayer = drawPlayer.bind(this);

        //Инициализация
        this.Canvas();
        this.drawPlayer(0,0);
        // setInterval(() => {
        //     this.redraw();
        // }, 20)
        window.addEventListener('keydown', (e) => {
            this.redraw(e)           
        })
          
        window.addEventListener('keyup', (e) => {
        //     console.log('clear', this.interval)
        //     clearInterval(this.interval)
        //    // this.redraw(false)
        })
        
        
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