import { getJSON } from "./task-1.js";

export default function getSeries(url1, url2) {
    return getJSON(url1)
        .catch((error) => {throw Error("First fetch failed")})
        .then((data) =>
            getJSON(url2)
                .then((data2) => [data, data2])
                .catch((error) => {throw Error("Second fetch failed")})
        )
        .catch((error) => {throw error});
}
