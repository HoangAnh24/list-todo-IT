import React, { Component } from 'react';
import { connect } from "react-redux";
import * as action from "./../actions/index";
import * as actions from "../actions";
class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id : "",
            name: "",
            status: "false"
        };
    }

    componentWillMount() {
        if(this.props.itemEditing){
            this.setState({
                id : this.props.itemEditing.id,
                name : this.props.itemEditing.name,
                status : this.props.itemEditing.status,
            });
        }
    }

    componentWillReceiveProps(nextprops) {
        if(nextprops && nextprops.itemEditing){
            this.setState({
                id : nextprops.itemEditing.id,
                name : nextprops.itemEditing.name,
                status : nextprops.itemEditing.status,
            });
        } else if (!nextprops.itemEditing) {
            this.setState({
                id : "",
                name: "",
                status: "false"
            });
        }
    }

    exitForm = () => {
        this.props.onCloseForm();
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name] : value
        });
    }

    onSubmit = (event) => {
        event.preventDefault()
        this.props.onSaveTask(this.state);
        this.onClear();
        this.exitForm();
    }

    onClear = () => {
        this.setState({
            id : "",
            name: "",
            status: "false"
        });
    }

    render() {
        let { isDisplayForm } = this.props;
        if ( isDisplayForm ) {
            let { id } = this.state;
            return (
                <div className="panel panel-warning">
                    <div className="panel-heading">
                        <h3 className="panel-title">{ !id ?  'Thêm Công Việc' : 'Sửa Công Việc' } <span className="fa fa-times-circle pull-right" onClick={this.exitForm}></span></h3>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Tên :</label>
                                <input type="text" name="name" className="form-control" value={this.state.name} onChange={this.onChange} />
                            </div>
                            <label>Trạng Thái :</label>
                            <select className="form-control" name="status" required="required" value={ this.state.status === 'true' ? 'true' : 'false' } onChange={this.onChange}>
                                <option value="true">Kích Hoạt</option>
                                <option value="false">Ẩn</option>
                            </select>
                            <br />
                            <div className="text-center">
                                <button type="submit" className="btn btn-warning">{ !id ?  'Thêm' : 'Sửa' }</button>&nbsp;
                                <button type="button" className="btn btn-danger" onClick={this.onClear}>Hủy Bỏ</button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        } else {
            return '';
        }

    }
}

const mapStateToProps = (state) => {
    return {
        isDisplayForm : state.isDisplayForm,
        itemEditing : state.itemEditing
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveTask : (task) => {
            dispatch(action.saveTask(task));
        },
        onCloseForm : () => {
            dispatch(actions.closeForm());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);