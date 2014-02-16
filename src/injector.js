var Injector = (function() {

  function getArguments(func) {
  //This regex is from require.js
  var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
  var args = func.toString().match(FN_ARGS)[1].split(',');
  return args;
}

function extend(destination, source) {
  for (var property in source) {
    destination[property] = source[property];
  }
  return destination;
}

function Injector(obj) {
  if (!(this instanceof Injector))
    return new Injector(obj);
  var dependencies = { };
  var obj = obj || { };

  function resolveDependencies(deps) {
    /*if (!Array.isArray(deps))
      throw new Error("Requires an array");*/
    var resolveDeps = [];
    deps.forEach( function(name) {
      resolveDeps.push( dependencies[name] );
    } );
    return resolveDeps;
  }
 /**
  * add an dependency
  * @param name name of the dependency
  * @param obj the dependency
  */
  function add(name, obj) {
    if (typeof name != "string")
      throw new Error("First parameter must be a string.");
    dependencies[name] = obj;
    return this;
  }
 /**
  * delete a dependency
  */
  function del(name) {
    if (typeof name != "string")
      throw new Error("First parameter must be a string.");
    if (dependencies[name])
      delete(dependencies[name]);
      //dependencies[name] = undefined;
    return this;
  }

 /**
  * They are three ways to call this function. 
  *
  * callWithDependencies( function($dep1,$dep2, ...) { ... } );
  * 
  * callWithDependencies( [ '$dep1','$dep2', ...], function($dep1,$dep2, ...) { ... } );
  *
  * callWithDependencies( [ '$dep1','$dep2', ..., function($dep1,$dep2, ...) { ... } ] ); 
  *
  * @return this
  */
  function callWithDependencies( ) {
    if ( 0 === arguments.length )
      return this;
    var deps = [];
    var func;
    if ( "function" == typeof arguments[0] ) {

      // getting arguments of the function
      deps = getArguments( arguments[0] );
      func = arguments[0];

    } else if ( Array.isArray( arguments[0] ) && arguments[1] && "function" == typeof arguments[1] ) {

      deps = arguments[0];
      func = arguments[1];

    } else if ( Array.isArray( arguments[0] ) && "function" == typeof arguments[0][arguments[0].length-1] ) {
      func = arguments[0][arguments[0].length-1];
      arguments[0].pop();
      deps = arguments[0];

    }

    // no given function
    if (!func)
      return this;

    deps = resolveDependencies(deps);

    func.apply(obj,deps);
    return this;

  }

  var ex = {
    add : add,
    del : del,
    callWithDependencies: callWithDependencies
  };

  extend(this,ex);

  return this;
}

//Injector.prototype.constructor = new Injector();

return Injector;
})();

window.Injector = Injector;

//by http://stackoverflow.com/questions/20058391/javascript-dependency-injection