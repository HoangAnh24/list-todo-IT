import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import ConTrol from './components/Control';
import TaskList from './components/TaskList';
import randomstring from 'randomstring';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      tasks: [],
      isDisPlayForm: false,
    }
  }
  componentWillMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      let tasks = JSON.parse(localStorage.getItem('tasks'));

      this.setState({
        tasks: tasks
      });
    }

  }

  onGenerateData = () => {
    let tasks = [
      {
        id: randomstring.generate(),
        name: "học lập trình PHP",
        status: true,
      },
      {
        id: randomstring.generate(),
        name: "học lập trình ASP",
        status: false,
      },
      {
        id: randomstring.generate(),
        name: "học lập trình Python",
        status: true,
      },
    ];
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  showTaskForm = () => {
    this.setState({
      isDisPlayForm: this.state.isDisPlayForm ? false : true
    });
  }

  onCloseForm = () => {
    this.setState({
      isDisPlayForm: false
    });
  }

  render() {
    const { tasks, isDisPlayForm } = this.state;
    var elmTaskForm = isDisPlayForm ? <TaskForm onCloseForm={this.onCloseForm} /> : '';
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {elmTaskForm}
          </div>
          <div className={isDisPlayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
            <button type="button" className="btn btn-primary mb-15 mr-15" onClick={this.showTaskForm}>
              <span className="fa fa-plus mr-5" />Thêm Công Việc
            </button>
            <button type="button" className="btn btn-primary mb-15" onClick={this.onGenerateData}>
              Generate data
            </button>
            <ConTrol />
            <div className="row mt-15">
              <TaskList listTasks={tasks} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
