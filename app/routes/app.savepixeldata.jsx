import db from "../db.server";

export const action = async ({ request }) => {
    const data = await request.json(); // Parse the JSON data from the request body
    await db.pixelData.create({ data: data });
    return 1;
}