import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import { colors } from "../theme";

export const GraphContainer = styled(Box)(({theme})=>({
    display :'flex',
    justifyContent :'center',
    alignItems :'center',
    flexDirections : 'column',
    [theme.breakpoints.up('md')]:{
        position : 'relative'
    }
}));

export const GraphImage = styled('img')(({src,theme})=>({
    src : `url(${src})`,
    width : '100%',
    background: colors.light_gray,
    padding:'10px',
    [theme.breakpoints.down('md')]:{
        width : '100%',
        padding : '24px'
    }
}));

export const GraphTitle = styled(Typography)(()=>({
    fontFamily : 'fantasy',
    background: colors.white,
    paddingLeft : "40%",
    justifyContent:'center',
    alignItems : 'center',
    width : '100%',
    color : 'red',
    textDecoration : 'none'
}))