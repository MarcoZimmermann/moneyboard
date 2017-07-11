import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('Adds a value to app State', () => {

  const div = document.createElement('div');
  const app = ReactDOM.render(<App />, div);

  const expected = {value: 12, description:'Hallo test', category: 'Lalelu'}
  app.addEntry(expected);  
  
  expect(app.state).toEqual(expected);  
});

