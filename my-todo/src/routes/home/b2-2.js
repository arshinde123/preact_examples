import { h, Component } from 'preact';
import linkState from 'linkstate';
import style from './style';

export default class Home extends Component {
	handleDelete(){
		//confirm('do you want to delete?');

	}
	addTask(){

	}

	handleTaskName(event){
		this.setState({ taskName: event.target.value });
	}

	handleTaskDescription(event){
		this.setState({ taskDescription: event.target.value });
	}

	handleStatus(){
		if (this.state.status){
			this.setState({ statusText: 'completed' });
			this.state.status = !this.state.status;
		}
		else {
			this.setState({ statusText: 'pending' });
			this.state.status = !this.state.status;
		}
	}

	handleEdit(taskN,taskD){
		if (this.state.editStatus){
			this.setState({ editText: 'edit' });
			this.state.editStatus = !this.state.editStatus;
		}
		else {
			this.setState({ editText: 'save' });
			this.state.editStatus = !this.state.editStatus;
		}
	}

	constructor(props){
		super(props);
		this.state.status = true;
		this.state.taskCount = [];
		this.handleStatus = this.handleStatus.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleTaskName = this.handleTaskName.bind(this);
		this.handleTaskDescription = this.handleTaskDescription.bind(this);
	}

	componentWillMount(){
		this.setState({ statusText: 'pending', editText: 'edit', taskName: 'Task 1', taskDescription: 'Task Description' });
	}
	render({ },{ taskN, taskD }) {
		return (

			<div class={style.home}>
				<h1>Todo App</h1>

				{this.state.editText === 'edit' && (
					<div>
						<h3>{this.state.taskN}</h3>
						<hr />
						<p>{this.state.taskD}</p>
						<br />
						<input type="button" value={this.state.editText} class={style['btn-crud']} onClick={this.handleEdit} />
						<input type="button" value="delete" class={style['btn-crud']} onClick={this.handleDelete} />


						<br />
						<br />
						{this.state.statusText === 'completed' && (
							<input type="button" value={this.state.statusText} class={style['btn-status']} onClick={this.handleStatus} style="background-color:green;" />
						)}

						{this.state.statusText === 'pending' && (
							<input type="button" value={this.state.statusText} class={style['btn-status']} onClick={this.handleStatus} style="background-color:orange;" />
						)}
					</div>
				)}
				{this.state.editText === 'save' && (
					<div>
						<label>Task Name</label>
						<input value={taskN} onInput={linkState(this, 'taskN')} type="text" />
						<br />
						<br />
						<label>Task Description</label>
						<textarea style="min-width:100%;" value={taskD} onInput={linkState(this, 'taskD')} type="text" />
						<br />
						<input type="button" value={this.state.editText} class={style['btn-crud']} onClick={this.handleEdit(taskN,taskD)} />
					</div>
				)}

			</div>
		);
	}
}
