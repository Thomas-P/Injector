(function() {
  var testObject;
  var testInjector;
  // test of injector.js
  module('injector.js', {
    setup: function() {
      function testObj() {
        this.testMessage = 'this is a test object';
      }
      testObject = new testObj();
      testInjector = new Injector(testObject);
      testInjector.add('$test', { testMessage : 'a new injection' });
    },
    teardown: function() {
      // clean up after each test
    }
  });

  test('Injector()', function() {
    ok(Injector() instanceof Injector,'Injector() must be an instance of Injector');
  });

  test('Injector.add(name, obj)', function() {
    
    throws( function() {
      testInjector.add(null,null);
    }, 'throws an error, that the first argument must be a string' );
    
    strictEqual(testInjector,testInjector.add('$test',{ test : 'a new injection' }),'Injector.add must be return themselve.');
  
  });

  test('Injector.del(name)', function() {

    throws( function() {
      testInjector.del();
    }, 'throws an error, that the first argument must be a string' );

    strictEqual(testInjector,testInjector.del('$foo'),'Injector.del must be return themselve.');

    testInjector.add('$foo',{ '' : '' }).del('$foo');

  });

  test('Injector.callWithDependencies()', function() {
    // function($test,$foo)
    var tmp1,tmp2,tmp3;
    var tmp = testInjector.callWithDependencies(function($test,$foo) {
      notEqual($test, undefined,'$test must be not null.');
      equal($test.testMessage,'a new injection','test if $test is added.');
      equal($foo, undefined,'$foo was deleted and must be null.');
      equal(this.testMessage, 'this is a test object', 'Could we find our teststring?');
      equal(this, testObject,'this must be our testObject');
      tmp1 =true;
    });
    equal(tmp,testInjector,'callWithDependencies must be return the Injector.');

    tmp = testInjector.callWithDependencies(['$test','$foo',function($test,$foo) {
      notEqual($test, undefined,'$test must be not null.');
      equal($test.testMessage,'a new injection','test if $test is added.');
      equal($foo, undefined,'$foo was deleted and must be null.');
      equal(this.testMessage, 'this is a test object', 'Could we find our teststring?');
      equal(this, testObject,'this must be our testObject');
      tmp2 =true;
    }]);
    equal(tmp,testInjector,'callWithDependencies must be return the Injector.');

    tmp = testInjector.callWithDependencies(['$test','$foo'],function($test,$foo) {
      notEqual($test, undefined,'$test must be not null.');
      equal($test.testMessage,'a new injection','test if $test is added.');
      equal($foo, undefined,'$foo was deleted and must be null.');
      equal(this.testMessage, 'this is a test object', 'Could we find our teststring?');
      equal(this, testObject,'this must be our testObject');
      tmp3 =true;
    });
    equal(tmp,testInjector,'callWithDependencies must be return the Injector.');

    equal(tmp1,true,'First function would be called.');
    equal(tmp2,true,'Second function would be called.');
    equal(tmp3,true,'Third function would be called.');

    equal(testInjector,testInjector.callWithDependencies(),'callWithDependencies must be return the Injector.');

    equal(testInjector,testInjector.callWithDependencies(1,2,3),'callWithDependencies width nonsense must be return the Injector.');

    equal(testInjector,testInjector.callWithDependencies([]),'callWithDependencies width nonsense must be return the Injector.');


  });

})();