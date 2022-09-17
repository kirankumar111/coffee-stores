import { createApi } from 'unsplash-js';

const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&open_now=true&limit=${limit}`;
}

const getListOfCoffeeStorePhotos = async () => {
    let photos = await unsplash.search.getPhotos({
        query: 'coffee',
        page: 1,
        perPage: 9,
    });
    console.log(111, photos, photos.response.results);
    return photos.response.results.map((photo) =>
        photo.urls["small"]
    )
}

export async function fetchCoffeeStores(latLong = "12.932772688121572,77.60313216982671") {
    const photos = await getListOfCoffeeStorePhotos();
    console.log('photos', photos);
    let limit = 9;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY || "fsq3nhGmpeNi3gQk65Y0HLlk+XtRLWXef3es0EKghdAp9EQ="
        }
    };
    console.log('options', options);
    const response = await fetch(getUrlForCoffeeStores(latLong, "coffee", limit), options);
    const data = await response.json();
    return data.results.map((result, index) => {
        const neighborhood = result.location.neighborhood;
        console.log('neighborhood', neighborhood);
        return {
            id: result.fsq_id.toString(),
            name: result.name,
            address: result.location.address,
            neighborhood: neighborhood ? neighborhood.length > 0 ? neighborhood[0] : "" : "",
            ...result,
            imgUrl: photos.length > 0 ? photos[index] : null,
        }
    })
}