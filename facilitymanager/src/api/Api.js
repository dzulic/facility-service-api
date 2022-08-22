export const REST_ROOT_ENDPOINT = "http://localhost:8081/";
export const DEFAULT_REST_PARAMS_POST = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}
export const DEFAULT_REST_PARAMS_GET = {
    method: "GET",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache': 'no-cache',
        'mode': 'no-cors'
    }
}

export const handleApiFetchGET =
    (restEndpoint) => fetch(restEndpoint, DEFAULT_REST_PARAMS_GET
    ).then(
        (response) =>
            handleServerResponse(response)
    ).then((responseJson) => {
        return responseJson;
    }).catch((error) => {
        console.error(error);
        throw error;
    });

export const handleApiFetchPOST =
    (restEndpoint, postRequest) => fetch(restEndpoint, postRequest
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
        if (response.status === 401 || response.status === 403) {
            //redirect, as it has some dellay between redirection we will continue with return
            window.location = '/';
            throw new Error("SESSION_TIMEOUT");
        } else if (response.status === 500) {
            throw new Error("ERROR_CODE_GENERIC");
        }
        return response.json();
    };

