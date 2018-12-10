import React from 'react';
import "./App.css";
import Navigation from "../Nav/Navigation";
import Routes from "../../routes/routes";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Navigation/>
                <Routes/>
            </div>
        );
    }s
}