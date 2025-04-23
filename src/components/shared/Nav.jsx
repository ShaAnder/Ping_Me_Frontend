import { useLocation, useParams } from "react-router";
import styles from "../../assets/css/nav.module.css";

function NavMain() {
  const location = useLocation();
  const { serverId } = useParams();

  const title = location.pathname === "/" ? "Home" : `${serverId}`;

  return (
    <div className={styles.navbar}>
      {/* Spacer to balance layout */}
      <div className={styles.leftSpacer}></div>

      {/* Center title */}
      <div className={styles.title}>{title}</div>

      {/* Right icons */}
      <div className={styles.iconGroup}>Current User</div>
    </div>
  );
}

export default NavMain;
