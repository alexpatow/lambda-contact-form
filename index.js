'use strict';

console.log('Loading function');

var AWS = require('aws-sdk');
var ses = new AWS.SES({ apiVersion: '2010-12-01' });
var request = require('request');

exports.handler = (event, context, callback) => {

  console.log('event:', event);
  console.log('context', context);

  var params = {
    Destination: {
      ToAddresses: [
        process.env.EMAIL_ADDRESS
      ]
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: event.body
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Contact Form Message From: ' + event.name + ' Email: ' + event.email
      }
    },
    Source: process.env.EMAIL_ADDRESS
  };

  var done = (err, res) => {
    console.log('done:error', err);
    console.log('done:response', res);
    callback(null, {
      statusCode: err ? '400' : '200',
      body: err ? err.message : JSON.stringify(res),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  request({
    url: process.env.RECAPTCHA_ADDRESS,
    method: 'POST',
    qs: {
      secret: process.env.RECAPTCHA_SECRET,
      response: event.recaptchaToken,
    }
  }, function (error, response, _body) {
    var body = JSON.parse(_body);
    console.log('recaptcha:error', error);
    console.log('recaptcha:body', body);
    if (error || !body.success) {
      done(error, response);
      return;
    }
    ses.sendEmail(params, done);
  });
};
