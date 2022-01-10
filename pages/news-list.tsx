import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Home from "../src/components/home/index";

const HomePage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Home />
    </div>
  );
};

export default HomePage;
