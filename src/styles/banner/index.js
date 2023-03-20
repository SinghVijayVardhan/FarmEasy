import {styled} from '@mui/material/styles';
import { colors } from '../theme';
import {Box, Typography } from '@mui/material';

export const BannerContainer = styled(Box)(({theme})=>({
    display : 'flex',
    justifyContent : 'center',
    width : '100%',
    height : '100%',
    padding : '0px 0px',
    background : colors.light_gray,
    [theme.breakpoints.down('sm')] :{
        flexDirection : 'column',
        alignItems : 'center'
    },
    overflow : 'hidden'
}))

export const BannerContent = styled(Box)(()=>({
    display: 'flex',
    flexDirection : 'column',
    justifyContent : 'center',
    maxWidth : 420,
    padding : '30px'
}))

export const BannerTitle = styled(Typography)(({theme})=>({
    lineweight : 1.5,
    fontSize : '72px',
    marginBottom : '20px',
    [theme.breakpoints.down('sm')] : {
        fontSize:'30px',
    }
}))

export const BannerDescription = styled(Typography)(({theme})=>({
    lineweight : 1.5,
    letterSpacing : '1.25px',
    marginBottom : "3em",
    [theme.breakpoints.down('sm')]:{
        lineweight : 1.15,
        letterSpacing : '1.15px',
        marginBottom : '1.5em'
    }
}))

export const BannerImage = styled('img')(({src , theme})=>({
    src : 'url($src)',
    width : '100%',
    [theme.breakpoints.down('sm')] : {
        width : '100%',
        height : '100%'
    }
}))