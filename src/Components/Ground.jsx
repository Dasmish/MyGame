import React from 'react';

export default class Ground extends React.PureComponent {
    //Отрисовка Земли
    drawGround = () => {
        const cont = this.refs.canvas.getContext('2d');
        cont.strokeRect(0, window.innerHeight - 100, window.innerWidth, 257);
    }
}