/**
 * @jest-environment node
 */

'use strict';

const mongoose = require('mongoose');
require('../player');

const Player = mongoose.model('Player');

xdescribe('Player Model Tests', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/testPlayerDB', { useNewUrlParser: true });
    });
    
    beforeEach(async () => {
        await Player.create({ _id: 'han', capacity: 1 });
    });
    
    afterEach(async () => {
        await Player.deleteMany({});
    
    });
    
    afterAll(async () => {
        await mongoose.disconnect();
    });
    
    test('dummy exercise', async () => {
        let testPlayer = await Player.findById('han').lean();
        
        expect(testPlayer._id).toEqual('han');
        expect(testPlayer.capacity).toEqual(1);
        expect(testPlayer.items).toEqual([]);

    });
    
    xtest('item can be added if capacity is not yet exceeded', async () => {
        
    });
    
    xtest('item can not be added if nr of items equals the capacity', async () => {

    });
});