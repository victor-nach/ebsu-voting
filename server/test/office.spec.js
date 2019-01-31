import { expect } from 'chai';
import supertest from 'supertest';
import server from '../app';

const api = supertest(server);

describe('Offices', () => {
  describe('POST / Office', () => {
    it('it should create a political party', (done) => {
      const newOffice = {
        type: 'local government',
        name: 'deputy chairman',
      };
      api.post('/api/v1/offices')
        .set('Content-Type', 'application/json')
        .send(newOffice)
        .expect(201)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          
          done();
        });
    });

    it('does another thing', () => {
    });
  });
});
