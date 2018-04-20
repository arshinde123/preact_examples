<center><p>-----Using linkstate-----</p></center>
{this.state.editText === 'edit' && (
	<div>
		<h3>{this.state.taskN}</h3>
		<hr />
		<p>{this.state.taskD}</p>
		<br />
		<input type="button" value={this.state.editText} class={style['btn-crud']} onClick={this.handleEdit} />
		<input type="button" value="delete" class={style['btn-crud']} onClick={this.handleDelete} />
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
		<input type="button" value={this.state.editText} class={style['btn-crud']} onClick={this.handleEdit} />
	</div>
)}

<br />
<br />
{this.state.statusText === 'completed' && (
	<input type="button" value={this.state.statusText} class={style['btn-status']} onClick={this.handleStatus} style="background-color:green;" />
)}

{this.state.statusText === 'pending' && (
	<input type="button" value={this.state.statusText} class={style['btn-status']} onClick={this.handleStatus} style="background-color:orange;" />
)}
