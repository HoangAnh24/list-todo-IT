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
      filter : {
        filterName : "",
        filterStatus: -1
      },
      sortBy : 'name',
      sortValue : 1,
      keyword : ""
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
    if (this.state.isDisPlayForm && this.state.taskEditing
      !== null) {
      this.setState({
        isDisPlayForm: true,
        taskEditing: null
      });
    } else { 
      this.setState({
        isDisPlayForm: this.state.isDisPlayForm ? false : true,
        taskEditing: null
      });
    }
  }

  onCloseForm = () => {
    this.setState({
      isDisPlayForm: false
    });
  }

  onShowForm = () => {
    this.setState({
      isDisPlayForm: true
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

  onUpdateStatus = (id) => {
    let { tasks } = this.state;
    let index = this.findIndex(id);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  findIndex(id) {
    let { tasks } = this.state;
    let result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  }

  onRemove = (id) => {
    let { tasks } = this.state;
    let index = this.findIndex(id);
    if (index !== -1) {
      tasks = tasks.filter((task) =>
        task.id !== id);
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  onUpdate = (id) => {
    let { tasks } = this.state;
    let index = this.findIndex(id);
    let taskEditing = tasks[index];
    this.setState({
      taskEditing: taskEditing
    });;
    this.onShowForm();
  }

  onFilter= (filterName,filterStatus) => {
      console.log(filterName + " " + filterStatus);
      filterStatus = parseInt(filterStatus);
      this.setState({
        filter : {
          filterName : filterName.toLowerCase(),
          filterStatus : filterStatus
        }
      });
  }

  onSearch = (keyword) => {
    this.setState({
      keyword : keyword
    });
  }

  onSort = (sortBy,sortValue) => {
    this.setState({ 
      sortBy : sortBy,
      sortValue : sortValue 
    });
    console.log(sortBy,sortValue);
  }

  render() {
    let { tasks, isDisPlayForm, taskEditing, filter, keyword,sortBy,sortValue } = this.state;
    if(filter) {
      if(filter.filterName) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.filterName) !== -1;
        });
      }
      // if(filter.filterStatus) {
        tasks = tasks.filter((task) => {
          if(filter.filterStatus === -1) {
            return tasks;
          } else {
            return task.status === (filter.filterStatus === 1 ? true : false); 
          }
        });
      // }
    }
    if(keyword) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }
    if(sortBy==='name') {
      tasks.sort((a,b) => {
        if(a.name > b.name) {
          return -sortValue;
        } else if(a.name < b.name) {
          return sortValue;
        } else {
          return 0;
        }
      })
    } else {
      tasks.sort((a,b) => {
        if(a.status > b.status) {
          return -sortValue;
        } else if(a.status < b.status) {
          return sortValue;
        } else {
          return 0;
        }
      })
    }
    var elmTaskForm = isDisPlayForm ? <TaskForm onSubmit={this.onSubmit} onCloseForm={this.onCloseForm} task={taskEditing} /> : '';
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
            <ConTrol onSearch={this.onSearch} onSort={this.onSort} sortBy={sortBy} sortValue={sortValue} />
            <div className="row mt-15">
              <TaskList listTasks={tasks} onUpdateStatus={this.onUpdateStatus} onRemove={this.onRemove} onUpdate={this.onUpdate} onFilter = {this.onFilter} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
