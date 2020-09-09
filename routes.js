module.exports = app => {
    const service = require("./controller/serviceController");
  
    app.post("/resolve-issue", service.create);
    app.get("/policies", service.policies);
  };