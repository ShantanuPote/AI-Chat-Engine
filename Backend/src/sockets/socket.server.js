const {Server } = require("socket.io")
const jwt = require("jsonwebtoken");
const cookie = require("cookie")
const userModel = require("../models/user.model");
const messageModel = require("../models/message.model")
const {generateResponse, generateVector} = require("../services/ai.services")
const {createMemory, queryMemory} = require("../services/vector.service")




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

  });



    io.on("connection", (socket) => {
        console.log("New socket connection:", socket.id)

        socket.on("ai-message", async (messagePayload) => {
          
          
         const message = await messageModel.create({
            chat : messagePayload.chat,
            user : socket.user._id,
            content : messagePayload.content,
            role : "user"
          })

          const vectors = await generateVector(messagePayload.content)

          const memory = await queryMemory({
            queryVector: vectors,
            limit: 3,
            metadata: {}
        }) 


          await createMemory({
            vectors,
            messageId: message._id,
            metadata: {
              chat: messagePayload.chat,
              user: socket.user._id,
              text: messagePayload.content
            }
          })



          const chatHistory = (await messageModel.find({
            chat : messagePayload.chat
          }).sort({ createdAt: -1}).limit(20).lean()).reverse()

        

          const response = await generateResponse(chatHistory.map(item =>{
            return {
              role: item.role,
              parts: [ { text : item.content}] 
            }
          }))



         const responseMessage = await messageModel.create({
            chat : messagePayload.id,
            user : socket.user._id,
            content : response,
            role : "model"
          })

          const responseVector = await generateVector(response);


          await createMemory({
            vectors: responseVector,
            messageId: responseMessage._id,
            metadata: {
              chat: messagePayload.chat,
              user: socket.user._id,
              text: response
            }
          })

          socket.emit('ai-response',{
            content : response,
            chat : messagePayload.chat
          });

        });

    });

}

module.exports = initSocketServer;


