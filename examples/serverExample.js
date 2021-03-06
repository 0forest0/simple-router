'use strict'
/*
 * This is a full example of how to use router with an http server.
 * However, if this is attempted to run standalone will fail to find the
 * 'Router' package.
 */

const Router = require('Router');
const http = require('http');
const fs = require('fs');

//Test controller.
class Ctrl {

  static hooked(req, match){
    return {
      data: {"msg": "May I return a JSON?"}
    };
  }

}
Router.$("/json", Ctrl.hooked);

//Test chaining.
Router.when("/test", (req, res, match) => {
  res.end("Indeed");
}).finally((req, res) => {
  res.end("Here may not be what you're looking for.");
});

//Simple listening
http.createServer(Router.listen).listen(80);
