import { fetchCoffeeStores } from "../../lib/coffee-stores";

const getCoffeeStoresByLocation = async (req, res) => {
    //configure latlong and limit
    try {
        const { latLong, limit } = req.query;
        console.log("000", { latLong, limit });
        const response = await fetchCoffeeStores(latLong, limit);
        res.status(200);
        res.json(response);
    } catch (e) {
        res.status(500);
        res.json({ message: "Something went wrong", e });
    }

}

export default getCoffeeStoresByLocation;

// export default async function handler(req, res) {
//     try {
//         console.log('req.query', req.query);
//         const { latLong, limit } = req.query;
//         console.log("000", { latLong, limit });
//         const response = await fetchCoffeeStores(latLong, limit);
//         console.error(2222, response);
//         res.status(200);
//         res.json(response);
//     } catch (e) {
//         console.error(1111, e);
//         res.status(500);
//         res.json({ message: "Something went wrong", e });
//     }
// }