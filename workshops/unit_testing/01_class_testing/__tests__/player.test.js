'use strict';

const Player = require('../player');

xtest('create a player with default initial values', async () => {
    const p = new Player();
    const description = await p.startNew();

    expect(description).toEqual('a town');
});

xdescribe('location stuff', () => {
    let testPlayer;

    beforeEach(async () => {
        testPlayer = new Player();
        await testPlayer.startNew();
    });

    test('get description and exits of the current location', () => {
        const expectedResult = {
            description: 'a town',
            exits: ['forest', 'mountain']
        };

        const result = testPlayer.getLocationInformation();

        expect(result).toEqual(expectedResult);
    });

    xtest('moving to an existing reachable location', async () => {

    });

    xtest('moving to a non-existing location', async () => {
        
    });

    xtest('moving to a non-reachable location', async () => {

    });
});
