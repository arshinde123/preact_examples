import { h, Component } from 'preact';
//import linkState from 'linkstate';
import style from './style';

export default class Home extends Component {

	handleEdit(index){
		console.log('inside handleEdit');
		console.log(this.state);
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
		this.state.taskCount = [{ statusText: 'pending', taskName: 'Task 1', taskDescription: 'Task Description' },{ statusText: 'pending', taskName: 'Task 1', taskDescription: 'Task Description' }];
		//this.handleEdit = this.handleEdit.bind(this);
	}

	componentWillMount(){
		this.setState({ editText: 'save' });
		this.setState({ editStatus: true });
	}
	render({},{}) {
		return (

			<div class={style.home}>
				<h1>Todo App</h1>
				{
					this.state.taskCount.map((count, index) => (
						<div>
							<p>Hello, {count} !</p>
							<p>Hello, {index} !</p>
							<form>
								<label>Task Name</label>
								<br />
								<input type="text" value={count.taskName} style="min-width:100%;" />
								<br /><br />
								<label>Task Description</label>
								<br />
								<textarea style="min-width:100%">{count.taskDescription}</textarea>
								<br /><br />
								<input type="button" value={this.state.editText} onClick={this.handleEdit(index)} style="float:right; margin-right:10px;" />
								<br /><br />
								<input type="button" value={count.statusText} style="min-width:100%;" />
							</form>
						</div>
				    ))
				}


			</div>
		);
	}
}
