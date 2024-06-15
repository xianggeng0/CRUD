import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthRoute } from "@/components/AuthRoute";
const Article = lazy(()=>import("@/pages/Article"))//属于打包时的优化
const Publish = lazy(()=>import("@/pages/Publish"))
const Home = lazy(()=> import("@/pages/Home"))


const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthRoute><Layout /></AuthRoute>,
    children:[
      {
        index: true,
        element: <Suspense fallback={'加载中'}><Home /></Suspense>
      },
      {
        path: 'article',
        element: <Suspense fallback={'加载中'}><Article /></Suspense> 
      },
      {
        path: 'publish',
        element: <Suspense fallback={'加载中'}><Publish /></Suspense>
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  }
])

export default router