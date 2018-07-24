/**
 * Created by bhavyaagg on 16/06/18.
 */

const errorFunction = (req, res, code, message) => {
  return (err) => {
    console.log(err);
    return res.status(code).json({
      success: false,
      code: code.toString(),
      error: {
        message
      }
    })
  }
}

module.exports = {
  errorFunction
}
