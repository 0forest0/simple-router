# Router 2
A simple NodeJS server routing system.

* * *

This is a very simple routing system for your NodeJS _RESTy_ apps, tested
mainly with the **http** module.

**Important Note**: As of version 2, there's almost no backwards compatibility
with versions prior to it (Last was 1.3.0), so if you don't want to upgrade your
project, better force version 1.3.0! Also the functionality of `.also` has been
dropped for now.

# Basic usage
## Chaining method

You can include a router instance globally like:
```JS
global.Router = require('Router');
```

Then, you can define few routes in lately included files, or in the same file:
```JS
//You could specify a raw regex, but you will have to specify the anchor characters!
Router.when("/home", (req, res, m) => {
  res.end("Hey! You're in '/home'!");
})
//You can specify the method to match, so if you specify this route but the method does not match, it will be ignored.
.when("/putSomething/(.+)", ['PUT'], (req, res, m) => {
  res.end(`Hehe, we're going to put ${m[1]}`);
})
//Final is now ".finally()" but .final is maintained as sugar syntax for finally.
.finally((req, res) => {
  res.writeHead(404, {'Content-Type': 'plain/text'});
  res.end("Sorry, nothing found :(");
});
```
If you want to pass a raw _RegExp_ you can, like: `Router.when(/^\/home$/, ...)`

Note the `^` and `$`, they are automatically added when you pass a string, but
in regex you have to define them explicitly.

## Hooking method

Want to use classes? No problem, use hooks! `Router.$()`
```JS
class Actrl {

  static aRoute(req, m) {
    return "Hehe, a route!";
  }

}
Router.$("/home", Actrl.aRoute);
```
Easy huh? Remember that `$` is a syntactic sugar for `Router.hook`.

You can use **non-static** methods also:
```JS
class A {
  constructor(prop){
    this.prop = prop;
    Router.$("/lol", this.lol);
  }
  lol(req, m){
    return `Here your controller instance holds ${this.prop} property!`;
  }
}
let a = new A(); //...
```

If you return a string, the default header is sent
`{'Content-Type': 'plain/text'}` and the code is `200`.

You can change this returning an object:
```JS
{
  code: 200,
  head: {
    {'Content-Type': 'text/html'}
  },
  data: `Hey! <b>Bold</b> stoopid html <i>haha</i>`
}
```
All fields are optional. If you return an object with only data and this data
is an object, the server will respond a **200** code with **application/json**
content type and the object will be stringified:
```JS
{data: {
  "a": "json",
  "is": [
    "cool",
    "very cool"
  ]
}}
```

With the `Es7` spec there will be included the function decorators that use a
similar syntax to java's annotations `@someDec(asdasd)` but untill now you will have
to stick to `Router.$`.

For more examples, see _/examples_ folder.
