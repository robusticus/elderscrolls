import React from 'react';
import SearchInput from './SearchInput';
import InfiniteScrollCards from './InfiniteScrollCards';

// Main component that contains and coordinates child components
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterObject: "",
        };
      this.FilterInput = this.FilterInput.bind(this);
    }

    FilterInput(filterObject) {
        this.setState({filterObject: filterObject});
    }
    
    render() {
        return (
            <div className="Container">
              <section className="Header">
                <div className="StartItem"><h1>Elder Scrolls Legends</h1></div>
                <div className="EndItem"><SearchInput onChange={this.FilterInput}/></div>
              </section>
              <section className="Main">
                <InfiniteScrollCards filterObject={this.state.filterObject} />
              </section>
              <section className="Footer">
                All content is copyright of its owner, etc. Elder Scrolls and Elder Scrolls Legends are trademarks of Bethesda Softworks.
              </section>
            </div>
        );
    };
}

export default App;
