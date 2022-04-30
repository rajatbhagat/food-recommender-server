import mongoose from "mongoose";

const adminUserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "admin",
    },
    approvedNutritionist: {
      type: Array,
      default: []
    },
  },
  { collection: "admin" }
);

export default adminUserSchema;
