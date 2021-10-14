import { makeStyles } from "@material-ui/core";

export const useStylesUser = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 700,
        //marginLeft: '32%',
        marginTop: 180,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    centrado: {
        display: 'flex',
        justifyContent: 'center'
    },
    listado: {
        display: 'flex',
        flexDirection: 'column',
        width: 500
    }
}));