const myHeaders = new Headers();
myHeaders.append("content-type", "application/json");
myHeaders.append("accept", "application/json");

export const handleApiFetchGET =
    (restEndpoint, bearerToken) => handleApiFetch(restEndpoint, null, bearerToken, 'GET')
export const handleApiFetchPATCH =
    (restEndpoint, body, bearerToken) => handleApiFetch(restEndpoint, JSON.stringify(body), bearerToken, 'PATCH')
export const handleApiFetchPOST =
    (restEndpoint, body, bearerToken) => handleApiFetch(restEndpoint, JSON.stringify(body), bearerToken, 'POST')

export const handleApiFetch =
    (restEndpoint, body, bearerToken, method) => {
        if (!myHeaders.has("Authorization")) {
            myHeaders.append("Authorization", `Bearer ${bearerToken}`)
        }
        return fetch(restEndpoint, {
            method: method, // *GET, POST, PUT, DELETE, etc.
            headers: myHeaders,
            body: body
        })
            .then(result => console.log(result))
            .then(response => response)
            .catch(error => console.log('error', error));
    }
