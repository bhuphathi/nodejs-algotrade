const getAdmDB = require('../utils/database').getAdmDb;
const utils = require('../utils/utils');

module.exports = class AccessData {
    constructor(data, _id, userId) {
        this._id = _id ? parseInt(_id) : '';
        this.userId = userId;
        Object.assign(this, data);
    }

    async save() {
        try {
            const db = getAdmDB();
            const lastData = await db.collection('accessLog').find({}).sort({ _id: -1 }).limit(1).next(); //get last id
            this.addedAt = utils.newDateTime();

            if (lastData) {
                !this._id ? this._id = parseInt(lastData._id) + 1 : '';
            } else {
                this._id = 1;
            }

            const result = await db.collection('accessLog').insertOne(this)
            //, { writeConcern: { w : "majority", wtimeout : 5000 } }
            return result;

        } catch (error) {
            console.log(error);
        }
    }


    static async fetchAll() {
        try {
            const db = getAdmDB();
            const result = await db.collection('accessLog').find().toArray()
            return result;

        } catch (error) {
            console.error(error);
        }
    }

    static async fetchColumn(col) {
        try {
            const db = getAdmDB();
            const result = await db.collection('accessLog').distinct(col);
            return result;

        } catch (error) {
            console.error(error);
        }
    }
    static async findById(Id, projectFieldsObj) {
        try {
            const db = getAdmDB();
            const result = await db.collection('accessLog').findOne({ _id: parseInt(Id) }, { projection: projectFieldsObj }); //projection: data w/o the cols mentioned
            return result;
        } catch (error) {
            console.log(error);
        }
    }
    static async findLastInserted() {
        try {
            const db = getAdmDB();
            const result = await db.collection('accessLog').find({}).sort({ _id: -1 }).limit(1).next();
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}