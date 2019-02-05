import officeDb from '../models/offices';

class officeController {
  /**
    * 1. CREATE - create a new office object
    * @method createOffice
    * @parameters {object} req
    * @parameters {object} res
    * @return {object} The new office that was just created
  */

  static createOffice(req, res) {
    // user is expected to send the name and type in the req.body, so we destructure it
    const { name, type } = req.body;

    // create the new office with the data received
    const newOffice = {
      id: officeDb.length + 1,
      name,
      type,
    };

    // add the newly created office inside the mock database array
    officeDb.push(newOffice);

    // return appropriate message to the user
    return res.status(201).json({
      status: 201,
      data: newOffice,
      message: 'The office has been succesfuly created and added to storage',
    });
  }
  //   create office end


  /**
    * 2. RETRIEVE - get a single office object
    * @method getSingleOffice
    * @parameters {object} req
    * @parameters {object} res
    * @return {object} The new office that was requested for
  */

  static getSingleOffice(req, res) {
    // the id to be used is sent as a url parameter
    const { id } = req.params;

    // find the requested office from mock array database
    // the find method loops through the elements and returns the one for which obj.id = req.id
    const requestedOffice = officeDb.find(currentElement => currentElement.id === id);

    // return appropriate message and single requested office to the user
    return res.status(200).json({
      status: 200,
      data: requestedOffice,
      message: 'The office you requested for has been succesfully returned',
    });
  }
  // get single office end


  /**
    * 3. RETRIEVE - get all offices as an array
    * @method getAllOffices
    * @parameters {object} req
    * @parameters {object} res
    * @return [array] An array Containing all the offices available
  */

  static getAllOffices(req, res) {
    // In this case no specific data is provided

    // return appropriate message and array of all offices to the user
    return res.status(200).json({
      status: 200,
      data: officeDb,
      message: 'You have successfully Retrieved all the available office records',
    });
  }
  // get all offices end


  /**
    * 4. UPDATE - update name of a single office
    * @method updateOffice
    * @parameters {object} req
    * @parameters {object} res
    * @return {object} The new office that was updated
  */

  static updateOffice(req, res) {
    // the id and the new name to be used is sent as a url parameter
    const { id, name } = req.params;

    // find the specific office
    const officeUpdate = officeDb.find(currentElement => currentElement.id === id);

    // re-assign only the name property of officeUpdate
    officeUpdate.name = name;

    //  send the appropriate message
    res.status(200).json({
      status: 200,
      data: officeUpdate,
      message: 'The office has been successfully updated.',
    });
  }
  // update a single office end


  /**
    * 5. DELETE - delete a single office
    * @method deleteOffice
    * @parameters {object} req
    * @parameters {object} res
    * @return [array] The updated list of offices as an array
    */

  static deleteOffice(req, res) {
    // The id of the office to be deleted is sent as a rquest parameter
    const { id } = req.params;

    // get the index position of the specific office to be deleted
    const requestedOfficeId = officeDb.findIndex(currentElement => currentElement.id === id);

    // Delete the specific office with that particular index
    officeDb.splice(requestedOfficeId, 1);

    res.status(200).json({
      status: 200,
      data: officeDb,
      message: 'The office you requested has been sucesfully reomoved from storage',
    });
  }
  // delete a single office end

// end of class
}

export default officeController;
