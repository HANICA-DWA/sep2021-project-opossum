'use strict';
const fetch = require('node-fetch');

class Player {
    constructor(state = null) {
        this._state = state;
    }

    get state() {
        return this._state;
    }

    async startNew() {
        const startLocation = 'town';

        this._state = {
            location: startLocation,
            inventory: [],
            map: {}
        };

        const result = await fetch(`http://localhost:3001/${startLocation}`);
        const fetchedLocation = await result.json();

        this._state.map[startLocation] = fetchedLocation;

        return this._state.map[startLocation].description;
    }

    getLocationInformation() {
        const playerLocation = this._state.map[this._state.location];
        
        let locationInfo = {
            description: playerLocation.description,
            exits: playerLocation.exits
        };
    
        return locationInfo;
    }
    
    // async goToLocation(locationName) {
    //     if (this._state.map[this._state.location].exits.includes(locationName)) {
    //         if (this._state.map.hasOwnProperty(locationName)) {
    //             this._state.location = locationName;
    //         }
    //         else {
    //             const res = await fetch(`http://localhost:3001/${locationName}`);
    //             const location = await res.json(); 
    //             this._state.map[locationName] = location;           
    //             this._state.location = locationName;
    //         }
    //     }
     
    //     return this._state.map[this._state.location].description;
    // }
}


module.exports = Player;