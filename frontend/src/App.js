import React, { Component } from 'react';
import Buchung from './buchung/buchung';
import Overview from './buchung/overview';
import { withRouter } from 'react-router'
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link
} from 'react-router-dom'
// import {
//     Grid,
//     Col,
//     Row  
// } from 'react-bootstrap';

import logo from './logo.svg';
import './App.css';
import moment from 'moment';
import 'moment/locale/de';

// const Home = () => (
//   <span>
//   <div>
//     <h2>Home</h2>
//   </div>
//   </span>
// )


class Topic2 extends Component {
  render() { 
    return (
    <div>
    <h3>{
      this.props.match.params.topicId
      }</h3>
  </div>
  );}
}

// const Topic = ({ match }) => (
//   <div>
//     <h3>{match.params.topicId}</h3>
//   </div>
// )

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic2}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)


class App extends Component {
   constructor(props) {
        super(props);

        moment.locale('de');

        this.state = {
           value: 0,
            description: '',
            category: ''
        };
    }

  addEntry(value) {
    //alert(JSON.stringify(value));
    this.setState(value);
  };

  render() {

    const RenderAddEntry = (props) => {
      return (
        <Buchung location={props.location}        
          onAddEntry={this.addEntry.bind(this)} //shifting state up :)
          />
      );
    }
  
    // let showEntered = null;
    // if(this.state.value > 0) {
    //   showEntered = <div>
    //         <div>{this.state.value}</div>
    //         <div>{this.state.description}</div>
    //         <div>{this.state.category}</div>
    //         </div>;
    // }

    return (         
        <Router>
          <div className="App"> 
              <div className="navigationbar-wrapper">
                <img src={logo} className="App-logo" alt="logo" />
                <ul className="reactNavElement">
                  <li><NavLink exact activeClassName="selected" to="/">Home</NavLink></li>
                  <li><NavLink activeClassName="selected" to="/addentry">Buchen</NavLink></li>
                  <li><NavLink activeClassName="selected" to="/topics">Topics</NavLink></li>
                </ul>
              </div>          
          <div className="mainContent">
            <Route exact path="/" component={Overview}/>
            <Route path="/addentry" render={RenderAddEntry}/>
            <Route path="/topics" component={Topics}/>
          </div>
        </div>
      </Router>    
    );
  }
}

export default App;
