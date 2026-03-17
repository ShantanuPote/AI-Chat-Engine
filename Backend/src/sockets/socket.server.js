const {Server } = require("socket.io")
const jwt = require("jsonwebtoken");
const cookie = require("cookie")
const userModel = require("../models/user.model");
const messageModel = require("../models/message.model")
const {generateResponse} = require("../services/ai.services")




function initSocketServer(httpServer){
    const io = new Server(httpServer, { /* options */ }); 

    io.use(async (socket, next) => {

      const cookies = cookie.parse(socket.handshake.headers?.cookie || "");

      if (!cookies.token) {
          next(new Error("Authentication error: No token provided"));
      }

      try {

          const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);

          const user = await userModel.findById(decoded.id);

          socket.user = user

          next()

      } catch (err) {
          next(new Error("Authentication error: Invalid token"));
      }

  })



    io.on("connection", (socket) => {
        console.log("New socket connection:", socket.id)

        socket.on("ai-message", async (messagePayload) => {
          
          messageModel.create({
            chat : messagePayload.chat,
            user : messagePayload._id,
            content : messagePayload.content,
            role : "user"
          })

          const chatHistory = await messageModel.find({
            chat : messagePayload.chat
          })

          console.log(chatHistory)

          const response = await generateResponse(chatHistory.map(item =>{
            return {
              role: item.role,
              parts: [ { text : item.content}] 
            }
          }))

          messageModel.create({
            chat : messagePayload.chat,
            user : messagePayload._id,
            content : response,
            role : "model"
          })

          socket.emit('ai-response',{
            content : response,
            chat : messagePayload.chat
          })

        })

      });
      
}

module.exports = initSocketServer;


