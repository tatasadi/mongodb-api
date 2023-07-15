const dotenv = require("dotenv")
const { MongoClient } = require("mongodb")
const circulationRepo = require("./repos/circulationRepo")
const data = require("./circulation.json")
const assert = require("assert")

dotenv.config()
const url = process.env.MONGODB_URL
const dbName = process.env.MONGODB_DB_NAME

async function main() {
  const client = new MongoClient(url)
  try {
    await client.connect()

    //const results = await circulationRepo.loadData(data)
    //console.log(results.insertedCount, results.ops)

    //*************** get data ***************//
    const getData = await circulationRepo.get()
    //assert.equal(data.length, getData.length)

    //*************** filter data ***************//
    const filterData = await circulationRepo.get({
      Newspaper: getData[4].Newspaper,
    })
    assert.deepEqual(filterData[0], getData[4])

    //*************** limit data ***************//
    const limitData = await circulationRepo.get({}, 3)
    assert.equal(limitData.length, 3)

    //*************** get by id ***************//
    const id = getData[4]._id.toString()
    const byId = await circulationRepo.getById(id)
    assert.deepEqual(byId, getData[4])

    //*************** add new item ***************//
    const newItem = {
      Newspaper: "My Paper",
      "Daily Circulation, 2004": 1,
      "Daily Circulation, 2013": 2,
      "Change in Daily Circulation, 2004-2013": 100,
      "Pulitzer Prize Winners and Finalists, 1990-2003": 0,
      "Pulitzer Prize Winners and Finalists, 2004-2014": 0,
      "Pulitzer Prize Winners and Finalists, 1990-2014": 0,
    }
    const addItemId = await circulationRepo.add(newItem)
    assert(addItemId)
    const addedItemQuery = await circulationRepo.getById(addItemId)
    assert.deepEqual(addedItemQuery, newItem)

    //*************** update existing item ***************//
    const updatedItem = await circulationRepo.update(addItemId, {
      Newspaper: "My new paper",
      "Daily Circulation, 2004": 1,
      "Daily Circulation, 2013": 2,
      "Change in Daily Circulation, 2004-2013": 100,
      "Pulitzer Prize Winners and Finalists, 1990-2003": 0,
      "Pulitzer Prize Winners and Finalists, 2004-2014": 0,
      "Pulitzer Prize Winners and Finalists, 1990-2014": 0,
    })
    assert.equal(updatedItem.Newspaper, "My new paper")

    //*************** remove existing item ***************//
    const removed = await circulationRepo.remove(addItemId)
    assert(removed)
    const deletedItem = await circulationRepo.getById(addItemId)
    assert.equal(deletedItem, null)
  } catch (error) {
    console.log(error)
  } finally {
    //const admin = client.db(dbName).admin()
    //console.log(await admin.serverStatus())

    //await client.db(dbName).dropDatabase()
    //console.log(await admin.listDatabases())

    client.close()
  }
}

main()
