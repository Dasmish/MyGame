import React from 'react';

//Элементы игры
import drawPlayer from './Player'

export default class GameField extends React.PureComponent {

    componentWillMount() {
        this.a = '1';

        // this.canvas = React.createRef()
        this.drawPlayer = drawPlayer.bind(this);

    }
    resizeCanvas = () => {
        var canId = document.querySelectorAll('#canvas')[0];
        canId.width = window.innerWidth;
        canId.height = window.innerHeight;
    }
    

    componentDidMount() {
        //Инициализация
        this.resizeCanvas();
        this.drawPlayer();
        //Движения игрока
    }
    

    render() {
        return (
            // <canvas ref={this.canvas} id="canvas"></canvas>
            <canvas ref={(node) => node ? this.canvas = node : '' } id="canvas"></canvas>
        );
    }
}