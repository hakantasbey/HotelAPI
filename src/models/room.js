"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */

const RoomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    images: [],
    bedType: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4],
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "rooms",
    timestamps: true,
  }
);

module.exports = mongoose.model('Room', RoomSchema)
