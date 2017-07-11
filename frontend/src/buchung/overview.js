import React from 'react';
import Utils from '../utils/utils.js'



class Overview extends React.Component {
  constructor() {
    super();
    this.utils = new Utils();
    this.state = {
      values: []
    };

  }

  render() {
    return <div>
      <ul> { 
        this.state.values.map((item, index) =>           
            {
              const desc = item.description ? (item.description.trim() + ": ") : ""

              return <li key={index}>{desc} {item.value} {item.category}</li>
            })
        }
      </ul>            
    </div>;
  }

  componentDidMount() {
    const that = this;
    this
      .utils
      .getData('/api/')
      .then(data => {
        that.setState({values: data});

        
        console.log(that.state, data);
      });
  }
}

export default Overview;
