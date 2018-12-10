import React from 'react';
import "./Stats.css";
import {ProgressBar} from "react-bootstrap";
import {InlineMath} from "react-katex";

export default class Stats extends React.Component{

    constructor(props){
        super(props);
       // console.log(props.step);
        //console.log(props.text);
        this.state={progress:props.step,text:props.text};
    }


    componentDidUpdate(prevProps,prevState) {
        if(this.props.text != prevProps.text) {
            this.setState({progress:this.props.step,text:this.props.text});
        }

    }

    render(){return(


        [<span id ="pb-label"> {`${this.state.text}`}</span>,
        <ProgressBar bsStyle="info" now={this.state.progress}/>]


    );}
}