import React, {Component} from 'react';
import Transition from 'react-transition-group/Transition';
import Item from './Item.jsx';
import * as firebase from 'firebase';
import loadingImg from './media/loading.gif';

class GetCrops extends Component {
    constructor() {
        super();
        this.state = { 
            cropsList: [],
            loading: true
        };
    }

    // Mount only when everything loads
    componentDidMount() {
        // Set the status of the loading to false, and wait 1.5 seconds before continuing (otherwise it would reveal that it doesn't wait to load)
        setTimeout(() => this.setState({ loading: false }), 1500);

        const ref = firebase.database().ref().child('Crop'); // Root child of database
        
        // Check if child exists in database.
        function checkForChild(c) {
            if (c === undefined) {
                return "";
            } else {
                return <text>Continues to produce every {c} day(s)<br/></text>;
            }
        }

        // For every parent, map it out to a state, along with it's children
        ref.on('child_added', snap => {
            const previousList = this.state.cropsList;
            previousList.push({
                name: snap.key,
                type: snap.val().type,
                season: snap.val().season,
                growthTime: "Growth time: " + snap.val().growthTime + " days",
                produceDays: checkForChild(snap.val().produceDays),
                sell: snap.val().sell
        });
            this.setState({ cropsList: previousList }); // Set everything that was placed in the old state into a new state
        });
    }

    render() {
        // Firebase is making this too tedious.  So I guess
        // this will do...
        function importImages(r) {
            let images = {};
            r.keys().map((item, i) => {images[item.replace('./', '')] = r(item); });
            return images;
        }

        // Remove spaces and replace with a shocked face...I mean underscore
        function replaceSpace(s) {
            return s.split(' ').join('_');
        }

        // Parses to string, then rounds down
        function sellBand(s, p) {
            var num = parseInt(s);
            return Math.floor(num * p); // All values are rounded down in game
        }
        
        // Import all theimages
        const image = importImages(require.context('./media/crops', false, /\.(png|jpe?g|svg)$/));

        // Take the cropList state, and have each item rendered
        const cropsList = this.state.cropsList.map(crop =>
            <div key={crop.name}>
                <Item img={image[replaceSpace(crop.name) + '.png']} name={crop.name} type={crop.type}  season={crop.season}  growth={crop.growthTime}  produce={crop.produceDays}  sell={crop.sell}  sellsilver={sellBand(crop.sell, 1.25)} sellgold={sellBand(crop.sell, 1.5)} />
            </div> 
        );

        // Get rid of the loading image once everything loads
        const { loading } = this.state;
        if (loading) {
            return <div><img src={loadingImg} /><br /><h2>Loading...</h2></div>;
        }

        // And after all that...one big component to render
        return (
            <div className="Crops">
                {cropsList}
            </div>
        );
    }
}

export default GetCrops;