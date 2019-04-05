import React from "react";
import "./AddFormula.css";
import { Panel, Grid, Row, Col, Button } from "react-bootstrap";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

export default class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editableFormula: "\\sum", editableTag: "Tag" };
  }

  handleFormulaSend = event => {
    fetch("http://localhost:3001/fadd", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tag: this.state.editableTag.trim(),
        code: this.state.editableFormula.trim()
      })
    }).then(() => {
      this.setState({ editableFormula: "\\sigma", editableTag: "Tag" });
    });
  };

  changeFormula = e => {
    this.setState({ editableFormula: e.target.textContent });
  };

  changeTag = e => {
    this.setState({ editableTag: e.target.textContent });
  };

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={12}>
            <Panel>
              <Panel.Heading>
                <Panel.Title>
                  <div onInput={this.changeTag} contentEditable="true">
                    Tag
                  </div>
                </Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <div
                  onInput={this.changeFormula}
                  id="content"
                  contentEditable="true"
                >
                  Cod
                </div>
              </Panel.Body>
            </Panel>
            <InlineMath>{this.state.editableFormula}</InlineMath>
            <br />
            <br />
            <Button bsStyle="success" onClick={this.handleFormulaSend}>
              Adauga
            </Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}
