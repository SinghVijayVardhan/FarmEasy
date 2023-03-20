import React from 'react';
import BuyComponent from './BuyComponent';
import { Grid, Container } from '@mui/material';
import { useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

//const category = [ "cash","fruit","vegetable","Grains","Pulses","edibleOil","livestock","fish"]

const products = [
    { id: "7", image: "images/banner/fish.jpg", name: "fish" },
    { id: "4", image: "images/banner/pulses.jpg", name: "Pulses" },
    { id: "5", image: "images/banner/edibleoil.jpg", name: "Edible Oil" },
    { id: "0", image: "images/banner/cash.jpg", name: "cash" },
    { id: "1", image: "images/banner/fruits.jpg", name: "fruit" },
    { id: "2", image: "images/banner/vegetables.jpg", name: "vegetable" },
    { id: "3", image: "images/banner/grains.jpg", name: "Grains" },
    { id: "6", image: "images/banner/livestock.jpeg", name: "livestock" },
]

export default function Buy() {
    //const {id} = useParams();

    const theme = useTheme();
    const renderProducts = products.map(product => (
        <Grid item key={product.id} alignItems="center" display="flex" flexDirection={"column"}
            xs={8} sm={6}>
            <BuyComponent product={product} theme={theme} />
        </Grid>
    ))
    return (
        <Container>
            <Grid container justifyContent={"center"} sx={{ margin: "20px 4px 10px 4px", padding: "20px" }}
                spacing={{ xs: 2, sm: 4 }}
            >
                {renderProducts}
            </Grid>
        </Container>
    )
}