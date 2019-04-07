import React from "react";
import "./FormulasContrainer.css";
import "katex/dist/katex.min.css";
import {InlineMath} from "react-katex";
import {Panel} from "react-bootstrap";

export default class FormulasContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {formulas:null,receivedFormulas:null};
        this.listItems=null;
        this.formulaPanelQuery = React.createRef();
    }


    formulaPanelEnter = (event) => {
        if (event.key === "Enter") {
            fetch("http://localhost:3001/fget", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tag: event.target.value.trim()
                })
            }).then((res => 
                return res.json();
            }).then((result => 
                this.setState({receivedFormulas: result});

            });
        }

    };


    formulaInsert = (event => 
        this.props.addMethod(event);
        this.setState({formulas:null,receivedFormulas:null});
        this.listItems=null;
        this.formulaPanelQuery.current.value="";
    };

    componentDidUpdate(prevProps,prevState) {
        if(this.state.receivedFormulas != prevState.receivedFormulas) {
            if (this.state.receivedFormulas !== null) {
                this.listItems = this.state.receivedFormulas.map((element) =>
                    <span className="formulaBlock" onClick={this.formulaInsert}><InlineMath>{element.code}</InlineMath></span>

                )
            } else
                this.listItems = null;

                this.setState({formulas:this.listItems});


        }

    }


    render() {
        return  ( <Panel id="formulaPanel">
                <div className="input-group">
                    <span className="input-group-addon" id="basic-addon1">@</span>
                    <input  ref={this.formulaPanelQuery} type="text" className="form-control" placeholder="Cauta formula"
                           aria-describedby="basic-addon1" onKeyPress={this.formulaPanelEnter}/>
                </div>
                <Panel.Body>
                    {this.state.formulas}
                </Panel.Body>
            </Panel>
        );
    }
}

