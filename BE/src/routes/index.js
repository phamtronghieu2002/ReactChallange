
const authRoute = require("./auth");
const employeeRoutes = require("./employee");
const conversationRoutes = require("./conversation");
const messageRoutes = require("./message");
const taskRoutes = require("./task");
const { veryfyUser } = require("~/middlewares/authMiddleware");
const initWebRoutes = (app) => {


    app.use("/api/v1/auth", authRoute);
    app.use("/api/v1/employee", employeeRoutes);
    app.use("/api/v1/conversation",veryfyUser, conversationRoutes);
    app.use("/api/v1/message",veryfyUser, messageRoutes);
    app.use("/api/v1/task",veryfyUser, taskRoutes);
};


module.exports = initWebRoutes;