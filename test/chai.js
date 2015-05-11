var Injector = Injector || require && require('../src/injector');
if (!assert) {
    chai = require('chai');
    var assert = chai.assert;
}

describe('Test',function() {
    var injector;
    before(function() {
        injector = new Injector();
    });
    it('should be an Injector', function() {
        assert.ok(injector);
        assert.isObject(injector);
        assert.instanceOf(injector, Injector);
    });

    it('call it as a function should be an Injector', function() {
        assert.ok(Injector());
        assert.isObject(Injector());
        assert.instanceOf(Injector(), Injector);
    });

    it('should have a set of function', function() {
        assert.ok(injector.add);
        assert.isFunction(injector.add);
        assert.ok(injector.del);
        assert.isFunction(injector.del);
        assert.ok(injector.inject);
        assert.isFunction(injector.inject);
    });

    describe('Injector.add', function() {

        it('should add functionality with name', function() {
            var result = injector.add('name','I am a test!');
            assert.ok(result);
            assert.strictEqual(injector,result);
        });

        it('should add nothing, but also should not break', function() {
            var result = injector.add();
            assert.ok(result);
            assert.strictEqual(injector,result);

        });

        it('should add a dependency with undefined', function() {
            result = injector.add('depWithoutArgument');
            assert.ok(result);
            assert.strictEqual(injector,result);
        });

    });

    describe('Injector.inject', function(){
        it('should inject correctly', function() {
            // test via inject
            var run = false;
            injector.inject(function(name, depWithoutArgument) {
                assert.ok(name);
                assert.equal(name, 'I am a test!');
                assert.isUndefined(depWithoutArgument);
                run = true;
            });
            assert.equal(run, true);

            run = false;
            injector.inject(['name', 'depWithoutArgument'], function(name, depWithoutArgument) {
                assert.ok(name);
                assert.equal(name, 'I am a test!');
                assert.isUndefined(depWithoutArgument);
                run = true;
            });
            assert.equal(run, true);

        });
    });

    describe('Injector.del', function() {
        it('should delete name, so undefined', function() {

            injector.del('name');
            var run = false;
            injector.inject(['name'], function(n) {
                assert.isUndefined(n);
                run = true;
            });
            assert.equal(run, true);
        });
    });
});