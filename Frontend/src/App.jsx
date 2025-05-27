import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider,} from "react-router-dom";
import { Home, SignIn, SignUp, About, Profile } from "./pages/index.jsx";
import Layout from "./pages/Layout.jsx";
import PrivateRoutes from "./Components/privateRoutes.jsx";
import PasswordChange from "./pages/PasswordChange.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path = "" element = {<Layout/>}>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoutes/>}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/password-change" element={<PasswordChange />} />
        </Route>
        </Route>
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
