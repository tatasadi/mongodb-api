const dotenv = require("dotenv")
const MongoClient = require("mongodb").MongoClient
const circulationRepo = require("./repos/circulationRepo")
const data = require("./circulation.json")

dotenv.config()
const url = process.env.MONGODB_URL
const dbName = process.env.MONGODB_DB_NAME

async function main() {
  const client = new MongoClient(url)
  try {
    await client.connect()

    //const results = await circulationRepo.loadData(data)
    //console.log(results.insertedCount, results.ops)

    const items = await circulationRepo.get()
    console.log(items)
  } catch (error) {
    console.log(error)
  } finally {
    const admin = client.db(dbName).admin()
    //console.log(await admin.serverStatus())

    //await client.db(dbName).dropDatabase()
    console.log(await admin.listDatabases())

    client.close()
  }
}

main()
