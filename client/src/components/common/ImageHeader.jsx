import { Box, useTheme } from "@mui/material";
import uiConfigs from "../../configs/ui.configs";

const ImageHeader = ({ imagePath }) => {
    const theme = useTheme();

    return (
        <Box sx={{
            zIndex: "-1",
            position: "relative",
            paddingTop: { xs: "60%", sm: "40%", md: "35%" },
            backgroundPosition: "top",
            backgroundSize: "cover",
            backgroundImage: `url(${imagePath})`,
            backgroundAttachment: "fixed",
            "&::before": {
                content: '""',
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                ...uiConfigs.style.gradientByImage[theme.palette.mode]
            }
        }} />
    );
};

export default ImageHeader;