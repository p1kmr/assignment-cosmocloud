
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
        minHeight: "500px"
    },
    titleHeader: {
        width: '50%',
        display: 'flex',
        height: "80%",
        marginTop: "20px",
        border: "1px solid grey",
        borderRadius: "10px",
        padding: "20px"
    },
    innerBackground:{
        backgroundColor: "#eeeeee",
        height: "100%",
        height: '100%',
        paddingBottom: '10px',
        paddingLeft: '10px'
    },
    content:{
        display: "flex"
    }
});