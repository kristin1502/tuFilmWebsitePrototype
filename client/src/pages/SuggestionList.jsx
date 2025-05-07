import { LoadingButton } from "@mui/lab";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import tmdbConfigs from "../api/configs/tmdb.configs";
import suggestionApi from "../api/modules/suggestion.api";
import Container from "../components/common/Container";
import uiConfigs from "../configs/ui.configs";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { routesGen } from "../routes/routes";
import SuggestionItem from "../components/common/SuggestionItem";

const SuggestionList = ({title, mode}) => {
  const [ suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();

  const skip = 10;

  useEffect(() => {
    const getSuggestions = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = mode === 0 ? await suggestionApi.getList() : await suggestionApi.getAll();
      dispatch(setGlobalLoading(false));

      if(err) toast.error(err.message);
      if(response) {
        setCount(response.length);
        setSuggestions([...response]);
        setFilteredSuggestions([...response].splice(0, skip));
      }
    };

    getSuggestions();
  }, []);

  const onLoadMore = () => {
    setFilteredSuggestions([...filteredSuggestions, ...[...suggestions].splice(page * skip, skip)]);
    setPage(page + 1);
  };

  const onRemoved = (id) => {
    const newSuggestions = [...suggestions].filter(e => e.id !== id);
    setSuggestions(newSuggestions);
    setFilteredSuggestions([...newSuggestions].splice(0, page * skip));
    setCount(count - 1);
  };

  return (
    <Box sx={{ ...uiConfigs.style.mainContent}} >
      <Container header={`${title} (${count})`}>
        <Stack spacing={2}>
          {filteredSuggestions.map((item) => (
            <Box key={item.id}>
              <SuggestionItem suggestion={item} onRemoved={onRemoved} />
              <Divider sx={{
                display: { xs: "block", md: "none" }
              }} />
            </Box>
          ))}
          {filteredSuggestions.length < suggestions.length && (
            <Button onClick={onLoadMore}>load more</Button>
          )}
        </Stack>
      </Container>
    </Box>
  )
};

export default SuggestionList;