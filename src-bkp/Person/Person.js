import React from 'react';
//import './Person.css';
import styled from 'styled-components';

// Every method (div, h1, p, href, etc) of SC (Styled Component) returns a React
// Component therefore we do not create a arrow function when declaring this
// const StyledDiv variable
// We are defining the const starting upper case 'S' because this will be used
// as a tag
// SC takes these styles in the funtions and putw them in CSS class selectors
// and adds them to HEAD of document and adds the appropriate CSS class to the
// div which is returned by this Component. In this way SC allows us to avoid
// using in-line styles.
// You can also store the SC in separate files and reuse them.
const StyledDiv = styled.div`

  width: 300px;
  margin: 16px auto;
  border: 1px solid #eee;
  box-shadow: 0 2px 3px #ccc;
  padding: 16px;
  text-align: center;

  @media (min-width: 500px) {
    width: 450px;
  }
`;

// In its simpleest form a Component is a JS function which returns a JSX/HTML
// element.
// Since we are using ES6 we will use const to create function
// By convention we will use function name starting lower case 'person'.
const person = (props) => {
  // We can specify short and simple JS function calls in {}
  // return <p>I am Person and I am {Math.floor(Math.random() * 30)} years old </p>

  // children is a reserved keyword to access the child (HTML) elements passed
  return (
    //<div className="Person" style={style}>
    <StyledDiv>
      <p onClick={props.click}>I am {props.name} and I am {props.age} years old!!</p>
      <p>{props.children}</p>
      <input type="text" onChange={props.nameChanged} value={props.name}/>
    </StyledDiv>
    //</div>
  );
}

export default person;
