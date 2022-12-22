import request from 'request'

export const handler = function(event, context, callback) {
    let key = process.env.RESTDB_KEY
    let options = {
        method: 'GET',
        url: 'https://drawinggame-0a58.restdb.io/rest/images',
        headers: {'cache-control': 'no-cache', 'x-apikey': key}
    };

    const cb = function(err, response, body) {
        callback(null, {statuscode: 200, body});
    }

    request(options, cb)
}