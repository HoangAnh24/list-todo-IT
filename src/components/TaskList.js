import React, { Component } from 'react';
import ItemList from './ItemList';
import { connect } from "react-redux";
import * as action from "./../actions/index";

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1
        }
    }

    onChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        let filter = {
            name: name === 'filterName' ? value : this.state.filterName,
            status:  name === 'filterStatus' ? value : this.state.filterStatus
        };
        this.props.onFliterTable(filter);
        this.setState({
            [name]: value
        });

    }

    render() {
        let { listTasks, filterTable, keySearch } = this.props;
        if(filterTable.name) {
            listTasks = listTasks.filter((task) => {
            return task.name.toLowerCase().indexOf(filterTable.name) !== -1;
          });
        }

        listTasks = listTasks.filter((task) => {
            if(filterTable.status === -1) {
                return listTasks;
            } else {
            return task.status === (filterTable.status === 1 ? true : false);
            }
        });

        // search keyword
        if(keySearch) {
            listTasks = listTasks.filter((task) => {
            return task.name.toLowerCase().indexOf(keySearch.toLowerCase()) !== -1;
          });
        }

        let itemTask = listTasks.map((task, index) => {
            return <ItemList key={index} task={task} index={index} onUpdate={this.props.onUpdate} />;
        });

        
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th className="text-center">STT</th>
                            <th className="text-center">Tên</th>
                            <th className="text-center">Trạng Thái</th>
                            <th className="text-center">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>
                                <input type="text" className="form-control" name="filterName" onChange={this.onChange}/>
                            </td>
                            <td>
                                <select className="form-control" name="filterStatus" onChange={this.onChange}>
                                    <option value="-1">Tất Cả</option>
                                    <option value="0">Ẩn</option>
                                    <option value="1">Kích Hoạt</option>
                                </select>
                            </td>
                            <td></td>
                        </tr>
                        {itemTask}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
      listTasks : state.tasks,
      filterTable: state.filterTable,
      keySearch: state.search
  }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onFliterTable: (filter) =>  {
            dispatch(action.filterTask(filter));
        }
    };
  }

export default connect( mapStateToProps,mapDispatchToProps)(TaskList);