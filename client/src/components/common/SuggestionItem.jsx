import React, { useState } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import uiConfigs from "../../configs/ui.configs";
import suggestionApi from "../../api/modules/suggestion.api";
import { routesGen } from "../../routes/routes";
import { useSelector } from "react-redux";

const SuggestionItem = ({ suggestion, onRemoved }) => {
    const { user } = useSelector((state) => state.user);
    console.log("User", user);
    const [onRequest, setOnRequest] = useState(false);
    console.log("SuggestionItem", suggestion);
  
    const onRemove = async () => {
      if(onRequest) return;
      setOnRequest(true);
      const { response, err} = await suggestionApi.remove({ suggestionId: suggestion.id});
      setOnRequest(false);
  
      if(err) toast.error(err.message);
      if(response) {
        toast.success("Remove suggestion success");
        onRemoved(suggestion.id);
      }
    };
  
    return (
      <Box sx={{
        position: "relative",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        padding: 1,
        opacity: onRequest ? 0.6 : 1,
        "&:hover": { backgroundColor: "background.paper" }
      }}>
        <Box sx={{ width: { xs: 0, md: "10%" }}}>
          <Link
            to={routesGen.mediaDetail(suggestion.mediaType, suggestion.mediaId)}
            style={{ color: "unset", textDecoration: "none" }}
          >
            <Box sx={{
              paddingTop: "160%",
              ...uiConfigs.style.backgroundImage(tmdbConfigs.posterPath(suggestion.mediaPoster))
            }} />
          </Link>
        </Box>
  
        <Box sx={{
          width: { xs: "100%", md: "80%" },
          padding: { xs: 0, md: "0 2rem" }
        }}>
          <Stack spacing={1}>
            <Link
              to={routesGen.mediaDetail(suggestion.mediaType, suggestion.mediaid)}
              style={{ color: "unset", textDecoration: "none" }}
            >
              <Typography
                variant="h6"
                sx={{ ...uiConfigs.style.typoLines(1, "left") }}
              >
                {suggestion.mediaTitle}
              </Typography>
            </Link>
            <Typography variant="caption">
              {dayjs(suggestion.createdAt).format("DD-MM-YYYY HH:mm:ss")}
            </Typography>
            <Typography>{suggestion.content}</Typography>
          </Stack>
        </Box>
        {user && user.id === suggestion.user.id && (
            <LoadingButton
            variant="contained"
            sx={{
                position: { xs: "relative", md: "absolute" },
                right: { xs: 0, md: "10px" },
                marginTop: { xs: 2, md: 0 },
                width: "max-content"
            }}
            startIcon={<DeleteIcon />}
            loadingPosition="start"
            loading={onRequest}
            onClick={onRemove}
            >
            remove
           </LoadingButton>
        )}
        </Box>
    );
  };

export default SuggestionItem;