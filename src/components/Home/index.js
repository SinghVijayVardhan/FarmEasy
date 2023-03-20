import Banner from "../banner";
import Offers from "../Offers";
import Graphs from "../graphs";
import { Container } from "@mui/material";
import React from "react";

export default function Home() {
    return (
        <Container maxWidth="xl" sx={{ background: 'efff' }}>
            <Banner />
            <Offers />
            <Graphs />
        </Container>
    )
}