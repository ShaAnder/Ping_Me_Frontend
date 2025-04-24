import NavMain from "../shared/Nav";
import ServerList from "../shared/ServerList";
import Categories from "../home/Categories";
import ServerByCategory from "../home/ServerByCategory";
import useCrud from "../../hooks/useCrud";
import { useState, useEffect } from "react";
import PopularServersHeader from "../home/PopularServersHeader";

import styles from "../../assets/css/Home.module.css";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const {
    fetchData: loadCategories,
    dataCRUD: categories,
    isLoading: loadingCats,
    err: catsErr,
  } = useCrud([], "/api/categories/");

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
  };

  return (
    <>
      <NavMain />
      <div className={styles.homeContainer}>
        <ServerList />
        <aside className={styles.categoryPanel}>
          <Categories
            categories={categories}
            onSelectCategory={handleCategorySelect}
            selected={selectedCategory}
            loading={loadingCats}
            error={catsErr}
          />
        </aside>
        <main className={styles.contentArea}>
          <PopularServersHeader category={selectedCategory} />

          {loadingCats ? (
            <div className={styles.loaderContainer}>
              <div className={styles.loader}></div>
            </div>
          ) : selectedCategory ? (
            <ServerByCategory category={selectedCategory} />
          ) : null}
        </main>
      </div>
    </>
  );
}
export default Home;
