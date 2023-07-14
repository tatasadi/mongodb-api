const { MongoCLient, MongoClient } = require("mongodb")

function circulationRepo() {
  function loadData(data) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(process.env.MONGODB_URL)
      try {
        await client.connect()
        const db = client.db(process.env.MONGODB_DB_NAME)

        results = await db.collection("newspapers").insertMany(data)
        resolve(results)
      } catch (error) {
        reject(error)
      }
    })
  }

  return { loadData }
}

module.exports = circulationRepo()
