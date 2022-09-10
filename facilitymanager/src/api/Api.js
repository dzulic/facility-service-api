const myHeaders = new Headers();
myHeaders.append("content-type", "application/json");
myHeaders.append("accept", "application/json");

export const handleApiFetchPATCH =
    (restEndpoint, body, bearerToken) => handleApiFetch(restEndpoint, JSON.stringify(body), bearerToken, 'PATCH')
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
            .then(response => {
                    const contentType = response.headers.get("content-type");
                    if (contentType && contentType.indexOf("application/json") !== -1) {
                        return response.json()
                    } else {
                        return response.text()
                    }
                }
            ).catch(error => console.log('error', error));
    }
