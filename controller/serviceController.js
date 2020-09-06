const Service = require("../models/service");
var CryptoJS = require("crypto-js");

// Create and Save a new Service
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  var service1Info = CryptoJS.AES.decrypt(req.body.service1, "ktnttacmvl123456").toString(CryptoJS.AES.Base64);
  var service2Info = CryptoJS.AES.decrypt(req.body.service2, "ktnttacmvl").toString(CryptoJS.AES.Base64);

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