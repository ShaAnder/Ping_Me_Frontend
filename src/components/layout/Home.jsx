import NavMain from "../shared/Nav";
import ServerList from "../shared/ServerList";
import Categories from "../home/Categories";
import PopularServers from "../home/PopularServers";

import React, { useState } from "react";

import styles from "../../assets/css/home.module.css";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <NavMain />
      <div style={{ display: "flex", height: "calc(100vh - 50px)" }}>
        <ServerList />
        {/* Home content */}
        <div className={styles.mainContent}>
          {/* exploration text here */}
          <Categories onCategoryClick={handleCategoryClick} />
        </div>
        {/* Right Panel: Popular Servers Section */}
        <div className={styles.rightPanel}>
          {selectedCategory ? (
            <PopularServers category={selectedCategory} />
          ) : (
            <p>Select a category to see popular servers</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
