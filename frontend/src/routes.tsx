import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import PostsPage from "./pages/Posts.page";

export const router = createBrowserRouter([
    {
        element: <RootLayout/>,
        children: [
            {
                path: '/posts',
                element: <PostsPage/>
            }
        ]
    }
])