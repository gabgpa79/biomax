import { apiErp } from '../helpers'

export const usuarioService = {
    login,
    logout
}
function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${apiErp}/user/login`, requestOptions)
        .then(handleResponse)
        .then(response => {
            // store usuario details and jwt token in local storage to keep usuario logged in between page refreshes
            localStorage.setItem('user',JSON.stringify(response.user));
            localStorage.setItem('token',JSON.stringify(response.token));
            return response.user;
        })        

}

function logout() {
    // remove usuario from local storage to log usuario out
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                //location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}