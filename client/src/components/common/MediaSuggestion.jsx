import { LoadingButton } from "@mui/lab";
import { Box, Button, Divider, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import Container from "./Container";
import suggestionApi from "../../api/modules/suggestion.api";
import TextAvatar from "./TextAvatar";

const SuggestionItem = ({ suggestion, onRemoved }) => {
    const { user } = useSelector((state) => state.user);

    const [onRequest, setOnRequest] = useState(false);

    const onRemove = async () => {
        if(onRequest) return;
        setOnRequest(true);

        const { response, err } = await suggestionApi.remove({ suggestionId: suggestion.id });

        if(err) toast.error(err.message);
        if(response) onRemoved(suggestion.id)
    };

    return(
        <Box sx={{
            padding: 2,
            borderRadius: "5px",
            position: "relative",
            opacity: onRequest ? 0.6 : 1,
            "&:hover": { backgroundColor: "background.paper" }
        }}>
            <Stack direction="row" spacing={2}>
                {/* avatar */}
                    <TextAvatar text={suggestion.user?.displayName} />
                {/* avatar */}
                <Stack spacing={2} flexGrow={1}>
                    <Stack spacing={1}>
                        <Typography variant="h6" fontWeight="700">
                            {suggestion.user?.displayName}
                        </Typography>
                        <Typography variant="body1" textAlign="justify">
                            {dayjs(suggestion.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                        </Typography>
                    </Stack>
                    <Typography variant="body1" textAlign="justify">
                        {suggestion.content}
                    </Typography>
                    {user && user.id === suggestion.user.id && (
                        <LoadingButton
                            variant="contained"
                            startIcon={<DeleteIcon />}
                            loadingPosition="start"
                            loading={onRequest}
                            onClick={onRemove}
                            sx={{
                                position: { xs: "relative", md: "absolute" },
                                right: { xs: 0, md: "10px" },
                                marginTop: { xs: 4, md: 0 },
                                width: "max-content"
                            }}
                        >
                            remove
                        </LoadingButton>
                    )}
                </Stack>
            </Stack>
        </Box>
    );
};

const MediaSuggestion = ({ suggestions, media, mediaType }) => {
    const { user } = useSelector((state) => state.user);
    const [listSuggestions, setListSuggestions] = useState([]);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [page, setPage] = useState(1);
    const [onRequest, setOnRequest] = useState(false);
    const [content, setContent] = useState("");
    const [suggestionCount, setSuggestionCount] = useState(0);

    const skip = 4;

    useEffect(() => {
        console.log(suggestions);
        setListSuggestions([...suggestions]);
        setFilteredSuggestions([...suggestions].splice(0, skip));
        setSuggestionCount(suggestions.length);
    }, [suggestions]);

    const onAddSuggestion = async () => {
        if(onRequest) return;
        setOnRequest(true);

        const body = {
            content,
            mediaId: media.id,
            mediaType,
            mediaTitle: media.title || media.name,
            mediaPoster: media.poster_path
        };

        const { response, err } = await suggestionApi.add(body);

        setOnRequest(false);

        if(err) toast.error(err.message);
        if(response) {
            toast.success("Post suggestion success");

            setFilteredSuggestions([...filteredSuggestions, response]);
            setSuggestionCount(suggestionCount + 1);
            setContent("");
        }
    };

    const onLoadMore = () => {
        setFilteredSuggestions([...filteredSuggestions, ...[...listSuggestions].splice(page * skip, skip)]);
        setPage(page + 1);
    };

    const onRemoved = (id) => {
        console.log("1")
        if(listSuggestions.findIndex(e => e.id === id) !== -1){
            console.log("2")
            const newListSuggestions = [...listSuggestions].filter(e => e.id !== id);
            console.log("3")
            setListSuggestions(newListSuggestions);
            console.log("4")
            setFilteredSuggestions([...newListSuggestions].splice(0, page * skip));
            console.log("5")
        }else {
            setFilteredSuggestions([...filteredSuggestions].filter(e => e.id !== id));
        }

        setSuggestionCount(suggestionCount - 1);

        toast.success("Remove suggestion success");
    };

    return(
        <>
            <Container header={`Suggestions (${suggestionCount})`}>
                <p>Please suggest movies trhat you want to see on our screen!</p>
                <Stack spacing={4} marginBottom={2}>
                    {filteredSuggestions.map((item) => (
                        item.user ? <Box key={item.id}>
                            <SuggestionItem suggestion={item} onRemoved={onRemoved} />
                            <Divider sx={{
                                display: { xs: "block", md: "none" }
                            }} />
                        </Box> : null
                    ))}
                    {filteredSuggestions.length < listSuggestions.length && (
                        <Button onClick={onLoadMore}>load more</Button>
                    )}
                </Stack>
                {user && (
                    <>
                        <Divider/>
                        <Stack direction="row" spacing={2}>
                            <TextAvatar text={user.displayName} />
                            <Stack spacing={2} flexGrow={1}>
                                <Typography variant="h6" fontWeight="700">
                                    {user.displayName}
                                </Typography>
                                <TextField
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    multiline
                                    rows={4}
                                    placeholder="Write your suggestion"
                                    variant="outlined"
                                />
                                <LoadingButton
                                    variant="contained"
                                    size="large"
                                    sx={{ width: "max-content" }}
                                    startIcon={<SendOutlinedIcon />}
                                    loadingPosition="start"
                                    loading={onRequest}
                                    onClick={onAddSuggestion}
                                >
                                    post
                                </LoadingButton>
                            </Stack>
                        </Stack>
                    </>
                )}
            </Container>
        </>
    );
};

export default MediaSuggestion;