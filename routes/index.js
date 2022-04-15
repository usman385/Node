const authRoutes = require("./auth.route");
const memberRoutes = require("./member.route");

module.exports = [].concat(authRoutes, memberRoutes);
