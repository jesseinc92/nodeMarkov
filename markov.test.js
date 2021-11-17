const markov = require('./markov');


describe('MarkovMachine model', () => {


    test('choice should return a string', () => {
        ar = ['test', 'test1', 'test2', 'test3'];

        expect(markov.MarkovMachine.choice(ar)).toEqual(expect.any(String));
    });

    test('makeText should return an object', () => {
        text = 'this is a test parameter';

        expect(new markov.MarkovMachine(text)).toEqual(expect.any(Object));
    });
});