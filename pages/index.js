import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Banner from '../components/banner';
import Card from '../components/card';
import coffeeStoresData from '../data/coffee-stores.json';

export async function getStaticProps(context) {
  //const data = coffeeStores;
  console.log('Hi getStaticProps');
  return {
    props: {
      coffeeStores: coffeeStoresData,
    }
  }
}

export default function Home(props) {
  console.log('props', props);
  const handleOnBannerClick = () => {
    console.log('Hi Banner Click');
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Lovers!</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="allows you to discover your favorite coffee stores"/>
      </Head>
      <main className={styles.main}>
        <Banner buttonText="View your shops near by" handleOnClick={handleOnBannerClick} />
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" alt="HeroImage" width={700} height={400}></Image>
        </div>
        {props.coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Stores Near Me</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map(store => {
                return (
                  <Card
                    key={store.id}
                    href={`/coffee-stores/${store.id}`}
                    name={store.name}
                    imgUrl={store.imgUrl}
                    width={260}
                    height={160} />
                )
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
