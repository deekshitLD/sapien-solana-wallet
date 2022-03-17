import type { NextPage } from "next";
import Home from "../src/components/home/index";

import Layout from "../src/components/Layout";
const HomePage = () => {
  return (
    <div>
      <Home />
    </div>
  );
};

HomePage.getLayout = function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>;
};

export default HomePage;
