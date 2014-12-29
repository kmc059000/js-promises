(function() {
    Promise.priority = function priority(promises) {
        return new Promise(function(resolve, reject) {
            //Will resolve to the value of the first successful promise in order.
            //Ignores rejected promises unless ALL were rejected, then the returned promise will be rejected.

            var results = [];
            var resolved = false;
            //Use reference instead of value for comparison.
            var rejectionFlagValue = {};

            function tryResolveToFirstSuccess() {
                var index = -1;
                var length = results ? results.length : 0;

                if (!results || resolved) {
                    return false;
                }

                while (++index < length) {
                    var result = results[index];

                    if (result === undefined) {
                        return false;
                    }

                    if (result !== rejectionFlagValue) {
                        resolved = true;
                        resolve(result);
                        results = null;
                        return false;
                    }
                }

                reject('Could not resolve first successful promise. All promises were rejected.');
            }

            promises.forEach(function (promise, index) {
                results[index] = undefined;

                promise.then(function (result) {
                    if (!resolved) {
                        results[index] = result;
                        tryResolveToFirstSuccess();
                    }
                }, function () {
                    if (!resolved) {
                        results[index] = rejectionFlagValue;
                        tryResolveToFirstSuccess();
                    }
                });
            });
        });
    };
})();
