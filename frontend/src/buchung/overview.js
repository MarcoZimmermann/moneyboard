import React from 'react';
import Utils from '../utils/utils.js'
import DateFilter from '../components/datefilter.js'
import moment from 'moment'

class Overview extends React.Component {
  constructor() {
    super();
    this.utils = new Utils();
    this.state = {
      values: [],
      startDate: moment().subtract(14, 'days'),
      endDate: moment()
    };
  }

  componentDidMount() {
    this.loadData(this.state.startDate);
  }

  loadData(startDate, endDate) {
    const that = this;    
    
    var param ="";
    if(startDate)
      param = 'startDate='+encodeURIComponent(startDate.format('YYYY-MM-DD'));

    if(endDate) {
      if(param.length>0)
        param+="&";

      param+='endDate='+encodeURIComponent(endDate.format('YYYY-MM-DD'));
    }

    var url='/api' + (param.length > 0 ? '?'+param : "");
    this
      .utils
      .getData(url)
      .then(data => {
        that.setState({values: data.items, totalAmount: data.amount});        
      });
  }
  

  editEntry(history, item) {
    history.push('/addentry/' + item.id);
  }

  render() {
    const history = this.props.history;

    return <div>
      <DateFilter       
        startDate = { this.state.startDate }
        onStartChanged = { v=> {
          var newStartDate = moment(v);
          this.setState({startDate: newStartDate });
          this.loadData(newStartDate);
          }
        }

        endDate = { this.state.endDate }
        onEndChanged = { v=> {
          var newEndDate = moment(v);
          this.setState({endDate: newEndDate });
          this.loadData(this.state.startDate, newEndDate);
          }          
        }
      />
      <b>Saldo: {this.state.totalAmount}</b>

      <ul>
        {
          this.state.values.map((item, index) => {
            const valueClass = item.value < 0 ? "debit" : "credit";

            return <li key={index}>
              <div
                className="card"
                style={{ width: "40em"}}
                onClick={e => this.editEntry(history, item)}>
                <div className="date">{moment(item.entryDate).format('DD.MM.YY hh.mm.ss')}</div>
                <div className="grow">{item.description}</div>
                <div className={valueClass}>{item.value}€</div>
              </div>
            </li>
          })
        }
      </ul>
    </div>;
  }

  
}

export default Overview;
