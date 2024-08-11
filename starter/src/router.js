import Home from "./Pages/Home/Home"
import Search from "./Pages/Search/Search"

export const routePath = {
    HOME: '/',
    SEARCH: '/search',
}

export const routes = [
    {
        path: routePath.HOME,
        element: <Home />
    },
    {
        path: routePath.SEARCH,
        element: <Search />
    }
]