function CorsMIddleware() {
  return (req, res, next) => {
    //  headers to allow  and help CORS
    res.header('Access-Control-Allow-Origin', '*'); //  change * to domain namen
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Access-Token,X-Key');
    if (req.method === 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  };
}

export default CorsMIddleware;
