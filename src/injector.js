'use strict';
var Injector = (function() {

    /**
    *    extract the arguments from a given function
    *    @param func {Function} - the given function
    *    @return {Array} - array of arguments
    */
    var getArguments = function(func) {
        if (!func || typeof func !== 'function' ) {
            return;
        }
        
        //This regex is from require.js
        var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
        var args = func
            .toString()
            .match(FN_ARGS)[1]
            .split(',');
        args = args.map(function(item) {
            return String(item).trim();
        }); 
        return args;
    };

    
    /**
    *    get the dependencies by 
    *    @param dependencyIdentifers {Array} - Array of dependency identifer. These will be identified by name
    *    @param dependencies {Object} - 
    */
    var resolveDependencies= function(dependencyIdentifers, dependencies) {
        if (!dependencyIdentifers || !Array.isArray(dependencyIdentifers)) {
            return;
        }
        dependencies = dependencies || {};
        var resolveDeps = dependencyIdentifers.map(function(name) {
            return dependencies[name];
        });
        return resolveDeps;
    };

    /**
    *    add a dependency to the list of dependencies
    *    @param name {String} - name/identifer of the dependency
    *    @param functionality {Object} - the functionality, which should be injected
    *    @param dependencies {Object} - the list of dependencies from the {Injector}
    *    @return {Object} - list of dependencies
    */
    var addDependency = function(name, functionality, dependencies) {
        if (typeof name !== 'string') {
            console.warn('Could not add a dependency, identifer is not a string');
            return;
        }
        dependencies = dependencies || {};
        dependencies[name] = functionality;
        return dependencies;
    };


    /**
    *    delete a dependency
    *    @param name {String} - name/identifer of the dependency
    *    @param dependencies {Object} - the list of dependencies from the {Injector}
    *    @return {Object} - list of dependencies
    */
    var deleteDependency = function(name, dependencies) {
        if (typeof name !== 'string') {
            console.warn('Could not delete the dependency, identifer is not a string');
            return;
        }
        if (dependencies[name] || dependencies.hasOwnProperty(name)) {
            delete(dependencies[name]);
        }
        return dependencies;
    };


    /**
    * These is the main method to inject dependencies
    * 
    *
    * getDependencyInformation( function($dep1,$dep2, ...) { ... } );
    * getDependencyInformation( [ '$dep1','$dep2', ...], function($dep1,$dep2, ...) { ... } );
    *
    */
    var getDependencyInformation = function(dependencyIdentifer, func) {
        if ( 0 === arguments.length ) {
            // nothing to handle, done
            return;
        }

        if (typeof dependencyIdentifer === 'function') {
            
            func = dependencyIdentifer;
            dependencyIdentifer = getArguments(func);

        } else if ( false === (Array.isArray(dependencyIdentifer) && typeof func === 'function') ) {
            
            console.warn('Could not handle parameter, while injection.');
            return;

        }

        return [dependencyIdentifer, func];
    };


    /**
    *
    */
    var injectDependencies = function(identifer, func, dependencies) {
        var resolvedDependencies = resolveDependencies(identifer, dependencies);
        return func.apply(func, resolvedDependencies);
    };

    /**
    *
    */
    function Injector() {
        if (!(this instanceof Injector)) {
            return new Injector();
        }

        var dependencies = {};


        /**
        *    add a new dependency
        *    @param name {String} - name of the dependency
        *    @param functionality {Object} - the functionality which will be injected
        */
        this.addDependency = this.add = function(name, functionality) {
            addDependency(name, functionality, dependencies);
            return this;
        };


        /**
        *    add all keys of an object to the dependencies
        *    @param dependencyObject {Object} - object with dependencies
        */
        this.addAll = function(dependencyObject) {
            dependencyObject = dependencyObject || {};
            for (var key in dependencyObject) {
                if (!dependencyObject.hasOwnProperty(key) ) {
                    continue;
                }
                addDependency(key, dependencyObject[key], dependencies);
            }
            return this;
        };


        /**
        *    replace the dependencies by a given object
        *    @param dependencyObject {Object} - object that will replace dependencies
        */
        this.setDependencies = this.set = function(dependencyObject) {
            dependencies = dependencyObject;
            return this;
        };


        /**
        *    removes a dependency
        *    @param name {String} - name of the dependency
        */
        this.deleteDependency = this.del = function(name) {
            deleteDependency(name, dependencies);
            return this;
        };


        /**
        *    Allowes us to inject a function directly. 
        *    It is possible to define the dependencies as parameter names in the function.
        *    Then you only have to send the function as a parameter.
        *    But this could be a problem, if you minimize your code.
        *    @param identifer {Array} - A list of identifer for the function
        *    @param func {Function} - the function, which should call
        *    @return the result of the function 
        */
        this.inject = function() {
            var dependInformation = getDependencyInformation.apply(null,arguments);
            if (dependInformation) {
                dependInformation.push(dependencies);
                return injectDependencies.apply(null, dependInformation);
            } else {
                if (typeof arguments[0]=== 'function') {
                    return arguments[0].call(arguments[0]);
                }
            }
        };
   
    }

    return Injector;
})();

if (typeof module !== 'undefined' && module !== null) {
    module.exports = Injector;
} else {
    this.Injector = Injector;
}


//by http://stackoverflow.com/questions/20058391/javascript-dependency-injection