import React from 'react';
import Styled from 'styled-components';

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

export default class GameField extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            menuOpened: 'Start',
            gameRendered: false,
        };
    }

    playerMovement = event => {
        var playerBody = document.querySelectorAll('.Player')[0];
        var left = parseInt(playerBody.style.left);
        var bottom = parseInt(playerBody.style.bottom);
        if(event.key === 'ArrowRight') {
            playerBody.style.left = (left += 1) + '%';
        }
        else if(event.key === 'ArrowLeft') {
            playerBody.style.left = (left -= 1) + '%';
        }
        else if(event.key === 'ArrowUp') {
            playerBody.style.bottom = (bottom += 1) + '%';
        }
    }

    whichMenuBtn = (param) => {
        switch(param) {
            case 'Start':
                this.setState({ menuOpened: 'Game', gameRendered: true });
                break;
            case 'Options':
                console.log('Options');
                break;
            default: 
                console.log('Default');
                break;
        }
    }
    

    componentDidMount() {

        // this.a = '1';

        // this.canvas = React.createRef()
        // this.drawPlayer = drawPlayer.bind(this);

        //Инициализация

        //Движения игрока
        console.log(this.state.gameRendered)
        window.addEventListener('keydown', this.playerMovement)
        
    }    
    

    render() {
        var Menu_Page = this.state.menuOpened;
        // event.target.textContent
        return (
            <Main className="Menu">
                {Menu_Page === 'Start' && (
                    <React.Fragment>
                        <MainTitle>Main Menu</MainTitle>
                        <ul className="menu-items">
                            {
                                Object.keys(MenuItems).map((item, i) => {
                                    return (
                                        <StyledLi key={i} onClick={ (event) => {
                                            this.whichMenuBtn(event.target.textContent)
                                        }}>{MenuItems[item]}</StyledLi>
                                    )
                                })
                            }
                        </ul>
                    </React.Fragment>
                )}
                {Menu_Page === 'Options' && (
                    <React.Fragment>
                        <div onClick={ () => {
                            this.setState({menuOpened: 'Start', gameRendered: false})
                        }} className='back'>Back</div>
                        <div>Test</div>
                    </React.Fragment>
                    )
                }
                {Menu_Page === 'Game' && this.state.gameRendered && (
                    <React.Fragment>
                        <div style={BackBtn} className='back' onClick={() => {this.setState({ menuOpened: 'Start', gameRendered: false })}}>Back</div>
                        <div className='Player' style={Player} onKeyPress={ () => {this.playerMovement()}}></div>
                    </React.Fragment>
                )}
                
            </Main>
        );
    }
}