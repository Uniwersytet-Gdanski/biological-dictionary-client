import styles from './HomeRoute.module.css'
import Header from '../../components/Header/Header';

const HomeRoute = () => {
  return (
    <div className={styles.home}>
      <Header />
    </div>
  );
};

export default HomeRoute;
