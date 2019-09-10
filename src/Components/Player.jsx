import React from 'react';

export default class Player extends React.PureComponent {

    constructor(props) {
        super(props);
    }


    //Отрисовка Игрока
    drawPlayer = () => {
        const cont = this.refs.canvas.getContext('2d');
        cont.strokeRect(180, window.innerHeight - 400, 101, 257);
    }

    test_1 = function test(params) {
        return test;
    }
    
}