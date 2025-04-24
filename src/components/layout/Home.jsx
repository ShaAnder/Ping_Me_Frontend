import NavMain from "../shared/Nav";
import ServerList from "../shared/ServerList";
import Categories from "../home/Categories";
import PopularServers from "../home/PopularServers";

import React, { useState } from "react";

import styles from "../../assets/css/Home.module.css";

import dummyUser from "../../dummyData/dummyUserData";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = Array.from(
    new Set(dummyUser.servers.map((server) => server.category))
  );

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <NavMain />
      <div className={styles.homeContainer}>
        <ServerList />
        <div className={styles.categoryPanel}>
          <Categories
            categories={categories}
            onSelectCategory={handleCategorySelect}
            selected={selectedCategory}
          />
        </div>
        <div className={styles.contentArea}>
          {selectedCategory ? (
            <PopularServers
              servers={dummyUser.servers.filter(
                (server) => server.category === selectedCategory
              )}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
export default Home;
