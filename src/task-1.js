
// Change us!


function status(response) {
    const {status, statusText} = response
    if(status < 200 || status > 299) throw new Error(statusText) 
    return response;
}

function json(response) {
    return response.json()
}

function getJSON(url) {
    return window.fetch(url)
        .then(response => status(response))
        .then(response => json(response))
}


export { status, json, getJSON };
