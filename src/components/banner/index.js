import { BannerContainer,BannerContent,BannerTitle,BannerDescription,BannerImage } from "../../styles/banner";
import {useTheme} from "@mui/material/styles";
import { Typography } from "@mui/material";
import React from "react";

export default function Banner(){
    const theme = useTheme();
    return (
        <BannerContainer theme = {theme}>
            <BannerImage src="images/banner/crop.jpg" theme={theme}/>
           <BannerContent>
                <Typography variant = "h6">One Stop For Agriculture Products</Typography>
                <BannerTitle theme={theme}>Expand Your Business</BannerTitle>
                <BannerDescription variant="subtitle" theme={theme}>A platform to ease purchases for buyers online</BannerDescription>
           </BannerContent>
        </BannerContainer>
    )
}