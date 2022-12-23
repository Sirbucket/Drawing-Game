import request from 'request'
import {addToServerData} from '../app'
//WHERE AM I CALLING DOCUMENT!!!!??????????
export const handler = function(event, context, callback) { //I don't understand how to put things in the database, wait for Mr. Hinkle to be available.
    let key = process.env.RESTDB_KEY
    let parameters = event.queryStringParameters
    let image = parameters.image
    let name = parameters.name
    let likes = parameters.likes
    let dislikes = parameters.dislikes
    let reports = parameters.reports
    
    
    let options = {
        method: 'POST',
        url: 'https://drawinggame-0a58.restdb.io/rest/images',
        headers: {'cache-control': 'no-cache', 'x-apikey': key, 'content-type': 'application/json'}, //Create json
        body: {
            image: image, //Image url
            name: name, //Name of image
            likes: likes, //Sends in likes
            dislikes: dislikes, //Sends in dislikes
            reports: reports //Sends in reports
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
}