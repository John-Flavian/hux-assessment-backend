import express from "express";
import ContactController from "../controllers/Contact.js";
import authProtect from "../middlewares/authProtect.js";

const router = express.Router();

// @desc      Create a contact
// @route     POST /api/contacts
// @access    Private
router.post("/", authProtect, ContactController.createContact);

// @desc      Get all contacts of a user
// @route     GET /api/contacts
// @access    Private (users)
router.get("/", authProtect, ContactController.getAllUserContacts);

// @desc      Edit a contact
// @route     PUT /api/contacts/:id
// @access    Private (users)
router.put("/:id", authProtect, ContactController.editContact);

// @desc      Get one contact
// @route     GET /api/contacts/:id
// @access    Private (users)
router.get("/:id", authProtect, ContactController.getOneContact);

// @desc      Delite a contact
// @route     DELETE /api/contacts/:id
// @access    Private (users)
router.delete("/:id", authProtect, ContactController.deleteOneContact);

export default router;
