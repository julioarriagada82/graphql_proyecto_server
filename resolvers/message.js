const { authCheck } = require("../helpers/auth");
const Message = require("../models/message");
const User = require("../models/user");

// mutation
const messageCreate = async (parent, args, { req }) => {
  const currentUser = await authCheck(req);
  // validation
  if (args.input.content.trim() === "") throw new Error("Content is required");

  const currentUserFromDb = await User.findOne({
    email: currentUser.email,
  });
  let newMessage = await new Message({
    ...args.input,
    postedBy: currentUserFromDb._id,
  })
    .save()
    .then((message) =>
      message.populate("postedBy", "_id username").execPopulate()
    );

  return newMessage;
};

// query generic
const allMessages = async (parent, args) => {
  return await Message.find({})
    .populate("postedBy", "username _id")
    .sort({ createdAt: -1 })
    .exec();
};

// query generic
const messagesByUser = async (parent, args, { req }) => {
  const currentUser = await authCheck(req);
  const currentUserFromDb = await User.findOne({
    email: currentUser.email,
  }).exec();

  return await Message.find({ postedBy: currentUserFromDb })
    .populate("postedBy", "_id username")
    .sort({ createdAt: -1 });
};

module.exports = {
  Query: {
    allMessages,
    messagesByUser,
  },
  Mutation: {
    messageCreate,
  },
};
