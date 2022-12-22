import request from 'request'
import {addToServerData} from '../app.js'

export const handler = function(event, context, callback) {
    let key = process.env.RESTDB_KEY
    for (let i = addToServerData.length; i > 0; --i) { //Iterate backwards to ensure .pop works properly
        let options = {
            method: 'POST',
            url: 'https://drawinggame-0a58.restdb.io/rest/images',
            headers: {'cache-control': 'no-cache', 'x-apikey': key, 'content-type': 'application/json'}, //Create json
            body: {
                image: addToServerData[i].image, //Image url
                name: addToServerData[i].name, //Name of image
                likes: addToServerData[i].likes, //Sends in likes
                dislikes: addToServerData[i].dislikes, //Sends in dislikes
                reports: addToServerData[i].reports //Sends in reports
            },
            json: true
        };

        const cb = function(err, response, body) {
            if (err) return console.log(err);

            callback(null, {
                statuscode: 200, 
                body: JSON.stringify(body)
            });
        }

        request(options, cb)

        addToServerData.pop() //Remove this element from array
    }
}