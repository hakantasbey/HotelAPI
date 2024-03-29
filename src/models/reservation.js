"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */

const ReservationSchema = new mongoose.Schema ({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true
    },
    arrivalDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    departureDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(date){
                return date > this.arrivalDate
            },
            message: 'departureDate must be later than arrivalDate'
        },
    },
    guestNumber: {
        type: Number,
        default: 1
    },
    night: {
        type: Number,
        
    }
},{
    collection: "reservations",
    timestamps: true
})