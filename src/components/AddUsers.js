import React, { useState } from 'react';
import { Button, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, withStyles } from '@material-ui/core';
import { agregarUser, deleteUser, editarUser, obtenerUser } from '../services/Services';
import { Edit, Save } from '@material-ui/icons';
import { useStylesUser } from '../styles/EstilosCss';


export default function AddUsers() {
    const [dataUser, setDataUser] = useState();
    const [modificar, setModificar] = useState();
    const [agregarNombre, setAgregarNombre] = useState();
    const [agregarApellido, setAgregarApellido] = useState();
    const [agregarDepartamento, setAgregarDepartamento] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({ id: '', nombre: '', apellido: '', departamento: '' });
    const classes = useStylesUser();


    //-------------------------------------------seleccionar id a cambiar
    const seleccionarUsuario = (item, caso) => {
        setUsuarioSeleccionado(item);
        (caso === 'Editar') && setOpenModal(true)

    }
    console.log("presiono");
    console.log(usuarioSeleccionado)


    const closeModal = () => {
        setOpenModal(false)
    }


    //----------------------------------------------agregar usuario a bd
    const agregarUsuario = () => {
        let body = {};
        let enviar = agregarNombre ? agregarNombre !== false : !true;

        body.nombre = agregarNombre;
        body.apellido = agregarApellido;
        body.departamento = agregarDepartamento;
        console.log(body)
        if (enviar) {
            agregarUser(body)
                .then(data => {
                    if (!data.data.error) {
                        //setDataUser(data.data);
                        //console.log(data.data)
                    }
                })
                .catch(error => {
                    // TO DO
                    // Lanzar mensaje de Error...
                });
                
            console.log("enviado...")
            setAgregarNombre('');
            setAgregarApellido('');
            setAgregarDepartamento('');

        } else {
            console.log("no enviado...")
        }




    }

    //--------------------------------------------listar usuario
    const userLista = () => {
        obtenerUser()
            .then(data => {
                if (!data.data.error) {
                    setDataUser(data.data);
                    //console.log(data.data)
                }
            })
            .catch(error => {
                // TO DO
                // Lanzar mensaje de Error...
            });
    }

    //------------------------------------------------change editar texto
    const edicionChange = e => {
        const { name, value } = e.target;
        setUsuarioSeleccionado((prevState) => ({
            ...prevState,
            [name]: value
        }))
        console.log(usuarioSeleccionado)
    }

    //--------------------------------------------------guardar la edicion
    const guardarEdicion = () => {
        let body = usuarioSeleccionado;
        let idUsuario = usuarioSeleccionado ? usuarioSeleccionado.id : '';

        // body.map(nombre => {
        //     if (nombre.id === usuarioSeleccionado.id) {
        //         nombre.nombre = usuarioSeleccionado.nombre;
        //         nombre.apellido = usuarioSeleccionado.apellido;
        //         nombre.departamento = usuarioSeleccionado.departamento;
        //     }
        // })
        // setDataUser(body);

        console.log("ids seleccionar...");
        console.log(idUsuario)

        editarUser(idUsuario, body)
            .then(data => {
                if (!data.data.error) {
                    setDataUser(data.data);
                    //console.log(data.data)
                }
            })
            .catch(error => {
                // TO DO
                // Lanzar mensaje de Error...
            });

        setOpenModal(false)
    }

    //--------------------------------------------eliminar Usuario Seleccionado
    const eliminarUser = () => {
        let body = usuarioSeleccionado;
        let idUsuario = usuarioSeleccionado ? usuarioSeleccionado.id : '';

        // body.map(nombre => {
        //     if (nombre.id === usuarioSeleccionado.id) {
        //         nombre.nombre = usuarioSeleccionado.nombre;
        //         nombre.apellido = usuarioSeleccionado.apellido;
        //         nombre.departamento = usuarioSeleccionado.departamento;
        //     }
        // })
        // setDataUser(body);

        console.log("ids seleccionar...");
        console.log(idUsuario)

        deleteUser(idUsuario, body)
            .then(data => {
                if (!data.data.error) {
                    setDataUser(data.data);
                    //console.log(data.data)
                }
            })
            .catch(error => {
                // TO DO
                // Lanzar mensaje de Error...
            });

        setOpenModal(false)
    }

    console.log(dataUser)


    const bodyModal = (
        <div className={classes.centrado}>
            <div className={classes.paper}>
                <Button
                    onClick={closeModal}
                >
                    Cerrar
                </Button>

                <Button
                    onClick={guardarEdicion}
                    variant="contained"
                    color="primary"
                >
                    guardar
                </Button>

                <Button
                    onClick={eliminarUser}
                    variant="contained"
                    color="secondary"
                >
                    eliminar
                </Button>
                <h2>Detalles Usuarios</h2>
                <div className={classes.listado}>
                    <TextField
                        name="id"
                        value={usuarioSeleccionado.id}
                    />

                    <TextField
                        name="nombre"
                        value={usuarioSeleccionado.nombre}
                        onChange={edicionChange}
                    />

                    <TextField
                        name="apellido"
                        value={usuarioSeleccionado.apellido}
                        onChange={edicionChange}
                    />

                    <TextField
                        name="departamento"
                        value={usuarioSeleccionado.departamento}
                        onChange={edicionChange}
                    />
                </div>
            </div>
        </div>
    );


    return (
        <div>
            {dataUser ? dataUser.map((item, index) => (
                <div key={item.id} style={{ display: 'flex' }}>
                    <Typography>{item.nombre + ' ' + item.apellido + ' ' + item.departamento}</Typography>

                    <IconButton onClick={() => seleccionarUsuario(item, 'Editar')} style={{ marginTop: -10 }}>
                        <Edit />
                    </IconButton>
                </div>
            )
            ) : ''
            }

            <Button
                variant="contained"
                onClick={userLista}
            >
                Ver usuarios
            </Button>



            <div style={{ marginTop: 30 }}></div>

            <div style={{ display: 'flex', flexDirection: 'column', width: 500 }}>
                <Typography>Agregar usuario</Typography>

                <TextField
                    value={agregarNombre}
                    onChange={e => setAgregarNombre(e.target.value)}
                />
                <TextField
                    value={agregarApellido}
                    onChange={e => setAgregarApellido(e.target.value)}
                />
                <TextField
                    value={agregarDepartamento}
                    onChange={e => setAgregarDepartamento(e.target.value)}
                />

                <Button
                    variant="contained"
                    onClick={agregarUsuario}
                >
                    Agregar
                </Button>
            </div>

            <Modal
                style={{ maxHeight: '100%', overflow: 'auto' }}
                open={openModal}
            >
                <>
                    {bodyModal ? bodyModal : '-'}
                </>
            </Modal>
        </div>
    )
}

withStyles(useStylesUser)(AddUsers);
