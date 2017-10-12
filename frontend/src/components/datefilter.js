import React from 'react';
import moment from 'moment'
import {
  Form,
  FormGroup,
  ControlLabel,
  FormControl
} from 'react-bootstrap';
import './components.css';

class DateFilter extends React.Component {
    constructor(props) {
      super(props);    
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        startDate: moment(props.startDate).format('L'),
        endDate: moment(props.endDate).format('L')
      };
  }


  handleChange(e, source) {
    const method = 'on'+source+'Changed';
    if(!this.props[method])
      throw new Error("Method '" + method + "' not bound");

    var value = e.target.value;
    var dateValue = moment(value, 'DD.MM.YYYY');    
    if(dateValue.isValid()) {
      this.props[method](dateValue);
    }    
  }


  render() {
    return <div className="overviewFilter">
      <Form inline>
        <FormGroup controlId="formFilterStart">
          <ControlLabel>Von:</ControlLabel>
            <FormControl
              type="text"
              value={ this.state.startDate }
              onChange={e => this.setState({startDate: e.target.value}) } 
              onBlur={ e=> this.handleChange(e, "Start")} />
        </FormGroup>

        <FormGroup controlId="formFilterEnd">
          <ControlLabel>Bis:</ControlLabel>
            <FormControl
              type="text"
              value={ this.state.endDate }
              onChange={e => this.setState({ endDate: e.target.value}) }              
              onBlur={ e=> this.handleChange(e, "End")} />
        </FormGroup>
      </Form>
    </div>;
  }

  componentDidMount() {
    this.setState({someKey: 'otherValue'});
  }
}

export default DateFilter;
