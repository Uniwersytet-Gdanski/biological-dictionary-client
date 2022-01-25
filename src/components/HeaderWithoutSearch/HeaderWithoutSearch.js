import HeaderBranding from '../HeaderBranding/HeaderBranding';
import NavBar from '../NavBar/NavBar';
// import styles from './HeaderWithoutSearch.module.css'

const HeaderWithoutSearch = () => {
  return (
    <header>
      <NavBar />
      <HeaderBranding />
    </header>
  )
};

export default HeaderWithoutSearch;
