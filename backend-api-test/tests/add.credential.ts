import * as supertest from 'supertest';
const request = supertest('http://localhost:3000');
// import {Credential} from "../../src/authentication/credential";
import {generateUUID} from "../../backend-typescript/src/uuid.generator";
//let uname = new Date().getTime() + "@shapestone.com";

let uname = "18004345749";

let credential = {
  username: uname,
  password: "This is it@1.com",
  sourceSystemName: "Michaels-MacBook-Pro.local",
  sourceSystemHost: "192.168.1.4"
};

describe("POST /credentials", function () {
  it("post request for credential to create a new one", function (done) {
    request.post('/credentials')
      .set('Content-Type', 'application/json')
      .set('correlationId', generateUUID())
      .send(credential)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        done();
      });
  });
});

