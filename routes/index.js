const movieRoutes = require('./movie.route')
const theatreRoutes = require('./theatre.routes')
const authRoutes = require('./auth.routes')
const userRoutes = require('./user.routes')
const bookingRoutes = require("./booking.routes");
const paymentRoutes = require("./payment.routes");


module.exports = (app)=>{
    movieRoutes,
    theatreRoutes,
    authRoutes,
    userRoutes,
    bookingRoutes,
    paymentRoutes
}