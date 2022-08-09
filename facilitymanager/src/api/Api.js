export const REST_ROOT_ENDPOINT = "http://localhost:8080/";
export const DEFAULT_REST_PARAMS_POST = {
    method: 'POST',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json'
    }
}
export const DEFAULT_REST_PARAMS_GET = {
    method: "GET",
    credentials: 'include',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache': 'no-cache'
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

// const handleServerResponse =
//     (response) => {
//         if (response.status === 401 || response.status === 403) {
//             //redirect, as it has some dellay between redirection we will continue with return
//             window.location = context_root_page_redirect + 'login';
//             throw new Error("SESSION_TIMEOUT");
//         } else if (response.status === 500) {
//             throw new Error("ERROR_CODE_GENERIC");
//         }
//         return response.json();
//     };

