'use strict';

var test = require('tape');
// var request = require('http://localhost:3000');
// var app = require('../server');

var request = require('superagent');
// var should = require('should');
var agent = request.agent();
var hostPort = "http://localhost:3000";

test('Create Credential', function (t) {
  let uname = new Date().getTime() + "@shapestone.com";
  agent
    .post(hostPort + '/credentials')
    .set('Content-Type', 'application/json')
    .set('correlationId', generateUUID())
    .send({
      username: uname,
      password: "This is it@1.com",
      sourceSystemName: "Michaels-MacBook-Pro.local",
      sourceSystemHost: "192.168.1.4"
    })
    // .expect('Content-Type', 'application/json')
    // .expect(200)
    .end(function (err, res) {
      // var expectedUsers = ['John', 'Betty', 'Hal'];
      // console.log(err);
      // console.log(res);
      // should.not.exist(err);
      // res.status.should.be.equal(200);
      console.log(res.body);
      t.error(err, 'No error');
      t.same(res.body.confirmation.status, "New", 'Users as expected');
      t.end();
    });
});


function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
}
