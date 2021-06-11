import { getJSON } from "./task-1.js";

export default function getSequential(urls) {
    let counter = 0;

    const promise = () =>
        new Promise((resolve, reject) => {
            getJSON(urls[counter])
                .then((response) => {
                    counter++;
                    if (counter < urls.length)
                        promise()
                            .then((response2) => resolve([response, response2]))
                            .catch((error) =>
                                reject(
                                    new Error(
                                        `failed to fetch ${urls[counter]}`
                                    )
                                )
                            );
                    else resolve([response]);
                })
                .catch((error) => {
                    reject(new Error(`failed to fetch ${urls[counter]}`));
                });
        });

    return new Promise((resolve, reject) => {
        promise()
            .then((response) => resolve(response.flat(counter)))
            .catch((error) => reject(error));
    });
}
