import { getJSON } from "./task-1.js";

export default function getSequential(urls) {
    let counter = 0
    function requestByUrl(url) {
        return getJSON(url).then(response => {
            counter++
            if(counter < urls.length) {
                const response2 = requestByUrl(url)
            }
            let result = [response]
            if(Array.isArray(response2)) result.push(...response2)
            else result.push(response2)
            return result
        }).catch(error => new Error(`failed to fetch ${url}`))
    }

    return requestByUrl(urls[counter]);
}
