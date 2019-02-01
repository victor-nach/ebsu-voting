import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';


const server = supertest(app);

// Test all requests concerning offices
describe('Office Server', () => {
  // Test all post requests
  describe('POST', () => {
    // specific post request
    describe('POST requests to /api/v1/offices/', () => {
      it('should create a new party', (done) => {
        server.post('api/v1/offices')
          .set('Content-Type', 'application/json')
          .send({
            type: 'legislative',
            name: 'chairman',
          })
          .end((err, res) => {
            // Expected the response object to have a status property
            expect(res.status).to.have.property('status');
            // Expected the response status to be equal to 201
            expect(res.status).to.equal('status');
            // Expected the response object to have a body property
            expect(res.status).to.have.property('body');
            // Expected the response object to have an id property
            expect(res.body.data).to.have.property('id');
            // Expected the response object to have an type property
            expect(res.body.data).to.have.property('type');
            // Expected the response object to have a name property
            expect(res.body.data).to.have.property('name');

            done();
          });
      });
      it('should return a 400 if the there are any missing fields', (done) => {
        server.post('api/v1/offices')
          .set('Content-Type', 'application/json')
          .send({
            type: 'legislative',
          })
          .end((err, res) => {
            // Expected the response object to have a status property
            expect(res.status).to.have.property('status');
            // Expected the response status to be equal to 400
            expect(res.status).to.equal('400');
            // Expected the response object to have a body property
            expect(res.status).to.have.property('body');
            // Expected the response body object to have an error property
            expect(res.body.data).to.have.property('error');

            done();
          });
      });
    }); /* end : POST requests to /api/v1/offices */
  }); /* end : all POST requests */

  // Test all GET requests
  describe('GET', () => {
    // specific GET request
    describe('GET requests to /api/v1/offices/', () => {
      it('should return all political parties');
    }); /* end : POST requests to /api/v1/offices */
    // specific GET request
    describe('GET requests to /api/v1/offices/:id', () => {
      it('should return a specific single party');
      it('should return error if id params is greater than availeble id\'s');
    }); /* end : GET requests to /api/v1/offices */
  }); /* end : all GET requests */

  // Test all PATCH requests
  describe('GET', () => {
    // specific PATCH request
    describe('PATCH requests to /api/v1/offices/', () => {
      it('should name of a party in record');
      it('should return error if id params is greater than availeble id\'s');
      it('should return error if name already exists in data structure');
    }); /* end : PATCH requests to /api/v1/offices */
  }); /* end : all PATCH requests */

  // Test all DELETE requests
  describe('DELETE', () => {
    // specific DELETE request
    describe('DELETE requests to /api/v1/offices/', () => {
      it('should succesfuly delete office');
      it('should return error if id params is greater than availeble id\'s');
    }); /* end : DELETE requests to /api/v1/offices */
  }); /* end : all DELETE requests */
}); /* end : all Office requests */
