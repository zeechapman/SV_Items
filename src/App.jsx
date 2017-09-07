import React, {Component} from 'react';
import GetCrops from './GetCrops.jsx';
import Item from './Item.jsx';

class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="App">
                <div className="Content">
                    <GetCrops />
                </div>
            </div>
        );
    }
}

export default App;