import Header from 'components/Headers/Header';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Modal, Row, Col, Container, Card, CardBody, CardHeader, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import * as actions from '../../store/actions/index'


class RequestNewBook extends Component{
    constructor(props) {
        super(props);
        this.state = {
            successNotice: '',
            successShow: false,
            errorShow: false,
            isbn: ''
        }
        //this.handleValidSubmit = this.handleValidSubmit.bind(this);
        //this.closeModal = this.closeModal.bind(this);
        this.handleValidSubmit = this.handleValidSubmit.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);

    }

    componentDidUpdate(){
        let msg = null
        if(this.props.success){
            msg = "Submit successfully"
        }
        if(msg != null && !this.state.successShow){
            this.setState({
                successShow: true,
                successNotice: msg,
            })
        }
        if(this.props.error != null && !this.state.errorShow){
            this.setState({
                errorShow: true,
            })
        }
    }


    inputChangedHandler = (event) => {
        this.setState({ isbn: event.target.value })
    }
    
    handleModalClose() {
        this.setState({
            successShow: false, 
            errorShow: false
        })
        this.refreshData()
    }

    handleValidSubmit(){
        this.setState({
            successShow: false,
            errorShow: false
        })
        this.props.onSubmitNewBook(this.state.isbn.trim())
    }

    refreshData(){
        this.props.onRefresh()
    }


    render(){
        // console.log("isbn" + this.state.isbn)
        let display = (
            <div>
            <AvForm onValidSubmit={this.handleValidSubmit}>
            <AvField
                 name="isbn" 
                 label="ISBN"  
                 type="text" 
                 value = {this.state.isbn}
                 onChange={(event => this.inputChangedHandler(event))}
                 validate={
                     {
                         required: {value: true, errorMessage: 'Please enter ISBN'}
                     }
                 } />

            <Button color="primary">Submit</Button>
            </AvForm>

            {/* below this is just for show, it's not needed unless you want a modal upon form submission */}
           
            </div>
        )

        if (this.props.loading) {
            display = <Spinner />
        }

        return (
            <>
            <Header />
            <Container className="mt--7" fluid>
                <Row>
                    <Card className="shadow w-100">
                        <CardHeader className="bg-white border-0">
                            <Row className="align-items-center">
                                <Col xs="8">
                                <h3 className="mb-0">PLEASE FEEL FREE TO SUGGEST UPCOMING BOOK</h3>
                                </Col>
                                <Col className="text-right" xs="4">
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                        {display}

                        </CardBody>
                    </Card>
                </Row>
            </Container>
            <Modal isOpen={this.state.successShow} toggle={this.handleModalClose}>
                <ModalHeader toggle={this.handleModalClose}>Success</ModalHeader>
                <ModalBody className="text-center">
                <h1 className="text-success display-1"><i className="fas fa-check-circle"></i></h1>
                <h2>{this.state.successNotice}</h2>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleModalClose}>Ok, got it!</Button>
                </ModalFooter>
             </Modal>
           
              </>
        )
    }

}

const mapStateToProps = state => {
    return {
        loading: state.requestNewBook.loaing,
        error: state.requestNewBook.error,
        success: state.requestNewBook.success
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitNewBook: (isbn) => dispatch(actions.requestNewBook(isbn)),
        onRefresh: () => dispatch(actions.refreshRequestNewBook())
    }
}


export default connect(mapStateToProps, mapDispatchToProps) (RequestNewBook)