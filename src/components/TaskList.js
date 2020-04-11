import React, { Component } from 'react';
import ItemList from './ItemList'

class TaskList extends Component {
    render() {
        let { listTasks } = this.props; 
        let itemTask = listTasks.map((task,index) => {
            return <ItemList key={index} task={ task } index={index} />;
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
                        { itemTask }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TaskList;