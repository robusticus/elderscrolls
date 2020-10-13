import React from 'react';

// Component that represents a single card 
class CardItem extends React.Component {
  render() {
      return (
        <div className="CardItem">
            <div className="ImageContainer">
                <img src={this.props.item.imageUrl} alt={this.props.item.name}/>
            </div>
            <div className="CardData">
                <div className="StartItem">Name</div>
                <div className="EndItem">{this.props.item.name}</div>
                <div className="StartItem">Set</div>
                <div className="EndItem">{this.props.item.set.name}</div>
                <div className="StartItem">Type</div>
                <div className="EndItem">{this.props.item.type}</div>
                <div className="Memo">{this.props.item.text}</div>
            </div>
        </div>
      );
  };
}

export default CardItem;