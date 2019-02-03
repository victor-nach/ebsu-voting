import chai from 'chai';
// import supertest from 'supertest';
import chaiHttp from 'chai-http';
import server from '../app';

const { expect } = chai;
chai.use(chaiHttp);


// const api = supertest(server);
const api = chai.request(server);

describe('Offices', () => {
  describe('GET / Office', () => {
    it('it should create a political party', (done) => {
      api.get('/api/v1/office')
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});
