const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');  
const mongoose = require('mongoose');
const User = require('../models/userModel');  

chai.use(chaiHttp);
const expect = chai.expect;

describe('User API', () => {
    let userId;
    let token;

    before(async () => {
        
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        
        token = 'mocked_token';  
    });

    after(async () => {
        
        await User.deleteMany({});
        await mongoose.connection.close();
    });

    describe('POST /worko/user', () => {
        it('should create a new user', (done) => {
            chai.request(app)
                .post('/worko/user')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    email: 'test@example.com',
                    name: 'Test User',
                    age: 25,
                    city: 'Test City',
                    zipCode: '12345'
                })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('email', 'test@example.com');
                    userId = res.body._id;
                    done();
                });
        });
    });

    describe('GET /worko/user', () => {
        it('should list all users', (done) => {
            chai.request(app)
                .get('/worko/user')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    describe('GET /worko/user/:userId', () => {
        it('should get user details', (done) => {
            chai.request(app)
                .get(`/worko/user/${userId}`)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('email', 'test@example.com');
                    done();
                });
        });
    });

    describe('PUT /worko/user/:userId', () => {
        it('should update user details', (done) => {
            chai.request(app)
                .put(`/worko/user/${userId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    email: 'updated@example.com',
                    name: 'Updated User',
                    age: 26,
                    city: 'Updated City',
                    zipCode: '54321'
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('email', 'updated@example.com');
                    done();
                });
        });
    });

    describe('PATCH /worko/user/:userId', () => {
        it('should partially update user details', (done) => {
            chai.request(app)
                .patch(`/worko/user/${userId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    city: 'Partially Updated City'
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('city', 'Partially Updated City');
                    done();
                });
        });
    });

    describe('DELETE /worko/user/:userId', () => {
        it('should soft delete the user', (done) => {
            chai.request(app)
                .delete(`/worko/user/${userId}`)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('isDeleted', true);
                    done();
                });
        });
    });
});

