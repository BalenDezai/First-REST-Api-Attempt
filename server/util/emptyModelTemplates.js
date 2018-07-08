function recordGenerator(employeeId, mongooseInstance) {
  const jobTemplate = {
    _id: new mongooseInstance.Types.ObjectId(),
    _Owner: employeeId,
  };

  const walletTemplate = {
    _id: new mongooseInstance.Types.ObjectId(),
    _Owner: employeeId,
  };

  const workhourTemplate = {
    _id: new mongooseInstance.Types.ObjectId(),
    _Owner: employeeId,
  };

  return {
    jobTemplate,
    walletTemplate,
    workhourTemplate,
  };
}
module.exports = recordGenerator;
