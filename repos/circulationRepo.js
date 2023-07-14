const { MongoCLient, MongoClient } = require("mongodb")
const dotenv = require("dotenv")

function circulationRepo() {
  function loadData(data) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(process.env.MONGODB_URL)
      try {
        await client.connect()
        const db = client.db(process.env.MONGODB_DB_NAME)

        results = await db.collection("newspapers").insertMany(data)
        resolve(results)

        client.close()
      } catch (error) {
        reject(error)
      }
    })
  }

  function get() {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(process.env.MONGODB_URL)
      try {
        await client.connect()
        const db = client.db(process.env.MONGODB_DB_NAME)

        const items = db.collection("newspapers").find()
        resolve(await items.toArray())

        client.close()
      } catch (error) {
        reject(error)
      }
    })
  }

  return { loadData, get }
}

module.exports = circulationRepo()
