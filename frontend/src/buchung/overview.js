import React from 'react';
import Utils from '../utils/utils.js'
import moment from 'moment'



class Overview extends React.Component {
  constructor() {
    super();
    this.utils = new Utils();
    this.state = {
      values: []
    };
  }

  render() {
    return <div className="overview">      
      <b>Saldo: {this.state.totalAmount}</b>
      <ul> { 
        this.state.values.map((item, index) =>           
            {
              const valueClass = item.value < 0 ? "debit" : "credit";                              

              return <li key={index}>                
                <div className="card" style={{width: "40em"}}>  
                    <div className="date">{moment(item.entryDate).format('DD.MM.YY hh.mm.ss')}</div>              
                    <div className="grow"> {item.description} </div>
                    <div className={valueClass}>{item.value} €</div>
                </div>
              </li>
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
        that.setState({values: data.items, totalAmount: data.amount});

        
        console.log(that.state, data);
      });
  }
}

export default Overview;
