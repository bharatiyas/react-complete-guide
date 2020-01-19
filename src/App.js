import React, { Component } from 'react';
import './App.css';
// Use a import name with Upper case 'Person', because lower case words are
// reserved for native HTML
import Person from './Person/Person';

import styled from 'styled-components';

// We will use regular CSS here so no cAmel case and ''
const StyledButton = styled.button`
  background-color: ${props => props.alt ? 'red' : 'green'};
  font: inherit;
  border: 10px solid blue;
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
    color: black;
    border: 1px dotted blue;
  }

`;

// IMPORTANT:: Anything in this method or in React is ultimately Javascript.
class App extends Component {

  // state is a reserved keyword to define properties in a React Component
  // created by extending Component. So if you want to manage state in a
  // component then you need to create that component by extending Component
  // and NOT by using arrow function.
  // state is a special property because if it changes then it will lead React
  // to update/re-render the DOM
  // Components which manage state are called Containers. You should have less
  // number of Containers in your React application. Because if you manage
  // states in lot of components then your code will be difficult to maintain.
  state = { // is a property of the class, similar to render which is a method
    persons: [
      {id:"u1", name: "Sanjay", age: 41},
      {id:"u2", name: "Idhant", age: 7},
      {id:"u3", name: "Vandana", age: 37}
    ],
    showPersons: true
  }

  // This is just a normal method in the class. Suffix "Handler" is there just
  // to follow the naming convention.
  // Using arrow function (assign a method to a property of the class, in this
  // case switchNameHandler) to define the event handler is more suited becase we
  // have to use "this" keyword here. In an arrow function "this" keyword
  // properly refers to the class. If we would use normal function i.e.
  // switchNameHandler() then "this" keyword doesnot properly refer to the class
  // because of the way Javascript handles this keyword.
  // But for other methods we could use either ways.
  switchNameHandler = (newName) => {
    // DO NOT DO THIS: this.state.persons[0].name = "Sanjay Bharatiya"
    // React will MERGE the state passed through setState method with the
    // original state when we use setState(), then allow React to update the
    // DOM.
    this.setState({
      persons: [
        {name: newName, age: 41},
        {name: "Idhant", age: 7},
        {name: "Vandana", age: 37}
      ]
    })
  }

  nameChangedHandler = (event, id) => {

    const changedPersonId = this.state.persons.findIndex(p => p.id === id);

    // Spread operator is also available for objects
    const changedPerson = {
        ...this.state.persons[changedPersonId]
    };

    changedPerson.name = event.target.value;

    const personsCopy = [...this.state.persons];
    personsCopy[changedPersonId] = changedPerson;

    this.setState({persons: personsCopy});
  }

  deleteNameHandler = (personIndex) => {
    // Its a bad practice to edit an array while operating the same array. This
    // can lead to problems. Similary to Java.
    // const changedPersons = this.state.persons;

    // So you should always update state in an immutable fashion. So you should
    // create a copy of the state, change that and then update the state with
    // setState().
    // Hence we will create a new copy of the original array by using the
    // slice() without any aruments
    // const changedPersons = this.state.persons.slice();

    // Another way of creating a copy of the existing array is the spread
    // operator (...)
    const changedPersons = [...this.state.persons];
    changedPersons.splice(personIndex, 1);
    this.setState({persons: changedPersons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

 // Wheneve React renders/re-renders the DOM it executes this whole render(),
 // and not any one part of the method.

 // Here :hover is the Pesudo Selector. Radium supports all Pseudo selectors.
 // You need to wrap the Pseudo Selector in quotation marks becase they start
 // with a ':' hence they are not standard JS property names. Because in JS if
 // there is a special character in the prop name then you can wrap is in ''.
 render() {
    const buttonStyle = {
        backgroundColor: 'yellow',
        font: 'inherit',
        border: '1px solid blue',
        padding: '8px',
        cursor: 'pointer',
        ':hover': {
          backgroundColor: 'lightgreen',
          color: 'black'
        }
    };

    let persons = null;

    if(this.state.showPersons) {
      persons = (
        <div>
          {
            // We can write normale Javascript here. Here we use map() on a
            // Javascript array and this is normal Javascript. This is the
            // beauty of React that unlike Angular and Vue JS we do not have
            // proprietary functions or directives
            // We get the index argument for free from React.

            // 'key' prop is an important prop while rendering a list of data.
            // 'key' prop is a default prop React expects to find in both
            // default HTML or custom elements
            // 'key' prop helps react to keep track of the elements in the list.
            // 'key' should be an unique ID. Generally, it can be some ID like a
            // ID from a DB response, etc.
            // 'key' prop helps React to update the list efficiently because it
            // needs to know what exactly it needs to adjust inside the DOM
            // while re-rendering the list.


            this.state.persons.map( (person,index) => {
                return <Person
                        click={() => this.deleteNameHandler(index)}
                        name={person.name} age={person.age}
                        key={person.id}
                        nameChanged={(event) => this.nameChangedHandler(event, person.id)}/>
            })
          }
        </div>
      );

      // REMEMBER: in JSX we can write normal JS code. Hence we can refer
      // any variable or any property. So we can set backgroundColor property
      // on style variable.
      buttonStyle.backgroundColor = 'red';
      // Here we use [] because ':hover' is a string with a special character
      buttonStyle[':hover'] = {
        backgroundColor: 'salmon',
        color: 'yello'
      }
    }

    // let classes = ['red', 'bold'].join(' ');

    // This defines are normal JS array
    const classes = [];

    if(this.state.persons.length <= 2) {
      // push() is a normale JS method to push the classes
      classes.push('red'); // classes = ['red']
    }
    if(this.state.persons.length <= 1) {
      classes.push('bold'); // classes = ['red', 'bold']
    }

    return (
      // Following is JSX code which looks like HTML
      // We can return only one element from here. But with React 16, we can
      // return a JSON element.
      // But it is a Best Practice to return 1 element from one Component.
      // This is similary to return statement in Java.
      // In JSX we have className attribute which is then transformed to
      // HTML class attribute.
      <div className="App">
          <h1>Hi, I am now learning React!!</h1>
          <p className={classes.join(' ')}>Lets get going ----------> </p>
          {/* Do not put () after switchNameHandler because this will cause Reac
          to call the function on page load.
          <button onClick={this.switchNameHandler}>Switch Name</button>
          */}
          {/* We can inject any JS expression using {} in JSX */}
          {/* Following is not the recommended way of passing parameter(s) because
            it can be inefficient*/}
          <StyledButton alt={this.state.showPersons} onClick={this.togglePersonsHandler}>
              Toggle Persons
          </StyledButton>
          
          {persons}

        </div>
    );

    // Above return block gets compiled to following JSX statement
    // Following statement is very cumbersome to write especially with nested
    // React.createElement(). Hence, we write return statements like above
    // return React.createElement('div', {className: 'App'},
    //   React.createElement('h1', null, 'I am trying to learn React!!'));
  }
}

// Here Radium is a higher order component. Here Radium is Component wrapping
// App Component injecting some extra functionality.
export default App;
