function MessageService(statusCode, message) {
  return (req, res) => {
    res.status(statusCode).json({
      status: statusCode,
      message,
    });
  };
}

export default MessageService;
