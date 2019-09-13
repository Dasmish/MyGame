import React from 'react';
import Styled from 'styled-components';
import { setInterval } from 'timers';

//Элементы игры
// import drawPlayer from './Player';
// import MainMenu from './MainMenu';

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
            menuOpened: 'Start',
            gameRendered: false,
        };
    }

    Canvas = () => {
        var canvas = document.querySelector('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    drawPlayer = (x, y) => {
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 0;
        var ctx = document.querySelector('canvas').getContext('2d');
        ctx.fillStyle = 'red';
        ctx.fillRect(x,y,50,50);
    }

    moving = () => {
    }

    redraw = ()  => {
        var nx = 50, ny = 50;
        setInterval( () => { 
            this.drawPlayer(nx += 1, ny += 1, 50, 50) 
        },20)
    }

    componentDidMount() {
        // this.canvas = React.createRef()
        // this.drawPlayer = drawPlayer.bind(this);

        //Инициализация
        this.Canvas();
        this.drawPlayer(10,10);
        this.redraw();
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