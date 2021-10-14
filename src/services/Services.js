import axios from "axios";

export const URL_MANU = 'http://192.168.2.6:8080';

//---------------------------------------------------obtener lista de usuarios
export const obtenerUser = () => {
    return new Promise((resolve, reject) => {
        axios({
            url: URL_MANU + '/usuarios',
            method: 'Get',
            headers: {
                'Content-Type': 'application/json'
            }//,
            //data: JSON.stringify(encuesta)
        })
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject('Failed al obtener la Encuesta');
            });
    });
};


//------------------------------------------------editar usuarios seleccionados
export const editarUser = (idUsuario, body) => {
    return new Promise((resolve, reject) => {
        axios({
            url: URL_MANU + `/usuarios/${idUsuario}`,
            method: 'Put',
            data: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }//,
            //data: JSON.stringify(encuesta)
        })
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject('Failed al obtener la Encuesta');
            });
    });
};


//---------------------------------------------------agregar nuevo usuarios
export const agregarUser = (body) => {
    console.log("body infoo");
    console.log(body)
    return new Promise((resolve, reject) => {
        axios({
            url: URL_MANU + '/usuarios/guardar',
            method: 'Post',
            data: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }//,
            //data: JSON.stringify(encuesta)
        })
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject('Failed al obtener la Encuesta');
            });
    });
};

//-------------------------------------------------------eliminar usuarios seleccionados
export const deleteUser = (idUsuario, body) => {
    console.log("body infoo");
    console.log(body)
    return new Promise((resolve, reject) => {
        axios({
            url: URL_MANU + `/usuarios/${idUsuario}`,
            method: 'Delete',
            data: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }//,
            //data: JSON.stringify(encuesta)
        })
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject('Failed al obtener la Encuesta');
            });
    });
};