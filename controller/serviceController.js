const Service = require("../models/service");
var CryptoJS = require("crypto-js");
let fs = require('fs');

// Create and Save a new Service
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  var service1Info = CryptoJS.AES.decrypt(req.body.service1, "divItemNoClass").toString(CryptoJS.enc.Utf8);
  var service2Info = CryptoJS.AES.decrypt(req.body.service2, "divItemNoClass").toString(CryptoJS.enc.Utf8);

  const service = new Service({
    service1: service1Info,
    service2: service2Info,
    date: req.body.date
  });

  Service.create(service, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};


exports.policies = (req, res) => {
  fs.readFile('./policies.html', null, function (error, data) {
    if (error) {
      res.writeHead(404);
      res.write('Whoops! File not found!');
    } else {
      res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
      res.write(data, "utf-8");
    }
    res.end();
  });
};