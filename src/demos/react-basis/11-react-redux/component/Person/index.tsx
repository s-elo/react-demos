import React, { Component } from "react";
import { connect } from "react-redux";

import { AddPerosonAction } from "../../redux/actions/person";

import { Person as PersonData, ReduxState } from "../../redux/type";

type PersonProps = {
  persons: Array<PersonData>;
  count: number;
  add: (personObj: PersonData) => void;
};

class Person extends Component<PersonProps> {
  state = {
    inputName: "",
    inputAge: "",
    id: 1,
  };

  handleAdd = () => {
    const { inputName, inputAge, id } = this.state;

    const personObj = { id: id + 1, name: inputName, age: inputAge };

    this.props.add(personObj);

    this.setState({
      inputName: "",
      inputAge: "",
      id: id + 1,
    });
  };

  handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputName: event.target.value,
    });
  };

  handleAgeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputAge: event.target.value,
    });
  };

  render() {
    return (
      <div className="person-box">
        <h2>Person Cpmponent --- count: {this.props.count}</h2>
        <input
          onChange={this.handleNameInput}
          type="text"
          placeholder="name?"
          value={this.state.inputName}
        />
        &nbsp;
        <input
          onChange={this.handleAgeInput}
          type="text"
          placeholder="age?"
          value={this.state.inputAge}
        />
        &nbsp;
        <button onClick={this.handleAdd}>Add a person</button>
        <ul>
          {this.props.persons.map((person) => {
            return (
              <li key={person.id}>
                {person.name}---{person.age}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default connect(
  (state: ReduxState) => ({
    persons: state.persons,
    count: state.sum,
  }),
  {
    add: AddPerosonAction,
  }
)(Person);
