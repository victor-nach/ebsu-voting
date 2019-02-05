import { validationResult } from 'express-validator/check';

// A function that allows us to validate all the results returned by validate.js
function validateResult(req, res, next) {
  const errors = validationResult(req);

  // if we have any errors
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({
        status: 400,
        // return an array of the errors and our custom message
        error: errors.array()[0],
      });
  }

  // pass control to the next middleware
  return next();
}

export default validateResult;
