import React, { Component } from 'react';

class Sort extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortBy : 'name',
            sortValue : 1
        }
    }
    
    onClick = (sortBy, sortValue) => {
        this.setState({ 
            sortBy : sortBy,
            sortValue : sortValue 
        });
        this.props.onSort(sortBy,sortValue);
    }
    render() {
        let { sortBy,sortValue } = this.state; 
        return (
            <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    Sắp Xếp <span className="fa fa-caret-square-o-down ml-5" />
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <li onClick={ () => this.onClick('name', -1) }>
                        <a role="button" className={(sortBy==='name'&&sortValue===-1) ? 'select_sort' : ''}>
                            <span className="fa fa-sort-alpha-asc pr-5" > Tên A-Z </span>
                        </a>
                    </li>
                    <li  onClick={ () => this.onClick('name', 1) }>
                        <a role="button" className={(sortBy==='name'&&sortValue===1) ? 'select_sort' : ''}>
                            <span className="fa fa-sort-alpha-desc pr-5"> Tên Z-A </span>
                        </a>
                    </li>
                    <li role="separator" className="divider" />
                    <li  onClick={ () => this.onClick('status', 1) }><a role="button" className={(sortBy==='status'&&sortValue===1) ? 'select_sort' : ''}>Trạng Thái Kích Hoạt</a></li>
                    <li  onClick={ () => this.onClick('status', -1) }><a role="button" className={(sortBy==='status'&&sortValue===-1) ? 'select_sort' : ''}>Trạng Thái Ẩn</a></li>
                </ul>
            </div>

        );
    }
}

export default Sort;