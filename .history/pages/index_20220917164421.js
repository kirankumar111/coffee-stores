import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Banner from '../components/banner';
import Card from '../components/card';
// import coffeeStoresData from '../data/coffee-stores.json';

export async function getStaticProps(context) {
  //const data = coffeeStores;
  console.log('Hi getStaticProps');
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.FOURSQUARE_API_KEY
    }
  };

  const response = await fetch('https://api.foursquare.com/v3/places/search?query=coffee&open_now=true&limit=10', options);
  const data = await response.json();
  console.log(data.results);
  return {
    props: {
      coffeeStores: data.results,
    }
  }
}

export default function Home(props) {
  console.log('Home props', props);
  const handleOnBannerClick = () => {
    console.log('Hi Banner Click');
  }
  return (
    <div className={ styles.container }>
      <Head>
        <title>Coffee Lovers!</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="allows you to discover your favorite coffee stores" />
      </Head>
      <main className={ styles.main }>
        <Banner buttonText="View your shops near by" handleOnClick={ handleOnBannerClick } />
        <div className={ styles.heroImage }>
          <Image src="/static/hero-image.png" alt="HeroImage" width={ 700 } height={ 400 }></Image>
        </div>
        { props.coffeeStores.length > 0 && (
          <div className={ styles.sectionWrapper }>
            <h2 className={ styles.heading2 }>Stores Near Me</h2>
            <div className={ styles.cardLayout }>
              { props.coffeeStores.map(store => {
                return (
                  <Card
                    key={ store.fsqid }
                    href={ `/coffee-stores/${store.fsqid}` }
                    name={ store.name }
                    imgUrl={ store.imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" }
                    className={ styles.card }
                    height={ 250 }
                    width={ 300 }
                  />
                )
              }) }
            </div>
          </div>
        ) }
      </main>
    </div>
  )
}