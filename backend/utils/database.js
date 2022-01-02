const mongodb = require('mongodb');;
const MongoClient = mongodb.MongoClient;

let _dbAdm, _dbList = {};
const mongoConnect = async (cb) => {
  try {
    const admDbClient = await MongoClient.connect(`mongodb://${process.env.DBIP + process.env.dbName}`, { useUnifiedTopology: true });
    console.log(`Connected to ${process.env.dbName} mongoDB`);

    _dbAdm = admDbClient.db();

    //get all dbs list from admin DB
    // const dbList = await _dbAdm.collection('dbList').find().toArray();
    // let dbClient;

    //connect to all dbs in list
    // for (let i = 0; i < dbList.length; i++) {
    //   const dbName = dbList[i].ShortName;
    dbClient = await MongoClient.connect(`mongodb://${process.env.DBIP}algotrade`, { useUnifiedTopology: true });
    _dbList['algotrade'] = dbClient.db();
    // }

    cb(admDbClient, dbClient);

  } catch (err) {
    console.log(err);
  }
}

const listOfDBs = async () => {
  try {
    const dbClient = new MongoClient(`mongodb://${process.env.DBIP}`, { useUnifiedTopology: true });
    const client = await dbClient.connect();
    const dbs = await client.db().admin().listDatabases();

    const dbNames = dbs.databases.map(dbName => dbName.name);

    return dbNames;

  } catch (err) {
    console.log(err);
  }
}

const newMongoConnect = async (newDB, cb) => {
  try {

    const dbClient = await MongoClient.connect(`mongodb://${process.env.DBIP}` + newDB, { useUnifiedTopology: true });
    _dbList[newDB] = dbClient.db();
    console.log(`New db ${newDB} Created and Connected to ${newDB} mongoDB`);

    cb(dbClient, _dbList);

  } catch (err) {
    console.log(err);
  }
}

const getDb = (slctdCurrDB) => {
  if (_dbList[slctdCurrDB]) {
    return _dbList[slctdCurrDB];
  }

  console.log('slctdCurrDB:', slctdCurrDB, _dbList[slctdCurrDB])
  throw slctdCurrDB + ' Database not yet connected';
}

const getAdmDb = () => {
  if (_dbAdm) {
    // console.log('Admin Db Connected');
    return _dbAdm;
  }
  throw 'Admin Database not yet connected';
}


exports.mongoConnect = mongoConnect;
exports.newMongoConnect = newMongoConnect;
exports.getDb = getDb;
exports.getAdmDb = getAdmDb;
exports.listOfDBs = listOfDBs;