import Link from 'next/link';
import { useRouter }  from 'next/router';

const CoffeeStore = () => {
    const router = useRouter();
    console.log('router', router);
    return (
        <div> Coffee Store Page {router.query.id}
            <Link href="/">
                <a>Back To Home</a></Link>
            <Link href="/coffee-stores/dynamic">
                <a>Go to page dynamic</a></Link>
        </div>);
}

export default CoffeeStore;