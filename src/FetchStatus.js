import React from 'react';

// Used to hook to an intersectional observer to trigger additional fetching
class FetchStatus extends React.Component {
    render() {
        const loadingIndicator = this.props.isLoading ? <span className="lds-ring"><div></div><div></div><div></div><div></div></span> : this.props.status;
        return (
            <div className="FetchStatus">
                {loadingIndicator}
            </div>
        );
    };
}

export default FetchStatus;