import React, {Component} from 'react';

import Person from './Person/Person';

class Persons extends Component {

    //static getDerivedStateFromProps(props, state) {
    //  console.log('[Persons.js] getDerivedStateFromProps');
    //  return state;
    //}

    shouldComponentUpdate(nextProps, nextState) {
      console.log('[Persons.js] shouldComponentUpdate');
      return true;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
      console.log('[Persons.js] getSnapshotBeforeUpdate');
      return {message: 'Snapshot!'};
    }

    // This is the most commonly used method (hook). Example - after calling
    // a REST API and fetching some data
    componentDidUpdate(prevProps, prevState, snapshot){
      console.log('[Persons.js] componentDidUpdate');
      console.log(snapshot);
    }

    // This hook is used to do any cleanup work like closing any open HTTP
    // connections, cleanup any event listeners, etc.
    // Cleanup will be done when a Component will be removed from a DOM
    // This code will run just before the Component is removed from DOM
    componentWillUnmount() {
      console.log('[Persons.js] componentWillUnmount');
    }

    // Must have render()
    render() {
      console.log('[Persons.js] rendering...');
      // In the return method we will return JSX code
      return this.props.persons.map((person, index) => {
        return (<Person
            click={() => this.props.clicked(index)}
            name={person.name}
            age={person.age}
            key={person.id}
            changed={event => this.props.changed(event, person.id)}
          />
        );
      });
      
    }
    
}  

export default Persons;