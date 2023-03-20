import { GraphContainer,GraphImage,GraphTitle } from "../../styles/graphs"
import { Link } from "react-router-dom";
import React from "react";

export default function BuyComponent({product,theme}){
    return(
        <Link to={`/BuyProduct/${product.id}`}>
            <GraphContainer theme={theme}>
                <GraphImage src={product.image} theme={theme} style={{width:'100%',height:'100%',overflow:'hidden'}}/>
            </GraphContainer>
            <GraphTitle>{product.name}</GraphTitle>
        </Link>
    );
}