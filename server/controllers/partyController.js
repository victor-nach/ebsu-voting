import partyDb from '../models/parties';

class Party {
  /**
    * 1. CREATE - create a new Party object
    * @method createParty
    * @parameters {object} req
    * @parameters {object} res
    * @return {object} The new Party that was just created
  */

  static createParty(req, res) {
    // user is expected to send the name and hqAddress, logoUrl website and slogan in the req.body
    const {
      name, hqAddress, logoUrl, website, slogan,
    } = req.body;

    // create the new Party with the data received
    const newParty = {
      id: partyDb.length + 1,
      name,
      hqAddress,
      logoUrl,
      website,
      slogan,
    };

    // add the newly created Party inside the mock database array
    partyDb.push(newParty);

    // return appropriate message to the user
    return res.status(201).json({
      status: 201,
      data: newParty,
      message: 'The Party has been succesfuly created and added to storage',
    });
  }
  // create Party end

  /**
    * 2. RETRIEVE - get a single Party object
    * @method getSingleParty
    * @parameters {object} req
    * @parameters {object} res
    * @return {object} The new Party that was requested for
  */

  static getSingleParty(req, res) {
    // the id to be used is sent as a url parameter
    const { id } = req.params;

    // find the requested Party from mock array database
    // the find method loops through the elements and returns the one for which obj.id = req.id
    const requestedParty = partyDb.find(currentElement => currentElement.id === id);

    // return appropriate message and single requested Party to the user
    return res.status(200).json({
      status: 200,
      data: requestedParty,
      message: 'The Party you requested for has been succesfully returned',
    });
  }
  // get single Party end


  /**
    * 3. RETRIEVE - get all parties as an array
    * @method getAllparties
    * @parameters {object} req
    * @parameters {object} res
    * @return [array] An array Containing all the parties available
    */

  static getAllparties(req, res) {
    // In this case no specific data is provided

    // return appropriate message and array of all parties to the user
    return res.status(200).json({
      status: 200,
      data: partyDb,
      message: 'You have successfully Retrieved all the available Party records',
    });
  }
  // get all parties end


  /**
    * 4. UPDATE - update a single Party
    * @method updateParty
    * @parameters {object} req
    * @parameters {object} res
    * @return {object} The new Party that was updated
  */

  static updateParty(req, res) {
    // the id and the new name to be used is sent as a url parameter
    const { id, name } = req.params;

    // find the specific Party
    const PartyUpdate = partyDb.find(currentElement => currentElement.id === id);

    // re-assign PartyUpdate
    PartyUpdate.name = name;

    // return the appropriate message
    res.status(200).json({
      status: 200,
      data: PartyUpdate,
      message: 'The Party has been successfully updated.',
    });
  }
  // update a single Party end


  /**
    * 5. DELETE - delete a single Party
    * @method deleteParty
    * @parameters {object} req
    * @parameters {object} res
    * @return [array] The updated list of parties as an array
  */

  static deleteParty(req, res) {
    // The id of the Party to be deleted is sent as a rquest parameter
    const { id } = req.params;

    // get the index position of the specific Party to be deleted
    const requestedPartyId = partyDb.findIndex(currentElement => currentElement.id === id);

    // Delete the specific Party with that particular index
    partyDb.splice(requestedPartyId, 1);

    res.status(200).json({
      status: 200,
      data: partyDb,
      message: 'The Party you requested has been sucesfully reomoved from storage',
    });
  }
  // delete a single Party end

// end of class
}

export default Party;
