import React from "react";
import { useTheme } from "@mui/material/styles";
import { Container, Grid } from '@mui/material';
import GraphComponent from "./ComponentGraph";

const products = [
    { id: "0", image: "https://thumbs.dreamstime.com/b/paddy-field-11870763.jpg", name: "Paddy" },
    { id: "1", image: "https://cdn.pixabay.com/photo/2016/09/21/04/46/barley-field-1684052_960_720.jpg", name: "wheat" },
    { id: "2", image: "https://cdn.xxl.thumbs.canstockphoto.com/coconut-tree-stock-images_csp8060765.jpg", name: "coconut" },
    { id: "3", image: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/201603/ragi-story_647_030916113225.jpg?VersionId=mndy1fmnaZXQrcQYe0mk0dxJKv9_Q.IJ", name: "ragi" },
    { id: "4", image: "https://cdn.pixabay.com/photo/2014/07/11/17/05/mung-beans-390017_960_720.jpg", name: "moong" }
]

export default function Graphs() {
    const theme = useTheme();
    const renderProducts = products.map(product => (
        <Grid item key={product.id} alignItems="center" display="flex" flexDirection={"column"} 
        xs={8} sm={6}>
            <GraphComponent product={product} theme={theme} />
        </Grid>
    ))

    return (
        <Container>
            <Grid container justifyContent={"center"}  sx={{margin:"20px 4px 10px 4px" , padding : "20px"}} 
            spacing = {{xs:2 ,sm:4}}
            >
                    {renderProducts}
            </Grid>
        </Container>
    )
}