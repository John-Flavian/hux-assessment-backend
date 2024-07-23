import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      required: [true, "Owner's Id is required."],
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("contacts", ContactSchema);
export default Contact;
