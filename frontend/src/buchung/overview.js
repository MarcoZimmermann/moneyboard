import React from 'react';
import Utils from '../utils/utils.js'
import DateFilter from '../components/datefilter.js'
import moment from 'moment'
import { Grid, Col, Glyphicon } from 'react-bootstrap';

class Overview extends React.Component {
  constructor() {
    super();
    this.utils = new Utils();
    this.state = {
      values: [],
      startDate: moment().subtract(1, 'months'),
      endDate: moment()
    };
  }

  componentDidMount() {
    //localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IndlcyIsImluZm8iOiJhc2RmIn0.KAogTiKjfccBFxrQYI3ttAU8yhU4kXUf22zkynMsQXc");
   
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

  deleteEntry(item) {    
    this.utils.sendData('/api/'+item.id, null, 'delete').then(x=> {
      console.log("ASdf")
      this.loadData(this.state.startDate);
    }, x=> console.log("kaputt"));
    
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

      <Grid fluid={true} className="overviewGrid">  
        <Col md={6}>
        <div className="overviewGrid">
      <ul>
        {
          this.state.values.map((item, index) => {
            return <ListItem key={index}                    
                      editEntry={x => this.editEntry(history, x) }
                      deleteEntry={x=> this.deleteEntry(x)}                       
                      item={item}/>           
          })
        }
      </ul>
      </div>
      </Col>
      </Grid>
    </div>
  }
}

class ListItem extends React.Component {  
  render() {
    const item = this.props.item;
    const valueClass = item.value < 0 ? "debit" : "credit";
    
    return (
      <li>            
        <div
          className="card">
          <div className="date">{moment(item.entryDate).format('DD.MM.YY HH.mm.ss')}</div>
          <div className="grow">{item.description}</div>
          <div className={valueClass}>{item.value}€</div>              
          <div className ="iconPane">                  
            {/* <Button onClick={e=> {e.stopPropagation(); this.props.click()}}><Glyphicon glyph="pencil" /></Button>
            <Button onClick={e=> {e.stopPropagation(); this.props.click()}}><Glyphicon glyph="remove" /></Button> */}
            <Glyphicon glyph="pencil"  onClick={e=> {e.stopPropagation(); this.props.editEntry(item)}}> </Glyphicon>
            <Glyphicon glyph="remove"  onClick={e=> {e.stopPropagation(); this.props.deleteEntry(item)}}> </Glyphicon>
          </div>
        </div>
      </li>
    )
  }
}

export default Overview;
