// const getAdmDB = require('../utils/database').getAdmDB;
const getDB = require('../utils/database').getDb;
const listOfDBs = require('../utils/database').listOfDBs;
const mongoConnect = require('../utils/database');
const utils = require('../utils/utils');

module.exports = class Admin {
    constructor(data, _id, userId) {
        this._id = _id ? parseInt(_id) : '';
        this.userId = userId;
        Object.assign(this, data);
    }

    async save() {
        try {
            const db = getDB();
            const lastData = await db.collection('pages').find({}).sort({ _id: -1 }).limit(1).next(); //get last id
            this.addedAt = utils.newDateTime();

            if (lastData) {
                this._id = parseInt(lastData._id) + 1;
            } else {
                this._id = 1;
            }

            const result = await db.collection('pages').insertOne(this)
            return result;

        } catch (error) {
            console.log(error);
        }
    }
    
    async saveLogs() {
        try {
            const db = getDB();
            const lastData = await db.collection('log').find({}).sort({ _id: -1 }).limit(1).next(); //get last id
            this.addedAt = utils.newDateTime();

            if (lastData) {
                this._id = parseInt(lastData._id) + 1;
            } else {
                this._id = 1;
            }

            const result = await db.collection('log').insertOne(this)
            return result;

        } catch (error) {
            console.log(error);
        }
    }

    async update() {
        try {
            const db = getDB(this.slctdComp);
            const prevData = await Admin.findById(this._id, { prevEntry: 0, addedAt: 0 }); //projection: data w/o the cols mentioned
            this.updatedAt = utils.newDateTime();

            // const result = await db.collection('pages').updateOne({ _id: this._id }, { $set: this });
            const result = await db.collection('pages').findOneAndUpdate({ _id: this._id }, { $set: this, $push: { prevEntry: prevData } }, { returnOriginal: false });
            return result;

        } catch (error) {
            console.log(error);
            return error;
        }
    }

    static async Update(data, userId, userName, slctdComp) {
        try {
            const db = getDB(slctdComp);
            const Collection = data.Collection;

            const prevData = await db.collection(Collection).findOne({ _id: parseInt(data._id) }, { prevEntry: 0, addedAt: 0 }); //projection: data w/o the cols mentioned
            data.updatedAt = utils.newDateTime();
            data.userId = userId;
            data.userName = userName;
            data._id = Number(data._id);
            delete data.Collection;

            console.log('Data to Update:', data);
            const result = await db.collection(Collection).findOneAndUpdate({ _id: data._id }, { $set: data, $push: { prevData: prevData } }, { returnOriginal: false });
            return result;

        } catch (error) {
            console.log(error);
            return error;
        }
    }

    static async fetchAll() {
        try {
            const db = getDB();
            const result = await db.collection('pages').find().toArray()
            return result;

        } catch (error) {
            console.error(error);
        }
    }

    static async fetchAllPendingDocNos(slctComp) {
        try {
            const db = getDB(slctComp);
            const pendingSales = await db.collection('pendingSalesData').distinct('DOC_NO');
            const pendingCashSales = await db.collection('pendingCashSalesData').distinct('DOC_NO');
            const updateSalesRate = await db.collection('updateSalesRateData').distinct('DOC_NO');
            const pendingPurchase = await db.collection('pendingPurchaseData').distinct('DOC_NO');
            const pendingRecpay = await db.collection('pendingRecPayData').distinct('DOC_NO');
            const pendingJournal = await db.collection('pendingJournalData').distinct('DOC_NO');
            return {sales: pendingSales, pendingCashSales: pendingCashSales, updateSalesRate: updateSalesRate, purchase: pendingPurchase, recPay: pendingRecpay, journal: pendingJournal};

        } catch (error) {
            console.error(error);
        }
    }

    static async fetchCollections(adminDB, slctdComp) {
        try {
            let result, collectionNames = [];
            if (adminDB) {
                const db = getDB();
                result = await db.listCollections().forEach(element => {
                    collectionNames.push(element.name);
                });

            } else {
                const db = getDB(slctdComp);
                result = await db.listCollections().forEach(element => {
                    collectionNames.push(element.name);
                });
            }
            return collectionNames;

        } catch (error) {
            console.error(error);
        }
    }
    static async fetchListofDbs() {
        try {
            const dbLists = await listOfDBs();

            return dbLists;

        } catch (error) {
            console.error(error);
        }
    }  
    static async copyCollectionToDB(srcDB, tgtDB, srcCollectionName, tgtCollectionName) {
        try {
            const fromDB = await getDB(srcDB);
            let toDB;
            await mongoConnect.newMongoConnect(tgtDB, function (client, dbList) {
                toDB = dbList[tgtDB];
            });

            const srcData = await fromDB.collection(srcCollectionName).find().toArray();
            const result = await toDB.collection(tgtCollectionName).insertMany(srcData);

            return {collectionName: srcCollectionName, result: result.result};

        } catch (error) {
            console.log(error);
        }
    }
    static async fetchKey(adminDB, collectionName, slctdComp) {
        try {
            let keys = [], data;
            if (adminDB) {
                const db = getDB();
                const result = await db.collection(collectionName).findOne();
                keys = Object.keys(result);
                data = await db.collection(collectionName).find().toArray();
            } else {
                const db = getDB(slctdComp);
                const result = await db.collection(collectionName).find().forEach(function (result) {
                    let k = Object.keys(result);
                    for (let i = 0; i < k.length; i++) {
                        const el = k[i];
                        // if(!keys.includes(el)) keys.push(el);
                        if (keys.indexOf(el) < 0) keys.push(el);
                    }
                });
                data = await db.collection(collectionName).find().toArray();
            }
            return { keys: keys, data: data };

        } catch (error) {
            console.error(error);
        }
    }

    static async copyKey(adminDB, processData, slctdComp) {
        try {
            let rslt, cnt = 0;
            let collName = processData.collName, copyFrom = processData.copyFrom, copyTo = processData.copyTo, deleteOldKey = processData.deleteKey;
            if (adminDB) {
                const db = getDB();
                if (copyTo) {
                    //copy a column to another column
                    const result = await db.collection(collName).find().forEach(function (result) {
                        cnt++;
                        db.collection(collName).updateOne({ _id: result._id }, { $set: { [copyTo]: result[copyFrom] } });

                    });
                }

                if (deleteOldKey) {
                    const result = await db.collection(collName).updateMany({}, { $unset: { [copyFrom]: 1 } })
                    cnt = result.modifiedCount;
                }

            } else {
                const db = getDB(slctdComp);
                if (copyTo) {
                    //copy a column to another column
                    const result = await db.collection(collName).find().forEach(function (result) {
                        cnt++;
                        db.collection(collName).updateOne({ _id: result._id }, { $set: { [copyTo]: result[copyFrom] } });
                    });
                }

                if (deleteOldKey) {
                    const result = await db.collection(collName).updateMany({}, { $unset: { [copyFrom]: 1 } })
                    cnt = result.modifiedCount;
                }
            }
            if (copyTo) {
                rslt = cnt + ` rows Copied to '${copyTo}' ${deleteOldKey ? `and Deleted '${copyFrom}'` : ''} from collection '${collName}'`;
            } else if (!copyTo) {
                rslt = cnt + ` rows Deleted '${copyFrom}' from collection '${collName}'`;
            }
            return rslt;

        } catch (error) {
            console.error(error);
        }
    }
    static async fetchColumn(col) {
        try {
            const db = getDB();
            // const result = await db.collection('pages').find().toArray()
            const result = await db.collection('pages').distinct(col);
            return result;

        } catch (error) {
            console.error(error);
        }
    }
    static async findById(Id, projectFieldsObj) {
        try {
            const db = getDB();
            const result = await db.collection('pages').findOne({ _id: parseInt(Id) }, { projection: projectFieldsObj }); //projection: data w/o the cols mentioned
            return result;
        } catch (error) {
            console.log(error);
        }
    }
    static async findLastInserted() {
        try {
            const db = getDB();
            const result = await db.collection('pages').find({}).sort({ _id: -1 }).limit(1).next();
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}