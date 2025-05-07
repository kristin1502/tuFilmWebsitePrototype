import React from "react";
import HeroSlide from "../components/common/HeroSlide";
import tmdbConfigs from "../api/configs/tmdb.configs";
import { Box } from "@mui/material";
import uiConfigs from "../configs/ui.configs";
import Container from "../components/common/Container";

const ProgrammList = () => {
    return (
        <>
            <Box marginTop="-4rem" sx={{ ...uiConfigs.style.mainContent }}>
                <Container header="Programm Winter Semester 2024/2025">
                <Box textAlign="center" padding="2rem">
                    <p>No program has been published yet. Please check back later.</p>
                </Box>
                </Container>
            </Box>
        </>
    )
};

export default ProgrammList;