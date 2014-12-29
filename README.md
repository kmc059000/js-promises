js-promises
===========

helpers for promise libraries

Promise.priority()

````
var wait = function(amt, err) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      if(err) {
        reject(err);
      }
      else {
        resolve(amt);
      }
    }, amt);
  };
};

var print = function(val) {
  console.log(val);
};

Promise.priority([wait(2), wait(1)]).then(print); //2 after 2ms
Promise.priority([wait(2, 'Error2'), wait(1)]).then(print); //1 after 2ms
Promise.priority([wait(2, 'Error2'), wait(1, 'Error1')]).then(print); //Error after 2ms
Promise.priority([wait(1), wait(1000)]).then(print); //1 after 1ms
Promise.priority([wait(1), wait(2, 'Error2')]).then(print); //1 after 1ms
Promise.priority([wait(2), wait(1, 'Error1')]).then(print); //2 after 2ms

````
