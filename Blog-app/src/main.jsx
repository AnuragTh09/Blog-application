import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AddPostPage, AllPostsPage, AuthLayout, EditPostPage, HomePage, LoginPage, PostPage, SignupPage } from './components/index.js'


const appRouterConfiguration = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <LoginPage />
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignupPage />
          </AuthLayout>
        )
      },
      {
        path: "/post/:slug",
        element: <PostPage />
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            {" "}
            <EditPostPage />
          </AuthLayout>
        )
      },
      {
        path: "/all-posts/",
        element: (
          <AuthLayout authentication>
            {" "}
            <AllPostsPage />
          </AuthLayout>
        )
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            {" "}
            <AddPostPage />
          </AuthLayout>
        )
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouterConfiguration} />
    </Provider>
  </React.StrictMode>
)
