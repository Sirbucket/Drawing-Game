export const handler = function (event, context, callback) {
    let parameters = event.queryStringParameters;
    let secret = process.env.SECRET;
    let number = Number(parameters.number);
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        'message':` secret is ${secret}
        pop I received parameters : ${JSON.stringify(parameters)}.
And then I did some magic using a SERVER-SIDE SECRET to turn 
your NUMBER into a secretly magical result: ${number*Number(secret)}
      `,
        'result':number*Number(secret),      
      }),
    });
  };