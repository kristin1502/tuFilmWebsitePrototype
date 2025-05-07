import ProtectedPage from "../components/common/ProtectedPage";
import FavoriteList from "../pages/FavoriteList";
import HomePage from "../pages/HomePage";
import MediaDetail from "../pages/MediaDetail";
import MediaList from "../pages/MediaList";
import MediaSearch from "../pages/MediaSearch";
import PasswordUpdate from "../pages/PasswordUpdate";
import PersonDetail from "../pages/PersonDetail";
import ProgrammList from "../pages/ProgrammList";
import SuggestionList from "../pages/SuggestionList";

export const routesGen = {
    home: "/",
    mediaList: (type) => `/${type}`,
    mediaDetail: (type, id) => `/${type}/${id}`,
    mediaSearch: "/search",
    person: (id) => `/person/${id}`,
    favoriteList: "/favorites",
    suggestionList: "/suggestions",
    passwordUpdate: "password-update"
};

const routes = [
    {
        index: true,
        element: <HomePage />,
        state: "home"
    },
    {
        path: "/person/:personId",
        element: <PersonDetail />,
        state: "person.detail"
    },
    {
        path: "/search",
        element: <MediaSearch />,
        state: "search"
    },
    {
        path: "password-update",
        element: (
            <ProtectedPage>
                <PasswordUpdate />
            </ProtectedPage>
        ),
        state: "password-update"
    },
    {
        path: "favorites",
        element: (
            <ProtectedPage>
                <FavoriteList />
            </ProtectedPage>
        ),
        state: "favorites"
    },
    {
        path: "/suggestions/all",
        element: (
            <SuggestionList title={"All Suggestions"} mode={1}/>
        ),
        state: "suggestions-all"
    },
    {
        path: "/suggestions",
        element: (
            <ProtectedPage>
                <SuggestionList title={"Own Suggestions"} mode={0}/>
            </ProtectedPage>
        ),
        state: "suggestions"
    },
    {
        path: "/program",
        element: <ProgrammList />,
        state: "program"
    },
    {
        path: "/:mediaType",
        element: <MediaList />
    },
    {
        path: "/:mediaType/:mediaId",
        element: <MediaDetail />
    }
];

export default routes;