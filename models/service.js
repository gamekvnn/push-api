const sql = require("../db");

// constructor
const Service = function(service) {
  this.service1 = service.service1;
  this.service2 = service.service2;
  this.date = service.date;
};

Service.create = (newService, result) => {
  sql.query("INSERT INTO service SET ?", newService, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, ...newService });
    result(null, { id: res.insertId, ...newService });
  });
};

module.exports = Service;