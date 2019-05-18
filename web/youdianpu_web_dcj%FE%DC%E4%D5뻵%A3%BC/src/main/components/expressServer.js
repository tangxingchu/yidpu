const express = require('express');
const path = require('path');
const { probe } = require('../utils/utils');

module.exports = (callback) => {
    const port = 30141;
    probe(port, (flag) => {
        if(flag)  {
            callback();
        } else {
            const app = express();
            const publicPath = path.resolve(__dirname, '../../../public');
            
    
            // point for static assets
            app.use(express.static(publicPath));
    
            app.get('*', (request, response) => {
                response.sendFile(path.resolve(__dirname, '../../../public/index.html'))
            })
            const server = app.listen(port, () => {
                console.log('Express server listening on port ' + server.address().port);
                callback();
            }); 
        }
    })
       
}