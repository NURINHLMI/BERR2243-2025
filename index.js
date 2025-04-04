const { MongoClient } = require('mongodb');

const drivers = [
  { name: "John Doe", available: true, rating: 4.4 },
  { name: "Jane Smith", available: true, rating: 4.7 },
  { name: "Mike Lee", available: false, rating: 3.9 },
  { name: "Anna Bell", available: true, rating: 4.6 }
];

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("testDB");
    const driversCollection = db.collection("drivers");

    // Optional: Clear previous data for clean test runs
    // await driversCollection.deleteMany({});

    // Insert drivers
    for (const driver of drivers) {
      const result = await driversCollection.insertOne(driver);
      console.log(`🚗 Driver inserted with _id: ${result.insertedId}`);
    }

    // Update John Doe's rating
    const updateResult = await driversCollection.updateOne(
      { name: "John Doe" },
      { $inc: { rating: 0.1 } }
    );
    console.log(`✅ John Doe updated: Matched ${updateResult.matchedCount}, Modified ${updateResult.modifiedCount}`);

    // Delete unavailable drivers (available: false)
    const deleteResult = await driversCollection.deleteMany({ available: false });
    console.log(`🗑️ Deleted ${deleteResult.deletedCount} unavailable driver(s)`);

  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
    console.log("🔌 MongoDB connection closed");
  }
}

main();
