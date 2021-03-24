var request = require('supertest');
var chai = require('chai')
var expect = chai.expect;
chai.use(require('chai-http'));

const app = require('./server');


describe('Test 1: 2 apples and 1 orange then get total', function () {

    it('Should return "added successfully"', function (done) {
        request(app)
            .put('/add')
            .send({ "name": "Apple", "price": "4.95", "quantity": "2", "newcart": "yes" })
            .expect("added successfully")
            .end(done);
    });
    it('Should return "added successfully"', function (done) {
        request(app)
            .put('/add')
            .send({ "name": "Orange", "price": "3.99", "quantity": "1" })
            .expect("added successfully")
            .end(done);
    });
    it('Should return correct total=$13.89', function (done) {
        request(app)
            .get('/total')
            .expect("The total is: 13.89")
            .end(done);
    });
});

describe('Test 2: 3 apples and remove 1 apple then get total', function () {

    it('Should return "added successfully"', function (done) {
        request(app)
            .put('/add')
            .send({ "name": "Apple", "price": "4.95", "quantity": "3", "newcart": "yes" })
            .expect("added successfully")
            .end(done);
    });
    it('Should return "item removed"', function (done) {
        request(app)
            .put('/remove')
            .send({ "name": "Apple", "quantity": "1" })
            .expect("item removed")
            .end(done);
    });
    it('Should return correct total=$9.9', function (done) {
        request(app)
            .get('/total')
            .expect("The total is: 9.9")
            .end(done);
    });
})
