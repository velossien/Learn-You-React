import React from "react";
import PropTypes from "prop-types";

export default class TodoBox extends React.Component {
    render() {
        return (
            <div className="todoBox">
                <h1>Todos</h1>
                <TodoList data={this.props.data} />
                <TodoForm />
            </div>
        );
    };
};

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            titleValue: "",
            detailValue: ""
        };
        this.changeTitle = this.changeTitle.bind(this);
        this.changeDetail = this.changeDetail.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
    };

    changeTitle(e) {
        this.setState({ titleValue: e.target.value });
    };

    changeDetail(e) {
        this.setState({ detailValue: e.target.value });
    };

    addTodo() {
        //separated the next two lines as I was having trouble with 
        let newTodoList = this.state.data;
        newTodoList.push(
            {
                title: this.state.titleValue,
                detail: this.state.detailValue
            }
        );

        this.setState({
            data: newTodoList,
            titleValue: "",
            detailValue: ""
        });
    };

    deleteTodo(title) {
        let todoList = this.props.data;

        let index = -1;

        for (let i = 0; i < todoList.length; i++) {

            if (todoList[i].title == title) {
                index = i;
            };
        };

        if (index >= 0) {
            todoList.splice(index, 1);

            this.setState({
                data: todoList
            });
        }
    };

    //LYR's deleteTodo method is much more efficient - it is what I would used if I did this again.
    // deleteTodo(title) {
    //     let newData = this.state.data.filter(((todo)=> {
    //         return todo.title !== title;
    //     }));
    //     this.setState({ data: newData });
    // }


    render() {
        let todoList = this.state.data.map(((obj) => {
            return (
                <Todo title={obj.title} key={obj.title} onDelete={this.deleteTodo}>{obj.detail}</Todo>
            );
        }));
        return (
            <div className="todoList">
                <div>
                    Title:<input type="text" value={this.state.titleValue} onChange={this.changeTitle} />
                    Detail:<input type="text" value={this.state.detailValue} onChange={this.changeDetail} />
                    <button onClick={this.addTodo}>Add</button>
                </div>
                <table style={style.todoList}>
                    <tbody>
                        {todoList}
                    </tbody>
                </table>
            </div>
        );
    };
};

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            todoIndivStyle: style.notCheckedTodo
        };
        this.handleChange = this.handleChange.bind(this);
        this._onDelete = this._onDelete.bind(this);
    };

    handleChange(e) {
        this.setState({ checked: e.target.checked });

        e.target.checked
            ? this.setState({ todoIndivStyle: style.checkedTodo })
            : this.setState({ todoIndivStyle: style.notCheckedTodo });
    };

    _onDelete(e) {
        this.props.onDelete(this.props.title);
    };

    render() {
        return (
            <tr style={this.state.todoIndivStyle}>
                <td style={style.tableContent}><button onClick={this._onDelete}>X</button></td>
                <td style={style.tableContent}>
                    <input type="checkbox" checked={this.state.checked} onChange={this.handleChange} />
                </td>
                <td style={style.tableContent}>{this.props.title}</td>
                <td style={style.tableContent}>{this.props.children}</td>
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

let style = {
    checkedTodo: {
        textDecoration: "line-through"
    },
    notCheckedTodo: {
        textDecoration: "none"
    },
    tableContent: {
        border: "1px solid black"
    },
    todoList: {
        border: "2px solid black"
    }
};