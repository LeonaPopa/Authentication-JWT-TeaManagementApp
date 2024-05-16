// test/server.test.js
import app from "../server.js";

const chai = (await import('chai')).default;
const chaiHttp = (await import('chai-http')).default;
chai.use(chaiHttp);

import server from '../server.js'; // Make sure your server exports the app

describe('Tea API', () => {
    it('should GET all the teas', async () => {
        const res = await chai.request(server).get('/');
        res.should.have.status(200);
        res.body.should.be.a('array');
    });
});
    // Test GET tea by ID
    describe("GET /view/:id", () => {
        it("It should GET a tea by ID", (done) => {
            const teaId = 1; // Ensure this ID exists in your test DB
            chai.request(app)
                .get('/view/' + teaId)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eq(1);
                    done();
                });
        });
    });

    // Test POST new tea
    describe("POST /tea", () => {
        it("It should POST a new tea", (done) => {
            const tea = {
                name: "Green Tea",
                level: "Medium"
            };
            chai.request(app)
                .post('/tea')
                .send(tea)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('insertId');
                    done();
                });
        });
    });

    // Test PUT (update) tea
    describe("PUT /edit/:id", () => {
        it("It should PUT (update) a tea by ID", (done) => {
            const teaId = 1; // Ensure this ID exists in your test DB
            const tea = {
                name: "Updated Tea",
                level: "High"
            };
            chai.request(app)
                .put('/edit/' + teaId)
                .send(tea)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    // Test DELETE tea
    describe("DELETE /delete/:id", () => {
        it("It should DELETE a tea by ID", (done) => {
            const teaId = 1; // Ensure this ID exists in your test DB
            chai.request(app)
                .delete('/delete/' + teaId)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

describe("Review API", () => {
    // Similar tests for the Review routes
});
