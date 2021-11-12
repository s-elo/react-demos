import React from "react";
import ReactDOM from "react-dom";

//#region class way
// class Demo extends Component {
//   state = {
//     count: 0,
//   };
//   add() {
//     this.setState((state) => ({ count: state.count + 1 }));
//   }
//   render() {
//     return (
//       <div>
//         <div>Count: {this.state.count}</div>
//         <button onClick={this.add.bind(this)}>+</button>
//       </div>
//     );
//   }
// }
//#endregion

// function way with hook to be able to use the states
export default function Demo() {
  // React.useState is a so-called hook
  // [state, setStateMethod] = React.useState(initial value);
  // each state corresponding to a set method
  const [count, setCount] = React.useState(0);
  const [name, changeName] = React.useState("pit");

  /**
   * React.useEffect(callback, array)
   * array is used to watch the states
   * if [count], when count updates, the callback will be called, it is the componentDidUpdate
   * so blank [] means no states are watched, so it is the componentDidMount
   *
   */
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1);
    }, 1000);

    // return the function is the componentWillUnmount
    return () => {
      clearInterval(timer);
    };
  });

  function unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById("root") as HTMLElement);
  }

  function add() {
    // first way
    // setCount(count + 1);
    changeName(name === "leo" ? "pit" : "leo");

    // second way
    setCount((count) => count + 1);
  }

  const inputValue = React.useRef<HTMLInputElement>(null);

  function show() {
    console.log(inputValue);
    if (inputValue.current) alert(inputValue.current.value);
  }

  return (
    <div>
      <input type="text" ref={inputValue} />
      <div>
        count: {count}---{name}
      </div>
      <button onClick={add}>+&changeName</button>
      <button onClick={unmount}>unmount</button>
      <button onClick={show}>show</button>
    </div>
  );
}
