import { authHeader, apiErp } from '../helpers'

export const crudService = {
    getAll,  
    getAllOption,  
    getId,
    registrar,    
    actualizar,
    search,
    getLista,
    getListas,
    getExcel,
    upload,
    searchItems,
    searchAll,
    searchAlli,
    registrarItems,
    verificar,
    delete: _delete
}


function getAll(page,playload) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiErp}/${playload}/list/${page}`, requestOptions).then(handleResponse);
}

function getAllOption(page,playload,userId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiErp}/${playload}/list/${page}/user/${userId}`, requestOptions).then(handleResponse);
}

function getLista(playload) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiErp}/${playload}/lista`, requestOptions).then(handleResponse);
}

function getListas(playload) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiErp}/${playload}/lista/items`, requestOptions).then(handleResponse);
}

function search(dato,playload) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(dato)
    };
    return fetch(`${apiErp}/${playload}/search/`, requestOptions).then(handleResponse);
}

function getExcel(dato,playload) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(dato)
    };
    return fetch(`${apiErp}/${playload}/exel/`, requestOptions).then(handleResponse);
}

function getId(id,playload) {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };
    return fetch(`${apiErp}/${playload}/${id}`, requestOptions).then(handleResponse);
}

function registrar(data,playload) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch(`${apiErp}/${playload}`, requestOptions).then(handleResponse);
}

function actualizar(data,playload) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    return fetch(`${apiErp}/${playload}/${data.id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
               // logout();
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id,playload) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${apiErp}/${playload}/${id}`, requestOptions).then(handleResponse);
}

function upload(data,playload) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader()},         
        body: data
    };            
    return fetch(`${apiErp}/upload/${playload}`, requestOptions).then(handleResponse);    
}

function searchItems(dato,playload) {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },        
    };
    return fetch(`${apiErp}/${playload}/searchItems/${dato}`, requestOptions).then(handleResponse);
}


function registrarItems(data,playload) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    return fetch(`${apiErp}/${playload}`, requestOptions).then(handleResponse);
}

function verificar(playload,userId) {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };
    return fetch(`${apiErp}/${playload}/1/user/${userId}`, requestOptions).then(handleResponse);
}


function searchAll(tag,pagina,playload) {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },        
    };
    return fetch(`${apiErp}/${playload}/searchall/${pagina}/tag/${tag}`, requestOptions).then(handleResponse);
}

function searchAlli(tag,pagina,playload) {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },        
    };
    return fetch(`${apiErp}/${playload}/searchalli/${pagina}/tag/${tag}`, requestOptions).then(handleResponse);
}