const fs = require('fs');
const utils = require('../utils/utils');

module.exports = class Utils {

    static newDateTime() {
        return new Date().toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).split('/').reverse().join('-') + ' ' + new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(/[:]/g, '-')
    }

    static convertDate(inpDate) {
        function addZero(s) { return (s < 10) ? '0' + s : s; } //add '0' to single digit
        const date = new Date(inpDate)
        const ddmmyyyy = [addZero(date.getDate()), addZero(date.getMonth()+1), date.getFullYear()].join('-');
        const hhmm = [date.getHours(), date.getMinutes()].join(':');
        return [ddmmyyyy, hhmm]
      }

    static ddmmyyyyDateTime() {
        return new Date().toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).split('/').join('-') + ', ' + new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(/[:]/g, '-')
    }

    static ddmmyyyy() {
        return new Date().toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).split('/').join('-')
    }
    static newTallyDate() {
        return new Date().toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).split('/').reverse().join('');
    }

    static excelDateConvert(dt) {

        return new Date(Math.round((dt - 25569) * 86400 * 1000)).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).replace(/[/]/g, '-');
    }

    static dateToTally(data) {
        let yyyymmddDate;
        if (data.substr(2, 1) == "/") {
            yyyymmddDate = data.split('/').reverse().join('');
        } else if (data.substr(2, 1) == "-") {
            yyyymmddDate = data.split('-').reverse().join('');
        }
        return yyyymmddDate;
    }
    //Sort Date in object Array [{o.date, o.no,...}, {o.date, o.no,...}]
    static sortDate(data, dateFeild, order, separator='-') {
        //sort string date format 'dd-mm-yyyy' data
        if (order === 'asc') {
            data.sort(function (a, b) {
                if(!a[dateFeild] || !b[dateFeild]) return 1;
                const aDateParts = a[dateFeild].split(separator);
                const bDateParts = b[dateFeild].split(separator);

                //Date(year, month, date); //month is 0-based so, aDateParts[1] - 1
                const aDate = new Date(+aDateParts[2], aDateParts[1] - 1, +aDateParts[0]);
                const bDate = new Date(+bDateParts[2], bDateParts[1] - 1, +bDateParts[0]);

                return new Date(aDate) - new Date(bDate);

            });

        } else if (order === 'des') {
            data.sort(function (a, b) {
                if(!a[dateFeild] || !b[dateFeild]) return -1;
                const aDateParts = a[dateFeild].split(separator);
                const bDateParts = b[dateFeild].split(separator);

                //Date(year, month, date); //month is 0-based so, aDateParts[1] - 1
                const aDate = new Date(+aDateParts[2], aDateParts[1] - 1, +aDateParts[0]);
                const bDate = new Date(+bDateParts[2], bDateParts[1] - 1, +bDateParts[0]);

                return new Date(bDate) - new Date(aDate);

            });
        }
        //Calculates process time
        // let processTime = process.hrtime();

        // processTime = process.hrtime(processTime);
        // processTime[1] = processTime[1] / 1000000; //nano to millisec
        // console.log('processTime:', processTime);
    }

    static sortOrderArray(mainArray, sortOrderArray) {
        try {
            //removes if element not in main array ['a', 'b', 'f', 'e'] removes 'f' if 'f' is not presetn in main array
            // sortOrderArray = sortOrderArray.filter(item => mainArray.includes(item));
            sortOrderArray = sortOrderArray.filter(item => mainArray.indexOf(item) > -1);
            // mainArray.sort(); //sorting main array
            let newArr = mainArray.slice(0); //clone newArray from main array
            newArr = newArr.filter(item => !sortOrderArray.includes(item)); //removes el in sort order array
            return [...sortOrderArray, ...newArr];

        } catch (error) {
            console.error(error);
        }
    }

    static sortObjArray(data, key, order='asc') {
        if(order.toLocaleLowerCase() === 'asc'){
            return data.sort(function(a, b) {
                const x = a[key]; 
                const y = b[key];
                
                return ((x < y) ? 1 : ((x > y) ? -1 : 0));
            });
        }else if(order.toLocaleLowerCase() === 'des'){
            return data.sort(function(a, b) {
                const x = a[key]; 
                const y = b[key];
                
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }
    }
    static objToArray(data) {
        try {
            let header = [], rowData = [], count = 0;

            for (const row of data) {
                let tempData = [];
                count++;
                for (const key in row) {
                    if (count === 1) {
                        header.push({ 'title': key });
                    }
                    tempData.push(row[key]);
                }
                rowData.push(tempData);
            }
            return { header, rowData }

        } catch (error) {
            console.error(error);
            console.error('utils result:', data);
        }
    }

    static arraytoObj(headerArr, rowArr) {
        try {
            let header = [];
            let dataObj = [];

            if (headerArr[0].hasOwnProperty('NAME')) {
                for (let i = 0; i < headerArr.length; i++) {
                    header.push(headerArr[i].NAME[0].replace('$', '').replace('_', ''));
                }
            } else {
                for (let i = 0; i < headerArr.length; i++) {
                    header.push(headerArr[i]);
                }
            }

            if (rowArr[0].hasOwnProperty('COL')) {
                for (let i = 0; i < rowArr.length; i++) {
                    let rowObj = {};
                    for (let j = 0; j < header.length; j++) {
                        rowObj[header[j]] = rowArr[i].COL[j];
                    }
                    dataObj.push(rowObj);
                }
            } else {
                let rowObj = {};
                for (let j = 0; j < header.length; j++) {
                    rowObj[header[j]] = rowArr[j];
                }
                dataObj.push(rowObj);

            }
            return dataObj;

        } catch (error) {
            console.error(error);
            console.log('utils result:', 'headerArr', headerArr, 'rowArr', rowArr);
        }
    }

    static tlyAppError(err) {
        try {
            let cmnt, stack, Success;
            if (err.code === 'ECONNREFUSED') {
                cmnt = 'Tally is not running, please open Tally...'
                stack = err.stack.toString().replace(/GitHub\\ERP-Tally-Integration\\/gm, '');
                Success = false;
            } else {
                console.log('err:', err);
                console.log('err.message', err.message);
                console.log('err.stack', err.stack.toString());
                let Err = err.Error || err.TypeError || err.toString();
                // let a = JSON.stringify(Err);
                // console.log(a);
                stack = err.stack.toString().replace(/GitHub\\ERP-Tally-Integration\\/gm, '');
                cmnt = Err ? Err.replace(/Error: /gm, '') : 'UnKnown Error Happened in Tally.., ' + err.type + ' ' + err.code + ' ' + err.errno;
                Success = false;
            }
            return { cmnt: cmnt, stack: stack, Success: Success };

        } catch (error) {
            console.error(error);
            console.log('utils result:', err);
        }
    }

    static tlyResponse(result, xmlData, data) {
        try {
            let tlyResponse = {};
            let Name = '';
            let DOC_NO = '';

            if (data) {
                if (data.PARTY) {
                    Name = data.PARTY;
                    DOC_NO = data.DOC_NO;
                } else if (data.Item_Name) {
                    Name = data.Item_Name;
                } else if (data.Tly_Name) {
                    Name = data.Tly_Name;
                } else if (data.Name) {
                    Name = data.Name;
                }
            }

            if (result.hasOwnProperty('RESPONSE')) {
                if (typeof (result.RESPONSE) === 'string' && result.RESPONSE.includes('Unknown Request')) {
                    tlyResponse = { comment: 'Tally Response: ' + result.RESPONSE, Success: false }
                    console.log('utils result: Tally Unknown Request: ' + result, '\nxmlData:\n', xmlData, '\ndata:', data);
                    this.writeFile(`<TALLYRESPONSE>${JSON.stringify(result)}\n</TALLYRESPONSE>\n<DBDATA>${JSON.stringify(data)}\n</DBDATA>\n${xmlData}`, 'Error-' + this.newDateTime(), '../../../xmlData/Error/');

                } else if (result.RESPONSE.LINEERROR) {
                    if (result.RESPONSE.LINEERROR[0].includes("Could not set 'SVCurrentCompany'")) {
                        tlyResponse = { comment: 'Selected Company not opened in Tally...', Success: false }

                    } else if (result.RESPONSE.LINEERROR[0].includes("Unit") && result.RESPONSE.LINEERROR[0].includes("does not exist!")) {
                        tlyResponse = { comment: `UOM '${data.UOM}' doses not exist in tally pls create`, Success: false, Action: 'CreateUOM' }

                    } else if (result.RESPONSE.LINEERROR[0].includes("Stock Group") && result.RESPONSE.LINEERROR[0].includes("does not exist!")) {
                        tlyResponse = { comment: `Select Tally Stock Group (Tally Parent) for`, Success: false, Action: 'SelectParent' }

                    } else if (result.RESPONSE.LINEERROR[0].includes("Group Name not given") || result.RESPONSE.LINEERROR[0].includes("Group 'undefined' does not exist!")) {
                        tlyResponse = { comment: `Select Tally Parent Ledger for`, Success: false, Action: 'SelectParent' }

                    } else if (result.RESPONSE.ERRORS) {
                        if (result.RESPONSE.LINEERROR) {
                            let err = result.RESPONSE.LINEERROR[0];
                            if (err.includes('Stock Item') && err.includes('does not exist!')) {

                                tlyResponse = { comment: DOC_NO + `, Tally Response: <a href="/ErpStockItemMapping/${err.split("'")[1].replace('%', '')}" target="_blank">` + result.RESPONSE.LINEERROR[0] + '</a>', Success: false }
                                console.log('utils result: Tally Stock Item does not exist: ' + result, '\nxmlData:\n', xmlData, '\ndata:', data);
                                this.writeFile(`<TALLYRESPONSE>${JSON.stringify(result)}\n</TALLYRESPONSE>\n<DBDATA>${JSON.stringify(data)}\n</DBDATA>\n${xmlData}`, 'Error-' + this.newDateTime(), '../../../xmlData/Error/');

                            } else if (err.includes('Ledger') && err.includes('does not exist!')) {

                                tlyResponse = { comment: DOC_NO + `, Tally Response: <a href="/TallyLedgerMapping/${err.split("'")[1].replace('%', '')}" target="_blank">`+ result.RESPONSE.LINEERROR[0] + `, match in Tally Ledger</a> or in <a href="/ERPAcListMapping/${err.split("'")[1].replace('%', '')}" target="_blank"> ERP Ac List Mapping </a>`, Success: false }
                                console.log('utils result: Tally Ledger does not exist: ' + result, '\nxmlData:\n', xmlData, '\ndata:', data);
                                this.writeFile(`<TALLYRESPONSE>${JSON.stringify(result)}\n</TALLYRESPONSE>\n<DBDATA>${JSON.stringify(data)}\n</DBDATA>\n${xmlData}`, 'Error-' + this.newDateTime(), '../../../xmlData/Error/');

                            } else {
                                tlyResponse = { comment: result.RESPONSE.LINEERROR[0], Success: false }
                                console.log('utils result: Tally Response: ' + result, '\nxmlData:\n', xmlData, '\ndata:', data);
                                this.writeFile(`<TALLYRESPONSE>${JSON.stringify(result)}\n</TALLYRESPONSE>\n<DBDATA>${JSON.stringify(data)}\n</DBDATA>\n${xmlData}`, 'Error-' + this.newDateTime(), '../../../xmlData/Error/');
                            }
                        } else {
                            tlyResponse = { comment: 'Error in Tally', Success: false }
                            console.log('utils result: Error in Tally' + result, '\nxmlData:\n', xmlData, '\ndata:', data);
                            this.writeFile(`<TALLYRESPONSE>${JSON.stringify(result)}\n</TALLYRESPONSE>\n<DBDATA>${JSON.stringify(data)}\n</DBDATA>\n${xmlData}`, 'Error-' + this.newDateTime(), '../../../xmlData/Error/');
                        }

                    }
                } else if (result.RESPONSE.CREATED[0] * 1) {
                    tlyResponse = { comment: 'Created: ' + DOC_NO + ' Name: ' + Name, Success: true, Name: 'Created' }
                } else if (result.RESPONSE.ALTERED[0] * 1) {
                    tlyResponse = { comment: 'Altered: ' + DOC_NO + ' Name: ' + Name, Success: true, Name: 'Altered' }
                } else if (result.RESPONSE.LINEERROR) {
                    if (result.RESPONSE.ERRORS[0] * 1 && result.RESPONSE.LINEERROR[0].includes("Group 'undefined' does not exist")) {
                        tlyResponse = { comment: '*** Please Select the Parent ledger ***', Success: false }
                    }
                } else if (result.RESPONSE.ERRORS[0]) {
                    tlyResponse = { comment: 'Error in Tally', Success: false }
                    console.log('result:', 'Error in Tally' + result, '\nxmlData:\n', xmlData, '\ndata:', data);
                    this.writeFile(`<TALLYRESPONSE>${JSON.stringify(result)}\n</TALLYRESPONSE>\n<DBDATA>${JSON.stringify(data)}\n</DBDATA>\n${xmlData}`, 'Error-' + this.newDateTime(), '../../../xmlData/Error/');
                }
            } else if (result.ENVELOPE) {
                tlyResponse = { comment: 'Success!', Success: true }
            }
            // console.log(result.text());
            // console.log(result);
            // console.log(tlyResponse);
            return tlyResponse;
        } catch (error) {
            console.error(error);
            console.log('utils result:', result);
            console.log('utils xmlData:', xmlData, '\ndata:', data);
            this.writeFile(`<TALLYRESPONSE>${JSON.stringify(result)}\n</TALLYRESPONSE>\n<DBDATA>${JSON.stringify(data)}\n</DBDATA>\n${xmlData}`, 'Error-' + this.newDateTime(), '../../../xmlData/Error/');

        }
    }

    static dbUpdCmnt(result) {
        try {
            let insertCnt = 0, modified = 0, cmnt, Success = false;

            if (!(result instanceof Array)) {
                if (result.lastErrorObject) {
                    modified = result.lastErrorObject.n;
                    insertCnt = 0;
                    cmnt = result.lastErrorObject.updatedExisting ? 'Updated Existing!' : 'Nothing Updated';
                } else {
                    console.log(result.result);
                    modified = result.modifiedCount;
                    insertCnt = result.upsertedCount;
                }
            } else {
                modified = result.reduce((Count, { modifiedCount }) => Count + modifiedCount, 0);
                result.forEach(element => {
                    if (element.upsertedCount) insertCnt++;
                });
            }

            if (result.lastErrorObject) {

            } else if (modified || insertCnt) {
                console.log(modified, 'Rows Modified');
                console.log(insertCnt, 'Rows Inserted');
                cmnt = 'Success!'
                Success = true;
            } else {
                console.log('Utils, Result:', result);
                console.log(modified, 'Rows Modified');
                console.log(insertCnt, 'Rows Inserted');
                cmnt = 'No Changes Made!'
                Success = false;
            }

            return { comment: cmnt, modified: modified, inserted: insertCnt, Success: Success  };
        } catch (error) {
            console.error(error);
            console.log('utils result:', result);
        }
    }

    static dbInsrtCmnt(result) {
        try {
            let insertCnt = 0, modified = 0, cmnt, Success = false;

            if (!(result instanceof Array)) {
                // console.log(result);
                if (result.lastErrorObject) {
                    modified = result.lastErrorObject.n;
                    insertCnt = 0;
                    cmnt = result.lastErrorObject.updatedExisting ? 'Updated Existing!' : 'Nothing Updated';
                } else {
                    console.log(result.result);
                    modified = result.modifiedCount;
                    insertCnt = result.upsertedCount || result.insertedCount;
                }
            } else {

                insertCnt = result.reduce((Count, { insertedCount }) => Count + insertedCount, 0);
                // result.forEach(element => {
                //     if (element.upserted) insertCnt++;
                // });
            }

            if (result.lastErrorObject) {

            } else if (modified || insertCnt) {
                cmnt = 'Success! '
                cmnt += modified ? (modified + ' Rows Modified') : '';
                cmnt += insertCnt ? (insertCnt + ' Rows Inserted') : '';
                console.log(cmnt);
                Success = true;
            } else {
                console.log('Utils, Result:', result);
                cmnt = 'No Changes Made!';
                cmnt += modified ? (modified + ' Rows Modified') : '';
                cmnt += insertCnt ? (insertCnt + ' Rows Inserted') : '';
                console.log(cmnt);
                Success = false;
            }

            return { comment: cmnt, modified: modified, inserted: insertCnt, Success: Success };
        } catch (error) {
            console.error(error);
            console.log('utils result:', result);
        }
    }

    static dbDelCmnt(result, data) {
        try {
            let deleted = 0, cmnt, Success = false;

            if (!(result instanceof Array)) {
                if (result.lastErrorObject) {
                    deleted = result.lastErrorObject.n;
                    cmnt = result.lastErrorObject.updatedExisting ? 'Deleted Existing!' : 'Nothing Deleted';
                } else {
                    console.log(result.result);
                    deleted = result.deletedCount;
                }
            } else {
                deleted = result.reduce((Count, { deletedCount }) => Count + deletedCount, 0);
            }

            if (result.lastErrorObject) {

            } else if (deleted) {
                console.log(deleted, 'Rows deleted');
                cmnt = `Deleted ${data.Name || data.Item_Name || data.Party || data.PARTY || data.PARTY_NAME || data.ACCOUNT_NAME} Success!`
                Success = true;
            } else {
                console.log('Utils, Result:', result);
                console.log('No Rows deleted');
                cmnt = 'No Changes Made!';
                Success = false;
            }

            return { comment: cmnt, deleted: deleted, Success: Success };
        } catch (error) {
            console.error(error);
            console.log('utils result:', result);
        }
    }

    static async writeFile(xmlTxtResponse, fileName, folder) {
        try {

            console.log('Writing File to Disk...');
            const fName = fileName + '.xml';
            await fs.writeFile(folder + fName, xmlTxtResponse, function (err) {
                if (err) return console.log(err);
            });
        } catch (error) {
            console.error(error);
        }
    }

    static authCodeSplit = (req) => {
        const dataObj = {}
        if(req.url.includes('?code')){
            const urlData = req.url.split('?')[1].split('&')
            urlData.map(data => {
                const splitData = data.split('=');
                dataObj[splitData[0]] = splitData[1];
            })
        }
        return dataObj;
    } 
}
