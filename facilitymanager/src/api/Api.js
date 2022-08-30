const myHeaders = new Headers();
myHeaders.append("content-type", "application/json");
myHeaders.append("accept", "application/json");

export const handleApiFetchGET =
    (restEndpoint) => handleApiFetch(restEndpoint, null, 'GET')
export const handleApiFetchPATCH =
    (restEndpoint, body, customHeader) => handleApiFetch(restEndpoint, JSON.stringify(body), 'PATCH', customHeader)
export const handleApiFetchPOST =
    (restEndpoint, body) => handleApiFetch(restEndpoint, JSON.stringify(body), 'POST')

export const handleApiFetch =
    (restEndpoint, body, method, customHeader) => {
        fetch(restEndpoint, {
            method: method, // *GET, POST, PUT, DELETE, etc.
            headers: customHeader || myHeaders,
            body: body
        })
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
