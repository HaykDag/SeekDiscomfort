const express = require("express");
require("dotenv").config();
const itemRoutes = require("./routes/items");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/categories");
const basketRoutes = require("./routes/basket");
const ImagesRoutes = require("./routes/images");
const orderRoutes = require("./routes/orders");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authCheck = require("./utils/authCheck");
const verifyUser = require("./utils/verifyToken");

// express app
const app = express();

app.use(
    cors({
         origin: ["https://seek-discomfort-client.vercel.app"],
        credentials: true,
    })
);

// middleWares
app.use(cookieParser());
app.use(express.json());

// routes
app.use("/items", itemRoutes);
app.use("/categories", categoryRoutes);
app.use("/user", userRoutes);
app.use("/basket", basketRoutes);
app.use("/images", ImagesRoutes);
app.use("/orders", orderRoutes);

//error handling
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({ error: errorMessage });
});

//socket.io implementation
const server = require("http").createServer(app);
// const io = require("socket.io")(server, {
//     cors: {
//         origin: "http://localhost:3000",
//     },
// });
// let adminSocket;
// io.on("connection", (socket) => {
//     socket.on("register", () => {
//         console.log(`Adminn is here ${socket.id}`);
//         adminSocket = socket;

//         //incoming message from Admin
//         adminSocket.on("reply", (data) => {
//             //send admin's message to the user with this id
//             io.to(data.id).emit("receive_message", data.message);
//         });
//     });
//     //client sends message
//     socket.on("send_message", (data) => {
//         if (adminSocket) {
//             //reSend clients message to admin
//             adminSocket?.emit("receive_message", data);
//         } else {
//             setTimeout(() => {
//                 io.to(data.id).emit(
//                     "receive_message",
//                     "Admin is not avlialable"
//                 );
//             }, 1000);
//         }
//     });

//     socket.on("disconnect", () => {
//         if (socket.id === adminSocket?.id) {
//             console.log("Admin is Disconnected: " + adminSocket.id);
//             adminSocket = null;
//         } else {
//             if (adminSocket) {
//                 adminSocket.emit("user_disconnected", socket.id);
//             }
//             console.log("User Disconnected", socket.id);
//         }
//     });
// });

server.listen(process.env.PORT, () => {
    console.log("listening to port " + process.env.PORT);
});
