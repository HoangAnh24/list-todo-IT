import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions';

class ItemList extends Component {
    onUpdateStatus = () => { 
        this.props.onUpdateStatus(this.props.task.id);
    }

    onRemove = () => {
        this.props.onDeleteTask(this.props.task.id);
        this.props.onCloseForm();
    }

    onEditTask = () => {
        // this.props.onUpdate(this.props.task.id);
        this.props.onOpenForm();
        this.props.onEditTask(this.props.task);
    }

    render() {
        let { task, index } = this.props;
        return (
            <tr>
                <td className="text-center">{ ++index  }</td>
                <td>{ task.name }</td>
                <td className="text-center"> 
                    <span onClick={this.onUpdateStatus} className={ task.status === true ? 'label label-success' : 'label label-warning' }> { task.status === true ? 'Kích Hoạt' : 'Ẩn' }  </span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick={this.onEditTask}>
                        <span className="fa fa-pencil mr-5" />Sửa
                    </button>
                    &nbsp;
                    <button type="button" onClick={this.onRemove} className="btn btn-danger">
                        <span className="fa fa-trash mr-5" />Xóa
                    </button>
                </td>
            </tr> 
        );
    }
}

const mapStateToProps = () => {
    return {};
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus : (id) => {
            dispatch(actions.onUpdateStatus(id));
        },
        onDeleteTask : (id) => {
            dispatch(actions.onDeleteTask(id));
        },
        onCloseForm : () => {
            dispatch(actions.closeForm());
        },
        onOpenForm : () => {
            dispatch(actions.openForm());
        },
        onEditTask : (task) => {
            dispatch(actions.editTask(task));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);