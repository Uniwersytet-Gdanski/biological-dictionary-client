import { Link } from 'react-router-dom';
import logo from '../../img/logo.png'
import NavBar from '../NavBar/NavBar';
import styles from './About.module.css'

const About = ({ currentLetter = null }) => {

  return (
    <header className={styles.about}>
      <NavBar />
      <h1 className={styles.title}>Polsko-Angielski Słownik Biologiczny</h1>
      <Link to="/" className={styles.logoContainer}>
        <img src={logo} alt="Logo" />
      </Link>

      <h1 className={styles.title}>O słowniku</h1>

      <div className={styles.mainContainer}>
        <main className={styles.main}>
          <p>
            Niniejszy słownik zawiera tłumaczenia polskich terminów z zakresu szeroko pojętej biologii – (od biochemii po ekologię) - 
            na język angielski. Obejmuje to zarówno liczbę pojedynczą, jak i mnogą, zarówno formy regularne i nieregularne. Zaznaczona 
            jest też niepoliczalność. W przypadku wielu tłumaczeń, uwzględniono angielskie synonimy i warianty ortograficzne wyrażeń.
          </p>
          <p>
            Ponadto, każdy termin opatrzony został definicją w języku angielskim, która nie stanowi jednak wyczerpującej informacji 
            naukowej, a tylko ma za zadanie wskazać, czy poszukiwane tłumaczenie jest właściwe dla żądanego kontekstu.
          </p>
        </main>
      </div>
    </header>
  )
};

export default About;
