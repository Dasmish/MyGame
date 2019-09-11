import React from 'react';
import Styled from 'styled-components';
import ReactDOM from 'react-dom';

const Main = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
`
const MainTitle = Styled.h1`
    font-size: 64px;
    padding-bottom: 100px;
`

const StyledLi = Styled.li`
    font-size: 40px;
    cursor: pointer;

    :hover {
        color: red;
    }
`
var MenuItems = {
    start: 'Start',
    options: 'Options',
}


export default class MainMenu extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            menuOpened: 'Start',
        };
    }

    whichMenuBtn = (param) => {
        switch(param) {
            case 'Start':
                this.setState({ menuOpened: 'Start' })
                break;
            case 'Options':
                console.log('Options');
                break;
            default: 
                console.log('Default');
                break;
        }
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
                            this.setState({menuOpened: 'Start'})
                        }}>Back</div>
                        <div>Test</div>
                    </React.Fragment>
                    )
                }
                
            </Main>
        );
    }
}