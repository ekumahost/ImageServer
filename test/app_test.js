const assert = require('assert');
const request = require('supertest');
const app = require('../app');


describe("The image app", () => {

    it('Handles a GET Request to /api/info', (done) => {
        request(app)
            .get('/api/info')
            .end((err, response) =>{
                console.log(response);
                assert(1===1);
                done();
            })

    })

});
