const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_KEY);

const table = base("coffee-stores");

const createCoffeeStore = async (req, res) => {
    if (req.method === "POST") {
        //Finding a record
        const findCoffeeStoreRecords = await table.select({ filterByFormula: `id="0"` }).firstPage();
        if (findCoffeeStoreRecords != 0) {
            const records = findCoffeeStoreRecords.map(record => {
                return { ...record.fields }
            });
            res.json(records);
        } else {
            res.json({ message: "Create a record" });
        }
        //create record
    } else {
        res.status(500);
        res.json({ message: "Hello There!" });
    }
}

export default createCoffeeStore;