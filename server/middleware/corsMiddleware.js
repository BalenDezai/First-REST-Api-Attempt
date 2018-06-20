function CorsMIddleware() {
  return (req, res, next) => {
    //  headers to allow  and help CORS
    res.header('Access-Control-Allow-Origin', '*'); //  change * to domain namen if neccesary
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Authorization, X-Access-Token,');
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.status(200).end();
    } else {
      next();
    }
  };
}

module.exports = CorsMIddleware;
