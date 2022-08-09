import 'whatwg-fetch';
import {DEFAULT_REST_PARAMS_POST, handleApiFetchGET, handleApiFetchPOST, REST_ROOT_ENDPOINT} from "./Api";

const LOGIN_USER = REST_ROOT_ENDPOINT + "/login"
const LOGOUT_USER = "/logout"

class ApiLogin {

    static login(user) {
        let request = {
            ...DEFAULT_REST_PARAMS_POST,
            body: JSON.stringify(user)
        }
        return handleApiFetchPOST(LOGIN_USER, request);
    }

    static logout() {
        return handleApiFetchGET(LOGOUT_USER, '');
    }
}

export default ApiLogin;