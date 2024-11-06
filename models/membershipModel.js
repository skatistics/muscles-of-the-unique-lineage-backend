import mongoose from "mongoose";

const membershipSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  groupId: {
    type: String,
    required: true,
  },
});

const Membership = mongoose.model(
  "Membership",
  membershipSchema,
  "memberships"
);

export default Membership;
