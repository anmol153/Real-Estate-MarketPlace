import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider,} from "react-router-dom";
import { Home, SignIn, SignUp, About, Profile } from "./pages/index.jsx";
import Layout from "./pages/Layout.jsx";
import PrivateRoutes from "./Components/privateRoutes.jsx";
import PasswordChange from "./pages/PasswordChange.jsx";
import { CreateListing } from "./pages/CreateListing.jsx";
import Listing from "./pages/Listing.jsx";
import { UpdateListing } from "./pages/UpdateListing.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path = "" element = {<Layout/>}>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path='/listing/:id' element = {<Listing/>} /> 
        <Route element={<PrivateRoutes/>}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/password-change" element={<PasswordChange />} />
          <Route path = "/create-listing" element ={<CreateListing/>} />
          <Route path = "listing/:id" element = {<Listing/>} />
          <Route path = "update-listing/:id" element = {<UpdateListing/>} />
        </Route>
        </Route>
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
