import { Helmet } from 'react-helmet-async';
import HeaderWithoutSearch from '../../../components/HeaderWithoutSearch/HeaderWithoutSearch';
import styles from './AboutRoute.module.css'

const AboutRoute = () => {
  return (
    <div className={styles.route}>
      <Helmet>
        <title> O słowniku - Słownik Biologiczny </title>
      </Helmet>
      <HeaderWithoutSearch />

      <main className={styles.main}>
        <h1 className={styles.title}>O słowniku</h1>
        <p>
          Niniejszy słownik zawiera tłumaczenia polskich terminów z zakresu szeroko pojętej
          biologii – od biochemii po ekologię -
          na język angielski. Obejmuje to zarówno liczbę pojedynczą, jak i mnogą, zarówno formy
          regularne i nieregularne. Zaznaczona
          jest też niepoliczalność. W przypadku wielu tłumaczeń, uwzględniono angielskie
          synonimy i warianty ortograficzne wyrażeń.
        </p>
        <p>
          Ponadto, każdy termin opatrzony został definicją w języku angielskim, która nie
          stanowi jednak wyczerpującej informacji
          naukowej, a tylko ma za zadanie wskazać, czy poszukiwane tłumaczenie jest właściwe dla
          żądanego kontekstu.
        </p>
      </main>
    </div>
  );
};

export default AboutRoute;
