import axios from 'axios';

import * as actionTypes from './actionTypes';
import { API_KEY } from '../../APIKEYS';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 100);
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        };
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
        if (!isSignup) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeOut(response.data.expireIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
        // Auth google
        // https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=[API_KEY]
        // curl 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=[API_KEY]' \
        // -H 'Content-Type: application/json' \
        // --data-binary '{"postBody":"id_token=[GOOGLE_ID_TOKEN]&providerId=[google.com]","requestUri":"[http://localhost]","returnIdpCredential":true,"returnSecureToken":true}'
    };
};