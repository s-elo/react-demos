import React from "react";

type User = {
  id: string;
  name: string;
  age: number;
};
type StateType = {
  users: string | Array<User>;
};

export default class Child extends React.Component<{}, StateType> {
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
        {Array.isArray(this.state.users) &&
          this.state.users.map((user) => (
            <h4 key={user.id}>
              {user.id}---{user.name},{user.age}
            </h4>
          ))}
      </div>
    );
  }
}
