import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import CartDrawer from '../CartDrawer/CartDrawer';
import styles from './Layout.module.scss';

export default function Layout() {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
      <CartDrawer />
    </div>
  );
}
