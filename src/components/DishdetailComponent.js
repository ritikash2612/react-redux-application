import React ,{ Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem , Button, Form ,FormGroup, Col , Label, Input, Row, FormFeedback, Modal, ModalHeader, ModalBody} from 'reactstrap';
import Menu from './MenuComponent.js';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
    constructor(props) {
        super(props);
    
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

            this.state = {
                isModalOpen: false, rating : '', username : '', comment: ''
            };      
      }

	  toggleModal() {
		this.setState({
		isModalOpen: !this.state.isModalOpen
		});
	  }

    handleSubmit(values) {
        //console.log('Current State is: ' + JSON.stringify(values));
        //alert('Current State is: ' + JSON.stringify(values));
        this.toggleModal();
        
        console.warn(this.props)
        this.props.postComment(this.props.dishId, values.rating, values.username, values.comment);
        // event.preventDefault();
    }

	render(){
		return(	
            <div>	
            <Button type="submit" name ="submit" id = "submit" onClick={this.toggleModal}>Submit Comment</Button>

            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Col md={10}>
                                <Control.select model=".rating" name="rating" id="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>          
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="username" md={2}>Your Name</Label>
                                <Col md={10}>
                                    <Control.text model=".username" id="username" name="username"
                                        placeholder="User Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }} />
                                    <Errors className="text-danger"
                                        model=".username"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }} />     
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Your feddback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                    Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                            </LocalForm>                
                    </ModalBody>
                </Modal>
                </div>	
			);
    }
}

	function RenderComments({comments, postComment, dishId}) {
		return (
			<div class ="row">
				<Card>
					<CardBody width="100%">
						<div><h4>Comments</h4>
							{
								comments.map((comm) => {							
								return(<ul className="list-unstyled">
									<li>{comm.comment}</li>
									<li>--{comm.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comm.date)))} </li>
									</ul>);
								})
							}
						</div>
						<div><CommentForm dishId = {dishId} postComment = {postComment}/></div>
					</CardBody>
				</Card>
			</div>
			)
	}
	function RenderDish({dish}) {
		if(dish != null){
			console.log('true');

			return (
				<div class = "row">
					<Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />  
						<CardBody>
							<CardTitle>{dish.name}</CardTitle>
							<CardText>
								{dish.description}
							</CardText>
						</CardBody>
					</Card>
				</div>)
		}else {
			return(<div></div>);
		}
	}
			
	class DishDetail extends Component{
	
	constructor(props) {
        super(props);
         
      }

	  toggleModal() {
		this.setState({
		isModalOpen: !this.state.isModalOpen
		});
	  }

      handleSubmitComment(event) {
        this.toggleModal();
        alert("rating: " + this.rating.value + " Username: " + this.username.value
			+ " Comment: " + this.comment.value);
		console.log("rating: " + this.rating.value + " Username: " + this.username.value
            + " Comment: " + this.comment.value);
        event.preventDefault();

    }

	  render() {

        if(this.props.isLoading){
            return(
                <div className="container">
                <div className="row">
                    <Loading/>
                </div>
                </div>
                
            );
        }
        else if (this.props.errmsg){

            console.log("props " ,this.props.errmsg);
            return(
                <div className="container">
                <div className="row">
                   <h4>{this.props.errmsg}</h4>
                </div>
                </div>
            );
        }
		if (this.props.dish != null){
			return (
                <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{this.props.dish.name}</h3>
                        <hr/>
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={this.props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={this.props.comments}
                            postComment = {this.props.postComment}
                            dishId = {this.props.dish.id}
                        />

                    </div>
                </div>
				
                </div>
            );
		}else {
			return <div></div>
		}
	}

}
 export default DishDetail;