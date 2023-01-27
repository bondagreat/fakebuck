module.exports = (req, res, next) => {
  res.status(404).json({ Message: 'Resource not found on this server' });
};
