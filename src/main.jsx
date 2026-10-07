//Developed by Amadeus Ferrp (https://www.linkedin.com/in/amadeusferro) ...
//Translated by Amadeus Ferro ...

import  "./Index.css"
import "./i18next/i18next.js";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx"; 

import Home from "./routes/HomePage.jsx";
import InnerPage from "./routes/InnerPage.jsx";
import Testimonials from "./components/FullTestimonials/FullTestimonials.jsx";
import Team from "./components/FullTeam/FullTeam.jsx";
import Error from "./components/Error/Error.jsx";
import MemberLogin from "./components/MemberLogin/MemberLogin.jsx";
import UserLogin from "./components/UserLogin/UserLogin.jsx";
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Gallery from "./components/Gallery/Gallery.jsx";
import GalleryDetails from "./components/GalleryDetails/GalleryDetails.jsx";
import FourDevs from "./components/4Devs/4Devs.jsx";
import Blog from "./components/Blog/Blog.jsx";
import BlogSingle from "./components/BlogSingle/BlogSingle.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";

import Dashboard from "./components/Dashboard/Dashboard.jsx";
import AddGalleryItem from "./components/Dashboard/AddGalleryItem.jsx";
import ManageGallery from "./components/Dashboard/ManageGallery.jsx";
import EditGalleryItem from "./components/Dashboard/EditGalleryItem.jsx";
import AddBlogPost from "./components/Dashboard/AddBlogPost.jsx";
import EditBlogPost from "./components/Dashboard/EditBlogPost.jsx";
import ManageBlog from "./components/Dashboard/ManageBlog.jsx";
import ManageContacts from "./components/Dashboard/ManageContacts.jsx";


const router = createBrowserRouter([
  {
    path: "/Tech-Museum/",
    element: <App />,
    children: [
      {
        path: "/Tech-Museum/",
        element: <Home />,
      },
      {
        path: "/Tech-Museum/blog",
        element: (
          <InnerPage
            pageName="blog.page_name"
            title="blog.title"
            content={<Blog />}
          />
        ),
      },
      {
        path: "/Tech-Museum/blog/single/:id",
        element: <BlogSingle />,
      },
      {
        path: "/Tech-Museum/dashboard/edit-blog/:id",
        element: (
          <ProtectedRoute>
            <InnerPage pageName="Editar Post" title="Gestão do Blog" content={<EditBlogPost />} />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Tech-Museum/testimonials",
        element: (
          <InnerPage
            pageName="testimonials_inner_page.page_name"
            title="testimonials_inner_page.title"
            content={<Testimonials />}
          />
        ),
      },
      {
        path: "/Tech-Museum/team",
        element: (
          <InnerPage
            pageName="team_inner_page.page_name"
            title="team_inner_page.title"
            content={<Team />}
          />
        ),
      },
      {
        path: "/Tech-Museum/member-login",
        element: <MemberLogin />,
      },
      {
        path: "/Tech-Museum/dashboard",
        element: (
          <ProtectedRoute>
            <InnerPage
              pageName="Dashboard"
              title="Painel de Administração"
              content={<Dashboard />}
            />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Tech-Museum/dashboard/manage-contacts",
        element: (
          <ProtectedRoute>
            <InnerPage 
              pageName="Gestão de Contactos" 
              title="Mensagens" 
              content={<ManageContacts />} 
            />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Tech-Museum/dashboard/add-gallery",
        element: (
          <ProtectedRoute>
            <InnerPage
              pageName="Adicionar Peça"
              title="Gestão do Acervo"
              content={<AddGalleryItem />}
            />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Tech-Museum/dashboard/manage-gallery",
        element: (
          <ProtectedRoute>
            <InnerPage
              pageName="Gerenciar Acervo"
              title="Gestão do Acervo"
              content={<ManageGallery />}
            />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Tech-Museum/dashboard/manage-blog",
        element: (
          <ProtectedRoute>
            <InnerPage 
              pageName="Gerenciar Blog" 
              title="Gestão do Blog" 
              content={<ManageBlog />} 
            />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Tech-Museum/dashboard/edit-gallery/:id", 
        element: (
          <ProtectedRoute>
            <InnerPage
              pageName="Editar Peça"
              title="Gestão do Acervo"
              content={<EditGalleryItem />}
            />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Tech-Museum/dashboard/add-blog",
        element: (
          <ProtectedRoute>
            <InnerPage
              pageName="Escrever Post"
              title="Gestão do Blog"
              content={<AddBlogPost />}
            />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Tech-Museum/user-login",
        element: <UserLogin />,
      },
      {
        path: "/Tech-Museum/register",
        element: <Register />,
      },
      {
        path: "/Tech-Museum/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/Tech-Museum/gallery",
        element: (
          <InnerPage
            pageName="gallery_inner_page.page_name"
            title="gallery_inner_page.title"
            content={<Gallery />}
          />
        ),
      },
      {
        path: "/Tech-Museum/gallery/details/:id",
        element: <GalleryDetails />,
      },
      {
        path: "/Tech-Museum/4devs",
        element: (
          <InnerPage
            pageName="4devs.page_name"
            title="4devs.title"
            content={<FourDevs />}
          />
        ),
      },
    ],
  },
  {
    path: "*",
    element: <App />,
    children: [
      {
        path: "*",
        element: (
          <InnerPage
            pageName="error_inner_page.page_name"
            title="error_inner_page.title"
            content={<Error />}
          />
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);