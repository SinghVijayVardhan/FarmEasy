import { colors } from '../theme';
import {styled} from '@mui/material/styles';
import { Box,Typography,List } from '@mui/material';
import '@fontsource/montez' 

export const AppbarContainer = styled(Box)(()=>(
    {
        display:'flex',
        marginTop: 4,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2px 8px'
    }
));

export const AppbarHeader = styled(Typography)(()=>({
    padding: '4px',
    flexGrow : 1,
    fontSize : '3em',
    fontFamily: '"Montez" , "Cursive"',
    color: colors.secondary,
}))

export const Applist = styled(List)(()=>({
    display: 'flex',
    flexGrow: 4,
    justifyContent : 'center',
    alignItems: 'center'
}))

export const AppbarIcons = styled(List)(()=>({
    flexGrow : 0
}))