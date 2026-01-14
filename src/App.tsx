import './styles/theme.css';
import './styles/global.css';
import { Container } from './components/Container';
import { Logo } from './components/Logo';
import { Menu } from './components/Menu';
import { CountDown } from './components/CountDown';
import { DefaultInput } from './components/DefaultInput';
import { Cycles } from './components/Cycles';


export function App() {

    return (
        <>
            <Container>
                <Logo />
            </Container>

            <Container>
                <Menu />
            </Container>

            <Container>
                <CountDown />
            </Container> 

            <Container>
                <form>
                    <div className="formRow">
                        <DefaultInput id='input' type='text' labelText='task:' placeholder='Digite algo'/>
                    </div>
                    <div className="formRow">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, officiis!</p>
                    </div> 
                    <div className="formRow">
                        <Cycles />
                    </div> 
                    <div className="formRow">
                        <button>Enviar</button>
                    </div>                                                                                    
                </form>
            </Container>                            
        </>
    )
}