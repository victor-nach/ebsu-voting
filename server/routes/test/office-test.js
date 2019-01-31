/**
 * Test for dummy data API endpoints
 */
import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';
import testdb from '../models/testdb';

const { expect } = chai;

const { partydb } = testdb;

const request = supertest(app);

const url = '/api/v1/parties/';

const invalidID = 50;

describe('Test case for loading application home page', () => {
  it('should load application home page', (done) => {
    request.get('/')
      .set('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body).deep.equal({
          name: 'Welcome to Politico',
          message: 'Your Vote, Your right',
        });
        if (err) done(err);
        done();
      });
  });
});
// test invalid routes
describe('Test Case For Invalid Routes', () => {
  it('Should return a message when an invalid route is accessed', (done) => {
    request
      .get('/api/v1/some-rubbish')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .expect(404)
      .end((err, res) => {
        expect(res.body).deep.equal({
          message: 'Invalid routes',
        });
        if (err) done(err);
        done();
      });
  });

  it('should fail to get route', (done) => {
    request.get('/api/v1')
      .set('Contet-Type', 'application/json')
      .expect(404)
      .end((err, res) => {
        expect(res.body).deep.equal({
          message: 'Invalid routes',
        });
        if (err) done(err);
        done();
      });
  });

  it('should return `404` page for all invalid routes', (done) => {
    request.get('/weconnect/recipes')
      .set('Content-Type', 'application/json')
      .expect(404)
      .end((err, res) => {
        expect(res.body).deep.equal({
          message: 'Invalid routes',
        });
        if (err) done(err);
        done();
      });
  });
});

