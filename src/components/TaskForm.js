import React, { Component } from 'react';  

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            status: 0
        };
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
        this.props.onSubmit(this.state);
        this.onClear();
        this.exitForm();
    }

    onClear = () => {
        this.setState({
            name: "",
            status: 0
        });
    }

    render() {
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">Thêm Công Việc <span className="fa fa-times-circle pull-right" onClick={this.exitForm}></span></h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input type="text" name="name" className="form-control" value={this.state.name} onChange={this.onChange} />
                        </div>
                        <label>Trạng Thái :</label>
                        <select className="form-control" name="status" required="required" value={this.state.status} onChange={this.onChange}>
                            <option value={1}>Kích Hoạt</option>
                            <option value={0}>Ẩn</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">Thêm</button>&nbsp;
                            <button type="button" className="btn btn-danger" onClick={this.onClear}>Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default TaskForm;