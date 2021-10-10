import React from "react";

interface props {
  name: string;
  age: number;
}

export default function Test({ name = "leo", age = 22 }: props) {
  return <div>{`my name is ${name} and my age is ${age}`}</div>;
}
