import officeDb from '../models/offices';

class Office {
    /**
    * 1. CREATE - create a new office object
    * @method createOffice
    * @parameters {object} req
    * @parameters {object} res
    * @return {object} The new office that was just created
    */

    static createOffice(req, res) {
        // user is expected to send the name and type in the req.body, so we destructure it
        const {name, type} = req.body;

        // create the new office with the data received
        let newOffice = {
            "id": officeDb.length + 1,
            name,
            type
        }

        // add the newly created office inside the mock database array
        officeDb.push(newOffice);

        // return appropriate message to the user
        return res.status(201).json({
           success: true,
           message: "Succesfuly created Office"
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
        const {id} = req.params;

        // find the requested office from mock array database
        //the find method loops through the elements in the office database and returns the one for which obj.id = requested id
        const requestedOffice = officeDb.find(currentElement => currentElement.id === id);

        // return appropriate message and single requested office to the user
        return res.status(200).json({
            success: true,
            message: 'Successfully Retrieved Requested Office',
            data: requestedOffice
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
            success: true,
            message: 'Successfully Retrieved Requested Office',
            data: requestedOffice
        });
    }
    // get all offices end


    /**
    * 4. UPDATE - update a single office 
    * @method updateOffice
    * @parameters {object} req
    * @parameters {object} res
    * @return {object} The new office that was updated
    */

    static updateOffice(req, res) {
        // user is expected to send the name and type in the req.body
        // the id to be used is sent as a url parameter
        const {id} = req.params;
        const {name, type} = req.body;

        // find the specific office
        let officeUpdate = officeDb.find(currentElement => currentElement.id === id);

        // re-assign officeUpdate 
        officeUpdate = {
            "id": id,
            name,
            type
        } 

        res.status(200).json({
            status: 200,
            data: officeUpdate,
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
        res.status(200).json({
            status: 200,
            data: [party],
          });
    
    }
    // delete a single office end

// end of class
}
  
export default Office;  