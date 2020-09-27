import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import ConTrol from './components/Control';
import TaskList from './components/TaskList';
import randomstring from 'randomstring';
import { connect } from 'react-redux';
import * as actions from './actions'

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      sortBy : 'name',
      sortValue : 1,
    }
  }

  onGenerateData = () => {
    let tasks = [
      {
        id: randomstring.generate(),
        name: "học lập trình PHP",
        status: "true",
      },
      {
        id: randomstring.generate(),
        name: "học lập trình ASP",
        status: "false",
      },
      {
        id: randomstring.generate(),
        name: "học lập trình Python",
        status: "true",
      },
    ];
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

 

  showTaskForm = () => {
    this.props.onToggleForm();
  }

  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    });
  }

  onSubmit = (data) => {
    let { tasks } = this.state;
    if (data.id === '') {
      let task = {
        id: randomstring.generate(),
        name: data.name,
        status: Boolean(data.status)
      };
      tasks.push(task);
    } else {
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }
    this.setState({
      tasks: tasks,
      taskEditing: null
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onUpdate = (id) => {
    let { tasks } = this.state;
    let index = this.findIndex(id);
    let taskEditing = tasks[index];
    this.setState({
      taskEditing: taskEditing
    });
    this.onShowForm();
  }

  onSort = (sortBy,sortValue) => {
    this.setState({ 
      sortBy : sortBy,
      sortValue : sortValue 
    });
  }

  render() {
    let { isDisplayForm } = this.props;
    
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <TaskForm onSubmit={this.onSubmit} />
          </div>
          <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
            <button type="button" className="btn btn-primary mb-15 mr-15" onClick={this.showTaskForm}>
              <span className="fa fa-plus mr-5" />Thêm Công Việc
            </button>
            <button type="button" className="btn btn-primary mb-15" onClick={this.onGenerateData}>
              Generate data
            </button>
            <ConTrol />
            <div className="row mt-15">
              <TaskList onUpdateStatus={this.onUpdateStatus} onUpdate={this.onUpdate}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isDisplayForm : state.isDisplayForm
  };
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggleForm : () => {
      dispatch(actions.toggleForm());
    },
    onClearTask : (task) => {
      dispatch(actions.editTask(task));
    },
    onOpenForm : () => {
      dispatch(actions.openForm());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
