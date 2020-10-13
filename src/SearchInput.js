import React from 'react';

// Simple/basic search input that raises events with new values
// TODO: Add auto-complete
class SearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterObject: "",
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }

    onChange(e) {
        this.setState({filterObject: e.target.value})
    }

    onSubmit() {
        if (this.props.onChange != null) {
            this.props.onChange(this.state.filterObject);
        }
    }

    onKeyUp(e) {
        if (e.keyCode === 13) {
            this.onSubmit();
        }
        if (e.keyCode === 27) {
            this.setState({filterObject: ""}, () => this.onSubmit());
        }
    }

    render() {
      return (
          <div className="SearchInput">
              <input onChange={this.onChange} onKeyUp={this.onKeyUp} value={this.state.filterObject}/>
              <button onClick={this.onSubmit}>Search</button>
          </div>
      );
  };
}

export default SearchInput;