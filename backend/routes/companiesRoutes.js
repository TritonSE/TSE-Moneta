/**
 * API Routes for Companies Schema
 * POST /companies
 * DELETE /companies/:id
 * PUT /companies/:id
 * GET /companies/:id
 * GET /companies
 *
 * @summary Companies routes for add, edit, delete, and get
 * @author Pratyush Chand
 */

const express = require("express");
const User = require("../models/Users");

const router = express.Router();

<<<<<<< HEAD
// const companies = require("../models/Organizations");

// /** adds new company to database.
//  * @params Name, Email, and Password
//  * @return returns new company object if successfully created. Else, returns 409 or 500 errors.
//  */
// router.post("/companies", async (req, res) => {
//   try {
//     const { Name, Email, Password } = req.body;
//     const numMatched = await companies.count({ Email });

//     if (numMatched > 0) {
//       return res.status(409).json({ msg: "Email already registered!" });
//     }

//     const company = {
//       Name,
//       Email,
//       Password,
//     };

//     const addCompany = await companies.create(company);

//     if (addCompany) {
//       return res.status(200).json({
//         addCompany,
//       });
//     }

//     return res.status(500).json({
//       Error: "Error",
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: err });
//   }
// });

// /** edits company by ID from database.
//  * @params mongoose id
//  * @return returns success message. Else, returns 400 or 500 errors.
//  */
// router.put("/companies/:id", async (req, res) => {
//   try {
//     const companyExists = await companies.exists({ _id: req.params.id });

//     if (!companyExists) {
//       return res.status(400).json({ msg: "This company does not exist!" });
//     }

//     const { Name, Email, Password } = req.body;
//     const company = {
//       Name,
//       Email,
//       Password,
//     };

//     const editCompany = await companies.findOneAndUpdate(req.params.id, company);
//     if (editCompany) {
//       return res.status(200).json({
//         msg: "Company edited succesfully!",
//       });
//     }

//     return res.status(500).json({
//       Error: "Error",
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: err });
//   }
// });

// /** deletes company by ID from database.
//  * @params mongoose id
//  * @return returns success message. Else, returns 400 or 500 errors.
//  */
// router.delete("/companies/:id", async (req, res) => {
//   try {
//     const companyExists = await companies.exists({ _id: req.params.id });

//     if (!companyExists) {
//       return res.status(400).json({
//         msg: "This company does not exist",
//       });
//     }

//     const deletedCompany = await companies.findByIdAndDelete(req.params.id);

//     if (deletedCompany) {
//       return res.status(200).json({
//         msg: "Company deleted successfully!",
//       });
//     }

//     return res.status(500).json({
//       Error: "Error",
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: err });
//   }
// });

// /** gets company by ID from database.
//  * @params mongoose id
//  * @return returns company information. Else, returns 500 errors.
//  */
// router.get("/companies/:id", async (req, res) => {
//   try {
//     const companyExists = await companies.exists({ _id: req.params.id });
//     if (!companyExists) {
//       return res.status(400).json({
//         msg: "This company does not exist",
//       });
//     }

//     const getCompany = await companies.findById(req.params.id);
//     if (getCompany) {
//       return res.status(200).json({
//         getCompany,
//       });
//     }

//     return res.status(500).json({
//       Error: "Error",
//     });

//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: err });
//   }
// });

// /** gets all companies from database.
//  * @return returns list of all companies. Else, returns 500 errors.
//  */
// router.get("/companies", async (req, res) => {
//   try {
//     const listOfCompanies = await companies.find();
//     if (listOfCompanies) {
//       return res.status(200).json({
//         listOfCompanies,
//       });
//     }

//     return res.status(500).json({
//       Error: "Error",
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: err });
//   }
// });
=======
const companies = require("../models/Organizations");

/** adds new company to database.
 * @params Name, Email, and Password
 * @return returns new company object if successfully created. Else, returns 409 or 500 errors.
 */
router.post("/companies", async (req, res) => {
  try {
    const { Name, Email, Password } = req.body;
    const numMatched = await companies.count({ Email });

    if (numMatched > 0) {
      return res.status(409).json({ msg: "Email already registered!" });
    }

    const company = {
      Name,
      Email,
      Password,
    };

    const addCompany = await companies.create(company);

    if (addCompany) {
      return res.status(200).json({
        addCompany,
      });
    }

    return res.status(500).json({
      Error: "Error",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
});

/** edits company by ID from database.
 * @params mongoose id
 * @return returns success message. Else, returns 400 or 500 errors.
 */
router.put("/companies/:id", async (req, res) => {
  try {
    const companyExists = await companies.exists({ _id: req.params.id });

    if (!companyExists) {
      return res.status(400).json({ msg: "This company does not exist!" });
    }

    const { Name, Email, Password } = req.body;
    const company = {
      Name,
      Email,
      Password,
    };

    const editCompany = await companies.findOneAndUpdate(req.params.id, company);
    if (editCompany) {
      return res.status(200).json({
        msg: "Company edited succesfully!",
      });
    }

    return res.status(500).json({
      Error: "Error",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
});

/** deletes company by ID from database.
 * @params mongoose id
 * @return returns success message. Else, returns 400 or 500 errors.
 */
router.delete("/companies/:id", async (req, res) => {
  try {
    const companyExists = await companies.exists({ _id: req.params.id });

    if (!companyExists) {
      return res.status(400).json({
        msg: "This company does not exist",
      });
    }

    const deletedCompany = await companies.findByIdAndDelete(req.params.id);

    if (deletedCompany) {
      return res.status(200).json({
        msg: "Company deleted successfully!",
      });
    }

    return res.status(500).json({
      Error: "Error",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
});

/** gets company by ID from database.
 * @params mongoose id
 * @return returns company information. Else, returns 500 errors.
 */
router.get("/companies/:id", async (req, res) => {
  try {
    const companyExists = await companies.exists({ _id: req.params.id });
    if (!companyExists) {
      return res.status(400).json({
        msg: "This company does not exist",
      });
    }

    const getCompany = await companies.findById(req.params.id);
    if (getCompany) {
      return res.status(200).json({
        getCompany,
      });
    }

    return res.status(500).json({
      Error: "Error",
    });
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
});

/** gets all companies from database.
 * @return returns list of all companies. Else, returns 500 errors.
 */
router.get("/companies", async (req, res) => {
  try {
    const listOfCompanies = await companies.find();
    if (listOfCompanies) {
      return res.status(200).json({
        listOfCompanies,
      });
    }

    return res.status(500).json({
      Error: "Error",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
});
>>>>>>> 5564a30a841af5cae79136def675340780de8ea2

module.exports = router;