describe('All test cases for POSTing a new request', () => {
  describe('Negative test cases for posting a request', () => {
    it('should return `400` status code with for undefined requests', (done) => {
      request.post(url)
        .set('Content-Type', 'application/json')
        .send({}) // request body not defined
        .expect(422)
        .end((err, res) => {
          expect(res.body.name).to.eql('name field is undefined');
          expect(res.body.email).to.eql('email field is undefined');
          expect(res.body.hqAddress).to.eql('hqAddress field is undefined');
          expect(res.body.phonenumber).to.eql('phonenumber field is undefined');
          expect(res.body.about).to.eql('about field is undefined');
          expect(res.body.logoUrl).to.eql('logoUrl field is undefined');
          expect(res.body.userId).to.eql('userId field is undefined');
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should return `400` status code with error messages for about less than 20 character', (done) => {
      request.post(url)
        .set('Content-Type', 'application/json')
        .send({
          userId: '1',
          name: 'A',
          hqAddress: '32 Epic road',
          email: 'app@yahoo.com',
          phonenumber: '08061234567',
          about: 'Th',
          logoUrl: 'app.jpg',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('about').eql('about field must be between 20 to 1000 characters');
          expect(res.body).to.have.property('name').eql('name must be between 3 to 50 characters');
          done();
        });
    });
    it('should return `400` status code with error messages if input is invalid', (done) => {
      request.post(url)
        .set('Content-Type', 'application/json')
        .send({
          userId: 'string',
          name: 'A23',
          hqAddress: '--',
          email: 'app',
          phonenumber: 'w234567',
          about: 'Th',
          logoUrl: 'app',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('userId').eql('Invalid userId');
          expect(res.body).to.have.property('hqAddress').eql('Invalid hqAddress');
          expect(res.body).to.have.property('phonenumber').eql('Invalid phonenumber');
          expect(res.body).to.have.property('logoUrl').eql('Invalid logoUrl');
          expect(res.body).to.have.property('email').eql('Invalid email');
          expect(res.body).to.have.property('name').eql('name can only be alphabetical');
          done();
        });
    });

    it('should return `400` status code with error messages if userId !== 1', (done) => {
      request.post(url)
        .set('Content-Type', 'application/json')
        .send({
          userId: '2',
          name: 'APP',
          hqAddress: '32 Epic road',
          email: 'app@yahoo.com',
          phonenumber: '8061234567',
          about: 'This is a demo party for my project',
          logoUrl: 'app.jpg',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.success).to.eql(false);
          expect(res.body.message).to.eql('You are not authorized to create parties');
          done();
        });
    });
  });

  describe('Positive test case for adding a party', () => {
    it('should return `201` status code with success messages for successfull post', (done) => {
      request.post(url)
        .set('Content-Type', 'application/json')
        .send({
          userId: '1',
          name: 'APP',
          hqAddress: '32 Epic road',
          email: 'app@yahoo.com',
          phonenumber: '8061234567',
          about: 'This is a demo party for my project',
          logoUrl: 'app.jpg',
        })
        .expect(201)
        .end((err, res) => {
          expect(res.body.success).to.eql(true);
          expect(res.body.message).to.eql('Request created successfully');
          expect(res.body.data).to.have.property('id').eql(partydb[partydb.length - 1].id);
          expect(res.body.data).to.have.property('name').eql(partydb[partydb.length - 1].name);
          expect(res.body.data).to.have.property('phonenumber').eql(partydb[partydb.length - 1].phonenumber);
          done();
        });
    });
  });
});// End of Add request test

describe('All test cases for updating a users request', () => {
  it('should return an error message for an invalid request id', (done) => {
    request.patch(`${url}${invalidID}/name`)
      .set('Content-Type', 'application/json')
      .send({ name: 'MDP' })
      .expect(404)
      .end((err, res) => {
        expect(res.body).deep.equal({
          message: `Party with id ${invalidID} does not exist`,
          success: false,
        });
        done();
      });
  });

  it('should return a `422` status code with error messages for undefined inputs', (done) => {
    request.patch(`${url}${2}/name`)
      .set('Content-Type', 'application/json')
      .send({ name: '' })
      .expect(422)
      .end((err, res) => {
        expect(res.body.name).to.eql('name field is undefined');
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('should return `400` if update data is invalid', (done) => {
    request.patch(`${url}${2}/name`)
      .set('Content-Type', 'application/json')
      .send({ name: '9' })
      .expect(400)
      .end((err, res) => {
        expect(res.body.name).to.eql('name can only be alphabetical');
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should return `200` a success message for successfull update', (done) => {
    request.patch(`${url}${2}/name`)
      .set('Content-Type', 'application/json')
      .send({ name: 'gunit' })
      .expect(200)
      .end((err, res) => {
        expect(res.body.success).to.eql(true);
        expect(res.body.message).to.eql(`Party with id ${2} successfully updated`);
        expect(res.status).to.equal(200);
        done();
      });
  });
});// Update Test end

describe('test cases to Get request for logged in user', () => {
  it('should return `200` status code with `res.body` success message', (done) => {
    request.get(`${url}`)
      .set('Content-Type', 'application/json')
      .send({})
      .expect(200)
      .end((err, res) => {
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Successfully Retrieved parties');
        done();
      });
  });

  it('Should return error single party qery with invalid id', (done) => {
    request.get(`${url}${invalidID}`)
      .set('Content-Type', 'application/json')
      .send({})
      .expect(400)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Party does not exist');
        done();
      });
  });

  it('Should return success message when valid id is entered', (done) => {
    request.get(`${url}${2}`)
      .set('Content-Type', 'application/json')
      .send({})
      .expect(200)
      .end((err, res) => {
        expect(res.body.message).to.equal('Successfully Retrieved Party');
        expect(res.body.data).to.eql(partydb[2 - 1]);
        expect(res.status).to.equal(200);
        done();
      });
  });
});


describe('Test cases for deleting request', () => {
  it('should return an error message (400) for invalid Id', (done) => {
    request.delete(`${url}${invalidID}`)
      .set('Content-Type', 'application/json')
      .send({})
      .expect(400)
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal(`Party with id ${invalidID} does not exist`);
        done();
      });
  });

  it('should return `200` status code with success message', (done) => {
    request.delete(`${url}${2}`)
      .set('Content-Type', 'application/json')
      .send({})
      .expect(200)
      .end((err, res) => {
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Party successfully deleted');
        done();
      });
  });
});