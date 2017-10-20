//NOTE: all solutions require a written in semi-colon for some reason - kept in code so it will pass as the solution

import React from "react";
import PropTypes from "prop-types";

export default class TodoBox extends React.Component {
    render() {
        return (
            <div className="todoBox">
                <h1>Todos</h1>
                <TodoList />
                <TodoForm />
            </div>
        );
    };
};

class TodoList extends React.Component {
    render() {
        return (
            <div className="todoList">
                <table style={{ border: "2px solid black;" }}>
                    <tbody>
                        <Todo title="Shopping">Milk</Todo>
                        <Todo title="Hair cut">13:00</Todo>
                        <Todo title="Learn React">15:00</Todo>
                    </tbody>
                </table>
            </div>
        );
    };
};

class Todo extends React.Component {
    constructor(props) {
        super(props);
        const handleChange = this.handleChange.bind(this);
        this.state = { checked: false };
    }

    handleChange() {
        this.setState({ checked: !this.state.checked });
    };

    // LYR's own solution: this can be more useful as it can be reused for textboxes, etc.
    // handleChange(e){
    //     this.setState({checked:e.target.checked});
    // }

    render() {
        return (
            <tr>
                <td style={{ border: "1px solid black;" }}>
                    <input type="checkbox" checked={this.state.checked} onChange={this.handleChange} />
                </td>
                <td style={{ border: "1px solid black;" }}>{this.props.title}</td>
                <td style={{ border: "1px solid black;" }}>{this.props.children}</td>
            </tr>
        );
    };
};

Todo.propTypes = {
    title: PropTypes.string.isRequired
};

class TodoForm extends React.Component {
    render() {
        return (
            <div className="todoForm">
                I am a TodoForm.
            </div>
        );
    };
};