import React from 'react';
import {
    Grid,
    Col,
    Button,
    Form,
    FormGroup,
    Radio,
    ControlLabel,
    FormControl,
    InputGroup
} from 'react-bootstrap';
import {FormSelect} from '../components/controls.js'
import Utils from '../utils/utils.js'

class Buchung extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0.00,
            description: '',
            entryType : 'debit',
            categories: ['Haus und Hof', 'Einkauf', 'Freizeit', 'Versicherung', 'Sonstiges']
        };
        this.utils = new Utils();
    }

    componentDidMount() {
        var locationMatch = this.props.location.pathname.match(/addentry\/([^/]+$)/i);
        const hasItemId = locationMatch && locationMatch.length > 1;
        if (!hasItemId) {
            // leeres Formular laden
            this.setState({ 
                value: 0,
                category: this.state.categories[1], 
                entryType : 'debit'});                
        } else {
            var id = locationMatch[locationMatch.length - 1];

            const that = this;
            this.utils
                .getData('/api/' + id)
                .then(data => {
                    if (data) {
                        that.setState({ 
                            id: data.id,
                            entryDate: data.entryDate,
                            value: data.value, 
                            category: data.category,
                            description: data.description,
                            entryType : 'debit'
                        })
                    }

                });
        }
    }

    addEntry() {
        var that = this;
        const data = this.state;

        if(data.entryType ==="debit" && data.value >=0) {
            data.value *=-1;
        }


        var valueToAdd = {
            id: data.id,
            entryDate: data.entryDate,
            value: data.value,
            description: data.description,
            category: data.category
        };

        var method = "POST";

        if(valueToAdd.id) {
            method = "PUT";
        }

        this
            .utils
            .sendData('/api', valueToAdd, method)
            .then(d => {
                that.setState({LastState: "Ok"});
                setTimeout(x => this.setState({LastState: ""}), 2500);
            });

        this
            .props
            .onAddEntry(valueToAdd);
    }

    test(val) {
        console.log(val);
    }

    render() {
        const categories = this.state.categories;
        let LabelState = null;
        if (this.state.LastState) 
            LabelState = <span>{this.state.LastState}</span>

        return (
            <Grid>
                <Col md={4}>
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalValue">
                            <Col componentClass={ControlLabel} sm={3}>Betrag</Col>
                            <Col sm={9}>
                                <InputGroup>
                                    <FormControl
                                        type="text"
                                        placeholder="Betrag"
                                        value={this.state.value}
                                        onChange={e => this.setState({value: e.target.value})}/>
                                    <InputGroup.Addon>€</InputGroup.Addon>
                                </InputGroup>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalCategory">
                            <Col componentClass={ControlLabel} sm={3}>Kategorie</Col>
                            <Col sm={9}>
                                <FormSelect
                                    values={categories}
                                    selected={this.state.category}
                                    onChange={x => this.setState({category: x})}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalDescription">
                            <Col componentClass={ControlLabel} sm={3}>Beschreibung</Col>
                            <Col sm={9}>
                                <FormControl
                                    componentClass="textarea"
                                    placeholder="Beschreibung"
                                    value={this.state.description}
                                    onChange={e => this.setState({description: e.target.value})}/>
                            </Col>
                        </FormGroup>

                        <FormGroup >
                            <Col sm={7}>
                            <Radio name="radioGroup" inline checked={this.state.entryType==='debit'} onChange={e=> this.setState({ entryType:'debit'}) }>Buchen</Radio>                          
                            <Radio name="radioGroup" inline checked={this.state.entryType==='credit'} onChange={e=> this.setState({ entryType:'credit'}) }>Gutschrift</Radio>
                          
                          
                            </Col>
                            <Col sm={5}>
                                <Button className="pull-right" onClick={e => this.addEntry()}>Buchen</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                    {LabelState}
                </Col>
            </Grid>

        );
    }
}

export default Buchung;