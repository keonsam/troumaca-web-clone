import * as supertest from 'supertest';
const request = supertest('http://localhost:3000');
import {Credential} from "../../src/authentication/credential";

let credential = new Credential();

credential.username = "keonsamuel@shapestone.com";
credential.password = "test123";

describe("POST /credentials", function () {
  it("post request for credential to create a new one", function (done) {
    request.post('/credentials')
      .send(credential)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        console.log(res);
        done
      });
  });
});

