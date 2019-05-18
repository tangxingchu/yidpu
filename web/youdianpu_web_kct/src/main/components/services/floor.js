const db = require('../db');
const fetch = require("node-fetch");
const path = require('path');
const fs = require("fs");
const { app } = require('electron');
const { apiHost } = require('./apihost');

const selectFloor = () => {
    return db.sql(`select id, floor_name as floorName, floor_desc as floorDesc, merchant_id as merchantId, status, sort_no as sortNo
        from floor order by sort_no asc`, [], 'all')
}

const selectFloorById = (floorId, token) => {
    const headers = { 'Content-type': "application/json", "Authorization": token };
    const destPath = path.join(app.getPath('userData'), `${floorId}.xml`);
    return fetch(`${apiHost}/api/floorPlan/open/${floorId}`, { method: 'GET', headers }).then(res => res.text()).then(xmlData => {
        fs.writeFile(destPath, xmlData, () => { });
        return xmlData;
    });
}

module.exports = {
    selectFloor,
    selectFloorById,
};