const controllerHandler = (promise, params) => async (req, res, next) => {
  const boundParams = params ? params(req, res, next) : [];
  try {
    const result = await promise(...boundParams);
    return res.status(result.status || 200).json(result.result || { Message: 'Successful' });
  } catch (error) {
    return next(error);
  }
};

module.exports = controllerHandler;
