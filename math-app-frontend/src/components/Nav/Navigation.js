import React from 'react';
import {Link} from 'react-router-dom';
import "./Nav.css";
import {Nav,Navbar,NavItem} from 'react-bootstrap';

export default class Navigation extends React.Component{
    render(){
        return (
            <Navbar>
            <Navbar.Header>
            <Navbar.Brand>
                <Link to={`/`} activeclassname="active">Acasa</Link>
    </Navbar.Brand>
    </Navbar.Header>
        <Nav>
            <NavItem eventKey={1} href="#">
                <Link to={`/addq/`} activeclassname="active" >Adauga intrebare</Link>
            </NavItem>
            <NavItem eventKey={2} href="#">
                <Link to={`/addf/`} activeclassname="active" >Adauga formula</Link>
            </NavItem>
            <NavItem eventKey={3} href="#">
                <Link to={`/view/`} activeclassname="active">Invata</Link>
            </NavItem>

        </Nav>
        </Navbar>

        );
    }
}