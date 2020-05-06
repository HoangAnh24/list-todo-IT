import React, { Component } from 'react';

class ItemList extends Component {
    onUpdateStatus = () => { 
        this.props.onUpdateStatus(this.props.task.id);
    }

    onRemove = () => {
        this.props.onRemove(this.props.task.id);
    }

    onUpdate = () => {
        this.props.onUpdate(this.props.task.id);
    }

    render() {
        let { task,index } = this.props;  
        return (
            <tr>
                <td className="text-center">{ ++index  }</td>
                <td>{ task.name }</td>
                <td className="text-center"> 
                    <span onClick={this.onUpdateStatus} className={ task.status ? 'label label-success' : 'label label-warning' }> { task.status  ? 'Kích Hoạt' : 'Ẩn' }  </span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick={this.onUpdate}>
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

export default ItemList;