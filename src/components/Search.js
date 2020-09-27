import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../actions';

class Search extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            keyword : ''
        };
    }
    onChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name] : value
        });
    }
    onSearch = () => {
        this.props.onSearch(this.state.keyword);
    }

    render() {
        let { keyword } = this.state;
        return (
            <div className="input-group">
                <input type="text" name="keyword" className="form-control" placeholder="Nhập từ khóa..." value={keyword} onChange={this.onChange} />
                <span className="input-group-btn">
                    <button className="btn btn-primary" type="button" onClick={this.onSearch}>
                        <span className="fa fa-search mr-5" />Tìm
                    </button>
                </span>
            </div>

        );
    }
}
const mapStateToProps = (state) => {
    return {
    }
  };
  
  const mapDispatchToProps = (dispatch, props) => {
      return {
          onSearch : (keysearch) => {
              dispatch(actions.searchTask(keysearch));
          }
      };
    }
  
  export default connect( mapStateToProps,mapDispatchToProps)(Search);