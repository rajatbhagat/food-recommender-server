import mongoose from "mongoose";
import adminUserSchema from "../schema/admin_user_schema.js";

const adminModel = mongoose.model("AdminUserModel", adminUserSchema);
export default adminModel;
