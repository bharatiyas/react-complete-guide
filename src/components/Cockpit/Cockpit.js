// useEffect is the second most important React hook you can use after useState
// because iinstead of all the hooks for Class based Components you can use
// this hook (call back method) in Functional Components

import React, {useEffect} from 'react';
import classes from './Cockpit.css';

const cockpit = (props) => {

    // useEffect takes a function that will run for every render cycle 
    // (in the virtual DOM, where react checks if it needs to touch the real DOM)
    // of the Cockpit component. Therefore, it is a combination of: 
    //   1. componentDidMount() - For first render cycle
    //   2. componentDidUpdate() - For other render cycles
    useEffect(() => {
      console.log('[Cockpit.js] useEffect');
      // We can make HTTP requests.
      
      // setTimeout() will be only called when persons props is changed. This 
      // is a way to control when and how useEffect() executes.
      setTimeout(() => {
        alert('Saved data to cloud!');
      }, 1000);

      // The anonymous function returned will be responsible for doing the cleanup work
      // This is same as componentWillUnmount()
      return () => {
        console.log('[Cockpit.js] Cleanup work in useEffect()');
      };
    }, []); // passing the arrary control when useEffect() executes
            // passing an array is a means to pass a dependency. This tells react 
            // that useEffect() will run if those dependecies change.
            // If we pass an empty array then there are no dependencies so they
            // can never change so useEffect() will not run except for the first
            // time that is the default. But it will never run again.
            // If we pass [props.persons] then setTimeout() will be 
            // only called when persons props is changed

    // You can have overloaded versions of useEffect()
    /*
    useEffect(() => {
      console.log('[Cockpit.js] useEffect');
           
    });
    */
    const assignedClasses = [];
    let btnClass = '';
    if(props.showPersons) {
        btnClass = classes.Red;
    }    
    if (props.persons.length <= 2) {
      assignedClasses.push(classes.red); // classes = ['red']
    }
    if (props.persons.length <= 1) {
      assignedClasses.push(classes.bold); // classes = ['red', 'bold']
    }

    return (
        // <div className={classes.Cockpit}> provides scoping of our classes in the Cockpit component
        <div className={classes.Cockpit}> 
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button className={btnClass} onClick={props.clicked}>
            Toggle Persons
            </button>
        </div>
    );
}

export default cockpit;