import React from 'react';
import { Button } from 'react-bootstrap';

const MyButton = () => {
  return (
    <>
    <Button variant="primary" onClick={() => alert('Button clicked!')}>
      Click me
    </Button>
    <button>Click me</button>
    </>
  );
};

export default MyButton;
