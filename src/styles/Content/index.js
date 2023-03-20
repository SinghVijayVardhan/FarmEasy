import {styled} from '@mui/material/styles';
import {colors} from "../theme";
import { Box, Typography } from '@mui/material';

export const TextContainer = styled(Box)(()=>({
    textAlign : 'center',
    padding : "1%",
    color : colors.dark,
    fontFamily : 'cursive',
    wordWrap : 'break-word'
}))

export const TextHeading = styled(Typography)(()=>({
    color : 'black',
    textAlign:'center',
    fontFamily:'sans-serif'
}))

export const TopicImage = styled(Box)(()=>({
    justifyContent:'center',
    padding : '2%',
    overflow:'hidden',
}))