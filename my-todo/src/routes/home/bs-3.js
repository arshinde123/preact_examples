import { h, Component } from 'preact';
//import linkState from 'linkstate';
import style from './style';

export default class Home extends Component {

	handleEdit(){
		if (this.state.editStatus){
			this.state.editStatus = !this.state.editStatus;
			//this.state.taskCount[index].editText = 'edit';
		}
		else {
			//this.state.taskCount[index].editText = 'save';
			this.state.editStatus = !this.state.editStatus;
		}
	}

	constructor(props){
		super(props);
		this.state.taskCount = [{ statusText: 'pending', editText: 'save', taskName: 'Task 1', taskDescription: 'Task 1 Description' },{ statusText: 'pending', editText: 'edit', taskName: 'Task 2', taskDescription: 'Task 2 Description' }];
	}

	componentWillMount(){
		this.setState({ editStatus: true });
		this.handleEdit = this.handleEdit.bind(this);
	}
	render({},{}) {
		return (
			<div class={style.home}>
				<h1>Todo App</h1>

			</div>
		);
	}
}
