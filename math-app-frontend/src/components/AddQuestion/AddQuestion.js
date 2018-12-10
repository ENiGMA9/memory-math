import React from 'react';
import "./AddQuestion.css";
import {Panel, Grid,Row,Col, Button} from 'react-bootstrap'
import FormulasContainer from "../FormulasContainer/FormulasContainer";
import ClickableFormula from "../ClickableFormula/ClickableFormula";

export default class AddQuestion extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            localAnswer: "text{DEFAULT}",
            receivedFormulas: null,
            answer: "Raspuns",
            question: "Intrebare"};
        this.editableAnswer = React.createRef();
    }


    sendQuestion = ()=>{
        return fetch('http://localhost:3001/qadd', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                question: this.state.question.trim(),
                answer: this.state.answer.trim()
            })
        }).then((res)=>{
            console.log(res);
        });
    };

    changeQuestion = (e)=>{
        this.setState({question:e.target.textContent});
    };

    changeAnswer = (e)=>{
        this.setState({answer:e.target.innerHTML});
        this.forceUpdate();

    };

    addFormulaTag = (e)=>{
      //  this.editableAnswer.current.innerHTML = this.editableAnswer.current.innerHTML + <ClickableFormula id={} formula={e.target.textContent}/>;
      this.editableAnswer.current.innerHTML = this.editableAnswer.current.innerHTML + <ClickableFormula formula={e.target.textContent}/>;
    };


    render(){
        return(
            <Grid>
                <Row>
                    <Col xs={12} md={8}>
            <Panel>
                <Panel.Heading>
                <Panel.Title><div contentEditable='true' onInput={this.changeQuestion}>Intrebare</div></Panel.Title>
                </Panel.Heading>
                <Panel.Body><div onInput={this.changeAnswer} id="content" contentEditable='true' ref={this.editableAnswer}>Raspuns</div></Panel.Body>
            </Panel>
                        <Button bsStyle="primary" onClick ={this.sendQuestion}>Adauga</Button>

                    </Col>

                    <Col xs={4} sm={4}>
                        <FormulasContainer addMethod={this.addFormulaTag}/>
                    </Col>
                </Row>
            </Grid>
        );
    }
}