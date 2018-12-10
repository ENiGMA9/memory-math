import React from 'react';
import "./View.css";
import {Button, Col, Grid, Panel, Row} from "react-bootstrap";
import Stats from "../Stats/Stats";
import FormulasContainer from "../FormulasContainer/FormulasContainer";

export default class View extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            question: 'Intrebare',
            step: 0,
            answer: null,
            evalState: true,
            notEvalState: false,
            collapse: false,
            displayEmpty: false,
            totalQuestions: '0',
            currentQuestions: '0',
            statusPercent: '0',
            statusText: ''
        };
        this.next();
    };

    next = ()=>{
        fetch('http://localhost:3001/qget', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((res)=>{
            return res.json();
        }).then((result)=>{

            let percentage = (result.totalqCount - result.questionsCount)/result.totalqCount * 100;

            if(result.empty===true)
            {
                this.setState({displayEmpty:true,totalQuestions: result.totalqCount,
                    currentQuestions: result.questionsCount,
                    statusText: result.totalqCount - result.questionsCount + '/' + result.totalqCount,
                    statusPercent: percentage});
            }else {

                this.setState({
                    totalQuestions: result.totalqCount,
                    currentQuestions: result.questionsCount,
                    statusText: result.totalqCount - result.questionsCount + '/' + result.totalqCount,
                    statusPercent: percentage,
                    qID: result._id,
                    question: result.question,
                    step: this.state.step + 1,
                    answer: result.answer,
                    evalState: true,
                    notEvalState: false,
                    collapse: false
                });

            }
            });
    };


    remove = ()=>{
        fetch('http://localhost:3001/qrem', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.qID
            })
        });
        this.next();
    };

    evaluate = ()=>{
        this.setState({evalState: false, notEvalState:true, collapse:true});
    };

    reinit = ()=>{
        this.setState({displayEmpty:false});
        fetch('http://localhost:3001/qinit', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((res)=>{
            this.next();
        });

    };

    render(){return(



        <Grid >
            <Row  >
                <Stats text={this.state.statusText} step={this.state.statusPercent} />
                <Col xs={12} md={8} className={this.state.displayEmpty ? 'hidden' : ''}>

                    <Panel>
                        <Panel.Heading>
                            <Panel.Title><div>{this.state.question}</div></Panel.Title>
                        </Panel.Heading>
                        <Panel.Body><div id="content" contentEditable='true'>Raspuns</div></Panel.Body>

                    </Panel>


                    <Panel expanded={this.state.collapse}>
                        <Panel.Collapse>
                        <Panel.Body><div id="raspuns" contentEditable='false'>{this.state.answer}</div></Panel.Body>
                        </Panel.Collapse>
                    </Panel>

                    <Button bsStyle="warning" onClick = {this.evaluate} disabled={!this.state.evalState} >Evalueaza</Button>
                    <Button bsStyle="danger"  onClick = {this.next} disabled={!this.state.notEvalState}>Pastreaza</Button>
                    <Button bsStyle="success" onClick = {this.remove} disabled={!this.state.notEvalState}>Scoate</Button>
                    <Button bsStyle="primary" onClick = {this.next} disabled={!this.state.evalState}>Urmatorul</Button>

                </Col>

                <Col xs={4} sm={4} className={this.state.displayEmpty ? 'hidden' : ''}>
                    <FormulasContainer/>
                </Col>
            </Row>
            <Button bsStyle="primary" className={!this.state.displayEmpty ? 'hidden' : ''}  onClick = {this.reinit} disabled={!this.state.displayEmpty}>Nu mai sunt intrebari, reinitializeaza</Button>
        </Grid>);
    }
}