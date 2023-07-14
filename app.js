const dotenv = require("dotenv")
const MongoClient = require("mongodb").MongoClient
const circulationRepo = require("./repos/circulationRepo")
const data = require("./circulation.json")

dotenv.config()

async function main() {
  console.log(process.env.MONGODB_URL)
  const client = new MongoClient(process.env.MONGODB_URL)
  await client.connect()

  const results = await circulationRepo.loadData(data)
  console.log(results.insertedCount, results.ops)

  const admin = client.db(process.env.MONGODB_DB_NAME).admin()
  //console.log(await admin.serverStatus())
  console.log(await admin.listDatabases())
}

main()
