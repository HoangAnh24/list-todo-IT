import React, { Component } from 'react';

class ItemList extends Component {
    render() {
        let { task,index } = this.props; 
        return (
            <tr>
                <td className="text-center">{ ++index  }</td>
                <td>{ task.name }</td>
                <td className="text-center"> 
                    <span className={ task.status === true ? 'label label-success' : 'label label-warning' }> { task.status === true ? 'Kích Hoạt' : 'Ẩn' }  </span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning">
                        <span className="fa fa-pencil mr-5" />Sửa
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-danger">
                        <span className="fa fa-trash mr-5" />Xóa
                    </button>
                </td>
            </tr> 
        );
    }
}

export default ItemList;