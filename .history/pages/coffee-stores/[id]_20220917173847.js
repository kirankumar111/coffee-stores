import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import cls from 'classnames';
// import coffeeStoresData from '../../data/coffee-stores.json';
import styles from '../../styles/coffee-store.module.css';
import { fetchCoffeeStores } from '../../lib/coffee-stores';

export async function getStaticProps(props) {
    console.log('getStaticProps', getStaticProps);
    const params = props.params;
    console.log('params', params);
    const coffeeStoresData = await fetchCoffeeStores();
    return {
        props: {
            coffeeStore: coffeeStoresData.find(coffeeStore => {
                return coffeeStore.fsq_id.toString() === params.id
            })
        }
    }
}

export async function getStaticPaths() {
    const paths = coffeeStoresData.map(coffeeStore => {
        return {
            params: { id: coffeeStore.fsq_id.toString(), }
        }
    });
    return {
        paths,
        fallback: false,
    }
}

const CoffeeStore = (props) => {
    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading...</div>
    }
    console.log('props', props.coffeeStore, 'router', router);
    const { address, name, neighbourhood, imgUrl, storeWidth, storeHeight, iconWidth, iconHeight } = props.coffeeStore;

    const handleUpvoteButton = () => {
        console.log("handle Upvote Button");
    }
    return (
        <div className={ styles.layout }>
            <Head><title>{ name }</title></Head>
            <div className={ styles.container }>
                <div className={ styles.col1 }>
                    <div className={ styles.backToHomeLink }>
                        <Link href="/">
                            <a>Back To Home</a>
                        </Link>
                    </div>
                    <div className={ styles.nameWrapper }>
                        <h1>{ name }</h1>
                    </div>
                    <Image src={ imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" } width={ 600 } height={ 360 } className={ styles.storeImage } alt={ name }></Image>
                </div>
                <div className={ cls("glass", styles.col2) }>
                    <div className={ styles.iconWrapper }>
                        <Image src="/static/icons/nearMe.svg" width={ iconWidth } height={ iconHeight } alt={ name }></Image>
                        <p className={ styles.text }>{ address }</p>
                    </div>
                    <div className={ styles.iconWrapper }>
                        <Image src="/static/icons/places.svg" width={ iconWidth } height={ iconHeight } alt={ name }></Image>
                        <p className={ styles.text }>{ neighbourhood }</p>
                    </div>
                    <div className={ styles.iconWrapper }>
                        <Image src="/static/icons/star.svg" width={ iconWidth } height={ iconHeight } alt={ name }></Image>
                        <p className={ styles.text }>1</p>
                    </div>
                    <button className={ styles.upvoteButton } onClick={ handleUpvoteButton }>
                        Up Vote!
                    </button>
                </div>
            </div>
        </div>);
}

export default CoffeeStore;