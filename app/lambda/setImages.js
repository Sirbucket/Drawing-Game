import request from 'request'
export const handler = function(event, context, callback) { //Stuff is not sending
    let key = process.env.RESTDB_KEY
    
    let parameters = event.queryStringParameters
    let name = parameters.name
    let reports = parameters.reports
    
    let options = {
        method: 'POST',
        url: 'https://drawinggame-0a58.restdb.io/rest/images',
        headers: {'cache-control': 'no-cache', 'x-apikey': key, 'content-type': 'application/json'}, //Create json
        body: {
            name: name, //Name of image
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