import React, {Component} from 'react';
import './sass/Item.scss';
import gold from './media/gold.png';
import silverStar from './media/silver-star.png';
import goldStar from './media/gold-star.png';
import iridiumStar from './media/iridium-star.png';
class Item extends Component {
    render() {
        // Since not all items produce or have iridium level quality,
        // only render the iridium line if it has a value
        function iridiumCheck(props) {
            if (props) {
                return <text className="sellIridium"><img src={gold} />{props} <img src={iridiumStar} /></text>
            }
        }
        return(
            <div className="Item" key={this.props.name}>
                <div className="Image"><img src={this.props.img} /></div>
                <div className="toolTip">
                    <text className="name">{this.props.name}</text>
                    <text className="type">{this.props.type}</text>
                    <text className="season">{this.props.season}</text>
                    <text className="growth">{this.props.growth}</text>
                    <text className="produce">{this.props.produce}</text>
                    <text className="sell"><img src={gold} />{this.props.sell}</text>
                    <text className="sellSilver"><img src={gold} />{this.props.sellsilver} <img src={silverStar} /></text>
                    <text className="sellGold"><img src={gold} />{this.props.sellgold} <img src={goldStar} /></text>
                    {iridiumCheck(this.props.selliridium)}
                </div>
            </div>
        );
    }
}

export default Item;