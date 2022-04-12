const resDataFuc = async (
    res,
    status,
    statusCode,
    isProceed,
    message,
    length = 0,
    data = "No result found",
    error = "No Error"
  ) => {


    res.status(statusCode).json({
      status,
      statusCode,
      isProceed,
      message,
      length,
      data,
      error,
    });
    return;
  };


  export {resDataFuc}