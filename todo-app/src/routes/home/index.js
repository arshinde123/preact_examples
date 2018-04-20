import { h, Component } from 'preact';
import style from './style';
import  axios  from 'axios';

export default class Todo extends Component {

	createTodoForm = () => {
		this.setState({ isCreate: !this.state.isCreate });
		this.setState({ createNew: !this.state.createNew });
	}

	createTodo = async () => {
		let copy = Object.assign({}, this.state.tempTodo );
		console.log(copy);
		let temp = {
			title: copy.title,
			description: copy.description
		};
		try {
			const result = await axios.post('http://localhost:9000/api/todo_m', temp);
			console.log(result.data);
			this.state.todos.push(result.data);
		}
		catch (error) {
			console.error(error);
		}

		//this.state.todos.push(copy);
		this.setState({ todos: this.state.todos });
		this.setState({ blank: '' });
	}

	handleName = (event) => {
		this.state.tempTodo.title = event.target.value;
	}
	handleDescription = (event) => {
		this.state.tempTodo.description = event.target.value;
	}

	listTodo = async () => {
		try {
			const result = await axios.get('http://localhost:9000/api/todo_m');
			this.setState({ todos: result.data });
		}
		catch (error){
			console.error(error);
		}
	}

	async componentWillMount(){
		this.state.todos = [];
		try {
			const result = await axios.get('http://localhost:9000/api/todo_m');
			this.setState({ todos: result.data });
		}
		catch (error){
			console.error(error);
		}

		this.state.isCreate = false;
		this.state.createNew = false;
		this.state.tempTodo = {
			title: '',
			description: '',
			status: 'pending'
		};
		this.state.blank = '';
	}

	render({},{ todos, isCreate, createNew }) {
		return (
			<div class={style.home}>

				<h1 style="margin-left:40px;">MongoDB Todo App </h1>

				{
					todos.map( (todo,index) => (
						<TodoList value={todo} onDelete={this.listTodo} />
					))
				}
				<br />
				<br />

				<div style={isCreate ? 'display:block' : 'display:none'}>
					<div style="border: 1px solid black;margin:10px;padding:20px;width:20%">
						<label>Task Name</label>
						<input type="text" style="width:100%" onChange={this.handleName} value={this.state.blank} />
						<br /> <br />
						<label>Task Description</label>
						<textarea style="width:100%" onChange={this.handleDescription} value={this.state.blank} />
						<br /> <br />
						<input type="button" value="save" onClick={this.createTodo} />
					</div>
				</div>

				<div style="border: none;margin:10px;padding:20px;width:20%;text-align:center;">
					<input type="button" value={createNew ? 'cancel' : 'new'} onClick={this.createTodoForm} />
				</div>
			</div>
		);
	}
}

class TodoList extends Component{

	handleEditing = () => {
		this.setState({ isEditing: !this.state.isEditing });
	}

	updateTodo = async (e) => {
		console.log(this.props.value.id);
		this.setState({ isEditing: !this.state.isEditing });
		try {
			const result = await axios.put(`http://localhost:9000/api/todo_m/${this.props.value.id}`,
				{ title: this.state.title, description: this.state.description });
			console.log(result.data);
			//this.props.onDelete();

		}
		catch (error){
			console.log(error);
		}
	}

	destroyTodo = async () => {
		console.log('inside handle delete');
		console.log(this.props.value.id);
		try {
			await axios.delete(`http://localhost:9000/api/todo_m/${this.props.value.id}`);
			this.props.onDelete();
		}
		catch (error){
			console.log(error);
		}
	}

	handleName = (e) => {
		this.setState({ title: e.target.value });
	}
	handleDescription = (e) => {

		this.setState({ description: e.target.value });
	}
	handleStatus = async () => {
		console.log(this.state);
		if (this.state.status === 'pending'){
			this.setState({ status: 'completed' });
			this.state.isPending = !this.state.isPending;
		}
		else {
			this.setState({ status: 'pending' });
			this.state.isPending = !this.state.isPending;
		}
		try {
			const result = await axios.put(`http://localhost:9000/api/todo_m/${this.state.id}`,
				{ status: this.state.status });
			console.log(result.data);
		}
		catch (error){
			console.log(error);
		}
	}

	constructor(props){
		super(props);
		this.state = props.value;
		console.log(this.state);
	}

	render({ value },{ isEditing }){
		let task = value;
		return (

			<div style="border: 1px solid darkgray;margin:10px;padding:20px;width:20%">
				<div style={isEditing ? 'display:none' : 'display:block'}>
					<h3>{task.title}</h3>
					<p>{task.description}</p>
					<button onClick={this.handleEditing} style="float:right;background-color:white;border:none;cursor:pointer;">&#9782;</button>
					<button onClick={this.destroyTodo} style="float:right;background-color:white;border:none;cursor:pointer;font-size:15px;">&#9747;</button>
					<br /><br />
					<div style={this.state.status==='pending' ? 'display:block;' : 'display:none'}>
						<input type="button" value={task.status} onClick={this.handleStatus} class={style.btnStatus} style="color:red;border: 1px solid red;" />
					</div>
					<div style={this.state.status==='completed' ? 'display:block;' : 'display:none'}>
						<input type="button" value={task.status} onClick={this.handleStatus} class={style.btnStatus} style="color:green;border: 1px solid green;" />
					</div>
				</div>

				<div style={isEditing ? 'display:block' : 'display:none'}>
					<label>Task Name</label>
					<input type="text" name="title" value={task.title} onChange={this.handleName} style="width:100%" />
					<br /> <br />
					<label>Task Description</label>
					<textarea name="description" value={task.description} onChange={this.handleDescription} style="width:100%" />
					<br /> <br />
					<input type="button" value="close" onClick={this.updateTodo} />

				</div>
			</div>
		);
	}
}
