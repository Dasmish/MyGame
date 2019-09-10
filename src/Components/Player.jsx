import React from 'react';

export default function drawPlayer(params) {
    


   /* componentDidMount() {
        this.props.onRef(this);
    }*/
    

    //Отрисовка Игрока
   
        console.log(this)
        const cont = this.canvas.getContext('2d');
        cont.strokeRect(180, window.innerHeight - 400, 101, 257);
    

    
}