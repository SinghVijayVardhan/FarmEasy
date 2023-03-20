import { GraphContainer,GraphImage,GraphTitle } from "../../styles/graphs"
import { Link } from "react-router-dom";
import React from "react";

export default function GraphComponent({offer,theme}){
    return(
        <Link to={`/Offered/${offer.id}`}>
            <GraphContainer theme={theme}>
                <GraphImage src={offer.image} theme={theme} />
            </GraphContainer>
            <GraphTitle>{offer.name}</GraphTitle>
        </Link>
    );
}