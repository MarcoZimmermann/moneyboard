import React from 'react';
import {
    Grid,
    Col,
    Button,
    Form,
    FormGroup,
    ControlLabel,
    FormControl,
    InputGroup
} from 'react-bootstrap';
import {FormSelect} from '../components/controls.js'
import Utils from '../utils/utils.js'


class Buchung extends React.Component {
    constructor(props) {
        super(props);
        console.log("Ctor");

        this.state = {
            value: 0.00,
            description: '',
            categories: ['Haus und Hof', 'Einkauf', 'Freizeit', 'Versicherung', 'Sonstiges']
        };
        this.utils = new Utils();

    }

    

    componentDidMount() {
        var location = this.props.location.pathname.match(/addentry\/([^/]+$)/i);
        if(location && location.length > 1) {
            var id = location[location.length-1];

            const that = this;
            this
                .utils
                .getData('/api/test')
                .then(data => that.setState({value: data.value, category: this.state.categories[1]}));

        }
        else { 
            this.setState({value: 0, category: this.state.categories[1]});
        }
    }


    addEntry() {
        var that = this;
        
        var valueToAdd = {
            value: this.state.value,
            description: this.state.description,
            category: this.state.category
        };

        this
            .utils
            .sendData('/api', valueToAdd)
            .then(d => {
                that.setState({LastState: "Ok"});
                setTimeout(x=> this.setState({LastState: ""}), 2500);                
            });

        this
            .props
            .onAddEntry(valueToAdd);
    }

    render() {
        const categories = this.state.categories;
        let LabelState = null;
        if(this.state.LastState)
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
                            <Col sm={12}>
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