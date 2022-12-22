export default {
  server: {
    host: '0.0.0.0',
    proxy: {
      './netlify/' : {
        target : 'https://localhost:9000',
        pathRewrite : {
          "^/.netlify/functions" : ""
        }
      }
    }   
  }
}