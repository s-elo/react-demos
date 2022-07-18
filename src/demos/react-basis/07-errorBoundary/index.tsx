// import React from "react·";
import ErrorBoundary from './ErrorBoundary';
import Child from './Child';

export default function ErrorBoundaryTest() {
  return (
    <ErrorBoundary>
      <Child></Child>
    </ErrorBoundary>
  );
}
