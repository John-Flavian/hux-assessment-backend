import Contact from "../models/Contact.js";

class ContactController {
  static async createContact(req, res, next) {
    try {
      const { firstName, lastName, phoneNumber } = req.body;

      const newContact = await Contact.create({
        firstName,
        lastName,
        phoneNumber,
        ownerId: req.user._id,
      });

      return res.status(200).json({
        success: true,
        message: "Contact Created Successfully.",
        data: newContact,
      });
    } catch (error) {
      next(error);
    }
  }

  static async editContact(req, res, next) {
    try {
      const { firstName, lastName, phoneNumber } = req.body;

      const currContact = await Contact.findById(req.params.id);

      if (!currContact) {
        return res.status(404).json({
          success: false,
          message: "contact not found.",
        });
      }

      if (currContact.ownerId.toString() !== req.user._id.toString()) {
        return res.status(400).json({
          success: false,
          message: "You are not authorized to access this resource.",
        });
      }

      currContact.firstName = firstName || currContact.firstName;
      currContact.lastName = lastName || currContact.lastName;
      currContact.phoneNumber = phoneNumber || currContact.phoneNumber;

      await currContact.save();

      return res.status(200).json({
        success: true,
        message: "Contact Updated Successfully.",
        data: currContact,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getOneContact(req, res, next) {
    try {
      const currContact = await Contact.findById(req.params.id);

      if (!currContact) {
        return res.status(404).json({
          success: false,
          message: "Contact not found.",
        });
      }

      if (currContact.ownerId.toString() !== req.user._id.toString()) {
        return res.status(400).json({
          success: false,
          message: "You are not authorized to access this resource.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Contact Fetched Successfully.",
        data: currContact,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllUserContacts(req, res, next) {
    try {
      const allContacts = await Contact.find({
        ownerId: req.user._id,
      });

      return res.status(200).json({
        success: true,
        message: "User Contacts Fetched Successfully.",
        data: allContacts,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteOneContact(req, res, next) {
    try {
      const currContact = await Contact.findById(req.params.id);

      if (!currContact) {
        return res.status(404).json({
          success: false,
          message: "Contact not found.",
        });
      }

      if (currContact.ownerId.toString() !== req.user._id.toString()) {
        return res.status(400).json({
          success: false,
          message: "You are not authorized to access this resource.",
        });
      }

      await Contact.findByIdAndDelete(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Contact Deleted Successfully.",
        data: currContact,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ContactController;
