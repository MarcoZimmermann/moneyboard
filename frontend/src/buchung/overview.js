import React from 'react';
import Utils from '../utils/utils.js'
import moment from 'moment'
import { withRouter } from 'react-router'


class Overview extends React.Component {
  constructor() {
    super();
    this.utils = new Utils();
    this.state = {
      values: []
    };
  }
  editEntry(history, item) {
    history.push('/addentry/'+item.id);

  }

  render() {
    const history = this.props.history;
    
    return <div className="overview">            
      <b>Saldo: {this.state.totalAmount}</b>
      <ul> { 
        this.state.values.map((item, index) =>           
            {
              const valueClass = item.value < 0 ? "debit" : "credit";                              

              return <li key={index}>   
                <div className="card" style={{width: "40em"}} onClick={e => this.editEntry(history, item)}>  
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
    console.dir(this.props);
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
