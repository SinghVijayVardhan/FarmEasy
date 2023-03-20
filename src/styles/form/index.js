import { colors } from '../../styles/theme';
import { styled } from '@mui/material/styles';
import { Grid, Container, Typography, TextField, Button, Alert } from '@mui/material';
import '@fontsource/montez';

export const FormContainer = styled(Grid)(({ theme }) => ({
    boxShadow: "10px 10px 20px",
    justifyContent: "center",
    margin: "20px 4px 10px 4px",
    padding: "10px",
    border: "5px 5px 5px 5px grey",
    [theme.breakpoints.down('xs')]: {
        padding: '10px',
        margin: "10px 2px 5px 2px",
        width: '100%'
    },
    backgroundColor: colors.white,
}))

export const FormBox = styled(Container)(({theme}) =>({
    width: '50%',
    height: '50%',
    justifyContent: "center",
    marginTop: "10%",
    [theme.breakpoints.down('xs')]:{
        width : '100%',
        height:'100%'
    },
}))

export const Formtitle = styled(Typography)(({
    textAlign: 'center',
    fontSize: '25px',
    fontFamily: 'monospace'
}))

export const Formheading = styled(Typography)(({
    fontFamily: '"cursive","montez"',
    textAlign: "center",
    fontSize: "80px",
    color: colors.primary
}))

export const FormInput = styled(TextField)(({
    justifyContent: "center",
    alignItems: "center",
    padding: "5%",
    width: "90",
    height: "10",
}))

export const FormGroup = styled(Grid)({
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    display: "flex",
})

export const FormLink = styled(Button)({
    color: colors.inverse,
    textDecoration: 'none',
    padding: '20px',
    fontStyle: 'bold',
    fontSize: '15px',
})

export const StyledButton = styled(Button)({
    backgroundColor: 'brown',
    '&:hover': {
        backgroundColor: 'green'
    }
})

export const FormError = styled(Alert)(({value})=>({
    fontSize:'2px',
    color:colors.danger,
    alignItems:'center',
    alignText:'center',
    severity : "error",
}))