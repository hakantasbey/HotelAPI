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
    night:{
        type:Number,
        get:function(){
            const timeDifference=this.departureDate.getTime()-this.arrivalDate.getTime()
            const nightCount=Math.ceil(timeDifference/(1000*60*60*24))
            return nightCount
        },
        price: {
            type: Number,
            required: true 
        },
        totalPrice:{
            type: Number,
            default: function(){return this.night*this.price},
            transform: function(){return this.night*this.price}
        }
},{
    collection: "reservations",
    timestamps: true,
    toJSON: { getters: true },
})

module.exports = mongoose.model('Reservation', ReservationSchema)