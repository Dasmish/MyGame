import React from 'react';
import Player from './Player'

//Элементы игры

export default class GameField extends React.PureComponent {

    resizeCanvas = () => {
        var canId = document.querySelectorAll('#canvas')[0];
        canId.width = window.innerWidth;
        canId.height = window.innerHeight;
    }
    

    componentDidMount() {
        //Инициализация
        this.resizeCanvas();
        //Движения игрока
    }
    

    render() {
        return (
            <canvas ref="canvas" id="canvas"></canvas>
        );
    }
}