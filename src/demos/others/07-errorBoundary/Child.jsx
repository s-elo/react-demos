import React from "react";

export default class Child extends React.Component {
  state = {
    // users: [
    //   { id: "001", name: "leo", age: 18 },
    //   { id: "002", name: "pit", age: 18 },
    //   { id: "003", name: "git", age: 18 },
    // ],
    users: "leo",
  };

  render() {
    return (
      <div>
        {this.state.users.map((user) => (
          <h4 key={user.id}>
            {user.id}---{user.name},{user.age}
          </h4>
        ))}
      </div>
    );
  }
}
