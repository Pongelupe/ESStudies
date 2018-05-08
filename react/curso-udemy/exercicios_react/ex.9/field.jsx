import React, { Component } from 'react'

class Field extends Component {

    constructor(props) {
        super(props);
        this.state = { value: props.initialValue };
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <div>
                <label> {this.state.value} </label><br />
                <input onChange={this.handleChange} value={this.state.value} />
            </div>
        );
    };

    handleChange(event) {
        event.preventDefault();
        this.setState({ value: event.target.value });
    }

}

export default Field;