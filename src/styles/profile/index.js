import { Container } from "@mui/material"
import {styled} from "@mui/material/styles"

export const OverlayBox = styled(Container)(()=>({
    zIndex : "25",
    backgroundColor : "grey",
    color:"black",
    height:"20%",
    width:"50%",
    alignItems:"center",
    textAlign:'center'
}))