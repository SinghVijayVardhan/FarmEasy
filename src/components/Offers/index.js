import React from "react";
import { OfferConatiner, MessageText } from "../../styles/Offers";
import { useTheme } from "@mui/material/styles";
import { Slide, Box } from "@mui/material";
import { useState, useEffect } from "react";

const messages = [
    "Prediction of price is here for you!",
    "Connect to your business partner",
    "Built your future with with us",
]

export default function Offers() {
    const [messageIndex, setMessageIndex] = useState(0)
    const [show, setShow] = useState(true);
    const theme = useTheme();

    useEffect(() => {
        setTimeout(() => { setShow(false); }, 3000);

        const intervalId = setInterval(() => {
            setMessageIndex(i => (i + 1) % messages.length);
            setShow(true);
            setTimeout(() => { setShow(false); }, 3000);
        }, 4000);

        return () => { clearInterval(intervalId); };
    }, []);

    return (
        <OfferConatiner>
            <Slide direction={show ? "right" : "left"} in={show} timeout={{ enter: 500, exit: 100 }}>
                <Box display="flex" justifyContent="center" alignItems={"center"}>
                    <MessageText theme={theme}>{messages[messageIndex]}</MessageText>
                </Box>
            </Slide>
        </OfferConatiner>
    );
}