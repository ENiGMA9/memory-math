import React from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import Home from "../components/Home/Home";
import AddQuestionComponent from "../components/AddQuestion/AddQuestion"
import AddFormulaComponent from "../components/AddFormula/AddFormula"
import ViewComponent from "../components/View/View"

export default () => (
        <Switch>
        <Route
            exact path="/"
            component={Home}
        />

        <Route
            exact path="/addq"
            component={AddQuestionComponent}
        />

            <Route
                exact path="/addf"
                component={AddFormulaComponent}
            />

        <Route
            exact path="/view"
            component={ViewComponent}
        />
        </Switch>
);