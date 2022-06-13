import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./layout";
import { Home } from "./pages";
import { Groups } from "./pages/groups";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<Home />} />
          <Route path="groups" element={<Groups />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default Router
