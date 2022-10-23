import { table, getMinifiedRecords, findRecordByFilter } from "../../lib/airtable";

const createCoffeeStore = async (req, res) => {
    try {
        if (req.method === "POST") {
            const { id, name, address, neighbourhood, voting, imgUrl } = req.body;
            if (!id && !name) {
                res.status(400)
                res.json({ message: "id & Name is missing" });
            }
            const records = await findRecordByFilter(id);
            if (records.length !== 0) {
                res.json(records);
            } else {

                const createRecords = await table.create([
                    {
                        fields: {
                            id,
                            name,
                            address,
                            neighbourhood,
                            voting,
                            imgUrl
                        }
                    }
                ]);
                const records = getMinifiedRecords(createRecords);
                res.json({ message: "Create a record", records });

            }
        } else {
            res.status(500);
            res.json({ message: "Hello There!" });
        }
    } catch (e) {
        console.error("Error Creating Or Finding store", e);
        res.json({ message: "Error Creating Or Finding store", e });
    }

}

export default createCoffeeStore;