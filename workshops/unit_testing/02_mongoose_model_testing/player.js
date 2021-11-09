'use strict'

const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    items: {type: [String], required: true},
    capacity: {type: Number, required: true}
});

playerSchema.methods.addItem = async function (newItem) {
    if ( this.items.length < this.capacity) {
        this.items.push(newItem);
        return await this.save();
    }  
}

mongoose.model('Player', playerSchema);