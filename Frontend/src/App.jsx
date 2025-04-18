import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider,} from "react-router-dom";
import { Home, SignIn, SignUp, About, Profile } from "./pages/index.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} />
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
