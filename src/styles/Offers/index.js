import {styled} from "@mui/material/styles";
import {Box, Typography} from '@mui/material';
import { colors } from "../theme";
import '@fontsource/montez';

export const OfferConatiner = styled(Box)(({theme})=>({
    [theme.breakpoints.down('sm')] : {
        padding : "10px 0px 10px 0px"
    },
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center',
    padding : '20px 0px 20px 0px',
    background: colors.secondary,
    overflow : 'hidden'
}))

export const MessageText = styled(Typography)(({theme})=>({
    fontFamily : '"Montez","cursive"',
    [theme.breakpoints.down('sm')] : {
        fontSize : '1rem'
    },
    color : colors.white,
    fontSize : '2rem'
}))