import mongoose from "mongoose";

const groupSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true],
  },
  limit: {
    type: Number,
    min: [1, "BUANG KABA?"],
    max: [10, "BAWAL YAN BOSS"],
    required: [true],
  },
  desc: {
    type: String,
    required: [true],
  },
  privacy: {
    type: String,
    enum: ["private", "public"],
    required: [true],
  },
});

const Group = mongoose.model("Group", groupSchema, "groups");
export default Group;
