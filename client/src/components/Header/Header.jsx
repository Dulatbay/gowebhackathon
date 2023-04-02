import {Container, Nav, Navbar, NavDropdown, NavLink} from "react-bootstrap";
import {SiOverleaf} from 'react-icons/si'
import {RiAccountCircleLine} from 'react-icons/ri'
import {Link} from "react-router-dom";
import {memo} from "react";

export const Header = memo(() => {
    return (
        <Navbar bg="light" variant="light" expand="lg" fixed="top">
            <Container>
                <Navbar.Brand as={NavLink} to={'/'}>
                    <SiOverleaf/>
                    EcoLifeStyle
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav"/>
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="mx-auto header-tools">
                        <Nav.Link><Link to={'/'}>Главная</Link></Nav.Link>
                        <Nav.Link><Link to={'/events'}>События</Link></Nav.Link>
                        <Nav.Link><Link to={'/histories'}>Истории</Link></Nav.Link>
                        <Nav.Link><Link to={'/blogs'}>Посты</Link></Nav.Link>
                        <Nav.Link><Link to={'/store'}>Магазин</Link></Nav.Link>
                        <Nav.Link><Link to={'/recipes'}>Рецепты</Link></Nav.Link>
                        <Nav.Link><Link to={'/about'}>О нас</Link></Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title={<RiAccountCircleLine size={25}/>} id="account-dropdown">
                            <NavDropdown.Item>Профиль</NavDropdown.Item>
                            <NavDropdown.Item>Настройки</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item>Уведомления: 0</NavDropdown.Item>
                            <NavDropdown.Item>Календарь</NavDropdown.Item>
                            <NavDropdown.Item>Калькулятор</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item>Выйти</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
})