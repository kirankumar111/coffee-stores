export async function fetchCoffeeStores() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: process.env.FOURSQUARE_API_KEY
        }
    };

    const response = await fetch('https://api.foursquare.com/v3/places/search?query=coffee&open_now=true&limit=10', options);
    const data = await response.json();
    return data.results
}