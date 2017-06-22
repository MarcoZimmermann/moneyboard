import React from 'react';
import {
    Grid,
    Col,
    Button,
    Form,
    FormGroup,
    ControlLabel,
    FormControl
} from 'react-bootstrap';
import {FormSelect} from '../components/controls.js'
import Utils from '../utils/utils.js'

class Buchung extends React.Component {
    constructor(props) {
        super(props);
        console.log("Ctor");

        this.state = {
            value: 0,
            description: 'asd',
            categories: ['Haus und Hof', 'Einkauf', 'Freizeit']
        };
        this.utils = new Utils();

    }

    componentDidMount() {
        const that = this;
        this
            .utils
            .getData('/api')
            .then(data => that.setState({value: data.value, category: this.state.categories[1]}));
    }


    addEntry() {
        var valueToAdd = {
            value: this.state.value,
            description: this.state.description,
            category: this.state.category
        };

        this
            .utils
            .sendData('/api', valueToAdd)
            .then(d => console.log(d));

        this
            .props
            .onAddEntry(valueToAdd);
    }

    render() {
        const categories = this.state.categories;

        return (
            <Grid>
                <Col md={4}>
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalValue">
                            <Col componentClass={ControlLabel} sm={3}>Betrag</Col>
                            <Col sm={9}>
                                <FormControl
                                    type="text"
                                    placeholder="Betrag"
                                    value={this.state.value}
                                    onChange={e => this.setState({value: e.target.value})}/>
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
                </Col>
            </Grid>

        );
    }
}

export default Buchung;