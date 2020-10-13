import React from 'react';
import CardItem from './CardItem';
import FetchStatus from './FetchStatus';
import './spinner.css';

const pageSize = 20;

// Component that provides an infinitely scrolling list view of playing cards
class InfiniteScrollCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cardData: [],
            pageNum: 1,
            isLoading: true,
            error: null,
        };

        // DOM reference to pass to intersectional observer
        this.fetchStatusRef = React.createRef();

        this.observer = new IntersectionObserver(this.IntersectionEvent.bind(this));
    }

    componentDidMount() {
        this.FetchData();
        this.observer.observe(this.fetchStatusRef.current)
    }

    // If the filter changed
    componentDidUpdate(prevProps) {
        if (prevProps.filterObject !== this.props.filterObject) {
            //console.log("Filter: " + this.props.filterObject);
            this.setState({pageNum: 1, cardData: [], isLoading: true}, () => this.FetchData());
        }
    }

    IntersectionEvent(entries) {
        //console.log(entries);
        const cardDataLen = this.state.cardData.length;
        // TODO: Investigate using the threshold object to avoid multiple calls
        // check if at the end of the set, we have less than a page
        if (entries[0].intersectionRatio > 0) {
            if (!this.state.isLoading && cardDataLen % pageSize === 0) {
                if (this.state.error === null) {
                    const pageNum = this.state.pageNum + 1;
                    this.setState({pageNum: pageNum, isLoading: true}, () => this.FetchData())
                }
            }
        }
    }

    // Retrieves JSON from API
    // TODO: Use ReactQuery for fetching
    FetchData() {
        const pageNum = this.state.pageNum;
        const resultsURL = "https://api.elderscrollslegends.io/v1/cards" +
            "?pageSize=" + pageSize +
            "&page=" + pageNum +
            (this.props.filterObject !== "" ? "&name=" + this.props.filterObject : "");
        //console.log(resultsURL);

        fetch(resultsURL)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error loading data from API...');
            }
        })
        .then(data => this.setState({ cardData: [...this.state.cardData, ...data.cards], isLoading: false }))
        .catch(error => this.setState({ error, isLoading: false }));
    }
      
    render() {
        const cardItems = this.state.cardData.map((data) => 
            <CardItem key={data.id} item={data} />
        );
        const status = this.state.error;

        return (
            <div>
                <div className="Cards">
                    { cardItems }
                </div>
                <div ref={this.fetchStatusRef}>
                    <FetchStatus isLoading={this.state.isLoading} status={status} />
                </div>
            </div>
        );
  };
}

export default InfiniteScrollCards;