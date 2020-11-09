exports = module.exports = function() {
  var formidable = require("formidable");
  var app = {
    parseForm: function(request, response, next) {
      var form = new formidable.IncomingForm();
      form.parse(request, function(error, fields, files) {
        if (typeof fields !== "undefined" && fields !== null && typeof fields === "object") {
          request.fields = fields;
          next();
        } else {
          console.log("Could not parse request form.");
        }
      });
    },
    start: function() {
      const expressApp = require("express");
      const express = expressApp();
      express.post("/hook-1", [app.parseForm], function(request, response) {
        console.log(request.fields);
        response.status(200).send("ok");
      });
      const listener = express.listen(process.env.PORT, () => {
        console.log("Your app is listening on port " + listener.address().port);
      });
    }
  };
  app.start();
  return app;
};
new exports();