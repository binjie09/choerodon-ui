/* tslint:disable */
import React, { Component } from 'react';
import Form from '../Form';
// test Form.create on component without own props
class WithoutOwnProps extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            foo: 'bar',
        };
    }
    render() {
        return React.createElement("div", null, "foo");
    }
}
const WithoutOwnPropsForm = Form.create()(WithoutOwnProps);
React.createElement(WithoutOwnPropsForm, null);
class WithOwnProps extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            foo: 'bar',
        };
    }
    render() {
        return React.createElement("div", null, "foo");
    }
}
const WithOwnPropsForm = Form.create()(WithOwnProps);
React.createElement(WithOwnPropsForm, { name: "foo" });
class WithCreateOptions extends Component {
    render() {
        return React.createElement("div", null, "foo");
    }
}
const mapPropsToFields = (props) => {
    const { username } = props;
    return {
        username: Form.createFormField({ value: username })
    };
};
const formOptions = { mapPropsToFields };
const WithCreateOptionsForm = Form.create(formOptions)(WithCreateOptions);
React.createElement(WithCreateOptionsForm, { username: "foo" });
