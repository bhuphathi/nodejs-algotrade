const AuthToken = require('../models/authToken');
const Utils = require('../utils/utils');

exports.saveAuthToken = async (req, res, next) => {

  if(req.url.includes('?code')){
    const authCode = Utils.authCodeSplit(req);
    const authTokenCode = new AuthToken(authCode)
    const result = await authTokenCode.save();

    console.log('saveResult:', result)
    //saveResult: { acknowledged: true, insertedId: 3 }
  }

  res.redirect('/logged');
};