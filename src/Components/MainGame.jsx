import React from 'react';

//Элементы игры
import Player from './Player'

export default class GameField extends React.PureComponent {

    constructor(props) {
        super(props);

    }

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