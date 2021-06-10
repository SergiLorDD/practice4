export default class EnhancedPromise extends Promise {
    static some(promises, count) {
        if (promises.length < count)
            return EnhancedPromise.reject(
                new Error("array of promises is smaller than count")
            );

        if (promises.length === 0) return EnhancedPromise.resolve(promises);

        return new EnhancedPromise((resolve, reject) => {
            const arrResolvePromises = [];
            const arrRejectPromises = [];
            for (const promise of promises) {
                try {
                    promise
                        .then((response) => {
                            arrResolvePromises.push(response);
                            if (arrResolvePromises.length === count) {
                                resolve(arrResolvePromises);
                            }
                        })
                        .catch((error) => {
                            arrRejectPromises.push(error);
                            if (
                                promises.length - arrRejectPromises.length <
                                count
                            )
                                reject(new Error("completed with an error"));
                        });
                } catch (error) {
                    reject(new Error("the value is not a promise"));
                }
            }
        });
    }
}
