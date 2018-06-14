function MessageService(statusCode, message) {
  return (req, res) => {
    res.status(statusCode).send(message);
  };
}

export default MessageService;
