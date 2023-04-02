import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {SiOverleaf} from 'react-icons/si'
import {RiAccountCircleLine} from 'react-icons/ri'
import {Link, NavLink} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../index";

export const Header = () => {
    const {store} = useContext(Context)
    const [isAuth, setIsAuth] = useState(false);
    const logoutClick = async () => {
        await store.logout();
    }
    useEffect(()=>{
        store.check().then(()=> setIsAuth(store.isAuth))
    },[])
    return (
        <Navbar bg="light" variant="light" expand="lg" sticky="top" className={"header"}>
            <Container>
                <Navbar.Brand><Link to={'/'}><SiOverleaf/>EcoLifeStyle</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav"/>
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="mx-auto header-tools">
                        <Nav.Link><NavLink to={'/'}>Главная</NavLink></Nav.Link>
                        <Nav.Link><NavLink to={'/events/calendar'}>События</NavLink></Nav.Link>
                        <Nav.Link><NavLink to={'/histories'}>Истории</NavLink></Nav.Link>
                        <Nav.Link><NavLink to={'/blogs'}>Посты</NavLink></Nav.Link>
                        <Nav.Link><NavLink to={'/store'}>Магазин</NavLink></Nav.Link>
                        <Nav.Link><NavLink to={'/recipes'}>Рецепты</NavLink></Nav.Link>
                        <Nav.Link><NavLink to={'/about'}>О нас</NavLink></Nav.Link>
                    </Nav>
                    {
                        isAuth ? <NavDropdown title={<RiAccountCircleLine size={25}/>} id="account-dropdown">
                            <NavDropdown.Item>Профиль</NavDropdown.Item>
                            <NavDropdown.Item>Настройки</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item>Уведомления: 0</NavDropdown.Item>
                            <NavDropdown.Item>Календарь</NavDropdown.Item>
                            <NavDropdown.Item>Калькулятор</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item onClick={logoutClick}>Выйти</NavDropdown.Item>
                        </NavDropdown> : <Nav.Link><NavLink to={'/auth'}>Войти</NavLink></Nav.Link>
                    }
                    <Nav>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}