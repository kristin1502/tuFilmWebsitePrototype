import HomeOutLineIcon from "@mui/icons-material/HomeOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SearchOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const main = [
    {
        display: "home",
        path: "/",
        icon: <HomeOutLineIcon />,
        state: "home"
    },{
        display: "program",
        path: "/program",
        icon: <CalendarMonthIcon />,
        state: "program"
    },
    {
        display: "movies",
        path: "/movie",
        icon: <SlideshowOutlinedIcon />,
        state: "movie"
    },
    {
        display: "tv series",
        path: "/tv",
        icon: <LiveTvOutlinedIcon />,
        state: "tv"
    },
    {
        display: "search",
        path: "/search",
        icon: <SearchOutlinedIcon />,
        state: "search"
    },
    {
        display: "suggestions",
        path: "/suggestions/all",
        icon: <AddCircleIcon/>,
        state: "suggestions-all"
    }
];

const user = [
    {
        display: "favorites",
        path: "/favorites",
        icon: <FavoriteBorderOutlinedIcon />,
        state: "favorite"
    },
    {
        display: "suggestions",
        path: "/suggestions",
        icon: <RateReviewOutlinedIcon />,
        state: "suggestions"
    },
    {
        display: "own suggestions",
        path: "/own-suggestions",
        icon: <AddCircleIcon />,
        state: "suggestions"
    },
    {
        display: "password update",
        path: "/password-update",
        icon: <LockResetOutlinedIcon />,
        state: "password.update"
    }
];

const menuConfigs = {main, user};

export default menuConfigs;