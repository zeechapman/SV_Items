import React, {Component} from 'react';
import * as firebase from 'firebase';

import gold from './media/gold.png';

class GetCrops extends Component {
    constructor() {
        super();
        this.state = { 
            cropsList: []
        };
    }
    
    componentDidMount() {
        const ref = firebase.database().ref().child('Crop');
        function checkForChild(e) { // If the child does not exist, don't output anything.
            if (e === undefined) {  // Used mainly to check if "produceDays" exists or not
                return "";
            } else {
                return <text>Reproduces: {e} day(s)<br/></text>;
            }
        }
        ref.on('child_added', snap => {
            const previousList = this.state.cropsList;
            previousList.push({
                name: snap.key,
                type: "Crop",
                season: "Season: " + snap.val().season,
                growthTime: "Growth time: " + snap.val().growthTime + " days",
                produceDays: checkForChild(snap.val().produceDays),
                sell: "Sell: " + snap.val().sell,
                sellSilver: "Sell (Silver): " + snap.val().sellSilver,
                sellGold: "Sell (Gold): " + snap.val().sellGold,
        });
            this.setState({
               cropsList: previousList
            });
        });
    }

    render() {
        const cropsList = this.state.cropsList.map(crop => 
            <div>
                <text>{crop.name}</text><br />
                <text>{crop.type}</text><br />
                <text>{crop.season}</text><br />
                <text>{crop.growthTime}</text><br />
                <text>{crop.produceDays}</text>
                <text>{crop.sell}</text><img src={gold} /><br />
                <text>{crop.sellSilver}</text><br />
                <text>{crop.sellGold}</text><br />
            </div> 
        );
        return (
            <div>
                {cropsList}
            </div>
        );
    }
}

export default GetCrops;