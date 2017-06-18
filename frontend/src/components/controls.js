import React from 'react';
import { FormControl } from 'react-bootstrap';

export class FormSelect extends React.Component {
     constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
     }


    handleChange(e) {
        this.props.onChange(e.target.value);
    }

    renderSingleOption(value, index) {
        return <option key={index} value={value}>{value}</option>
    }

    render() {
        const optionValues = this.props.values;
        const selectedValue = this.props.selected;
        return (
            <FormControl componentClass="select" onChange={this.handleChange} value={selectedValue}>
                { optionValues.map((x, index)=> this.renderSingleOption(x, index) ) }
            </FormControl>
        )
    }
}
    
