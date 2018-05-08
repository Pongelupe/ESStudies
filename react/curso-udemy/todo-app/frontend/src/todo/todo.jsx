import React, { Component } from 'react'
import axios from "axios";

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component {

    constructor(props) {
        super(props);
        this.state = { description: '', list: [] };

        this.handleAdd = this.handleAdd.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClear = this.handleClear.bind(this);

        this.refresh = this.refresh.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this);
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this);
        this.refresh();
    }

    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TodoForm description={this.state.description}
                    handleChange={this.handleChange}
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear}
                    handleAdd={this.handleAdd} />
                <TodoList list={this.state.list}
                    handleRemove={this.handleRemove}
                    handleMarkAsPending={this.handleMarkAsPending}
                    handleMarkAsDone={this.handleMarkAsDone} />
            </div>
        )
    }

    refresh(description = '') {
        const search = description ? `&description_regex=/${description}/` : '';
        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(res => this.setState({ ...this.state, description: '', list: res.data }));
    }

    handleAdd() {
        const description = this.state.description;
        axios.post(URL, { description })
            .then(res => this.refresh());
    }

    handleRemove(todo) {
        axios.delete(`${URL}/${todo._id}`).then(res => this.refresh(this.state.description));
    }

    handleChange(e) {
        this.setState({ ...this.state, description: e.target.value })
    }

    handleMarkAsDone(todo) {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: true }).then(res => this.refresh(this.state.description));
    }

    handleMarkAsPending(todo) {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: false }).then(res => this.refresh(this.state.description));
    }

    handleSearch() {
        this.refresh(this.state.description);
    }

    handleClear() {
        this.refresh();
    }
}