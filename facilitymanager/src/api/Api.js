export const handleApiFetchGET =
    (restEndpoint) => handleApiFetch(restEndpoint, null, 'GET')

export const handleApiFetchPOST =
    (restEndpoint, body) => handleApiFetch(restEndpoint, JSON.stringify(body), 'POST')

export const handleApiFetch =
    (restEndpoint, body, method) => fetch(restEndpoint, {
            method: method, // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        }
    ).then(
        (response) =>
            handleServerResponse(response)
    ).then((responseJson) => {
        return responseJson;
    }).catch((error) => {
        console.error(error);
        throw error;
    });

const handleServerResponse =
    (response) => {
        console.log("RESPONSE", response)
        if (response.status === 401 || response.status === 403) {
            //redirect, as it has some dellay between redirection we will continue with return
        } else if (response.status === 500) {
            throw new Error("ERROR_CODE_GENERIC");
        }
            return response.json();
    };

