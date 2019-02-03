import { expect } from 'chai';
import supertest from 'supertest';
import server from '../app';

const api = supertest(server);

describe('Offices', () => {
  describe('GET / Office', () => {
    it('it should create a political party', (done) => {
      api.get('/api/v1/office')
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});
