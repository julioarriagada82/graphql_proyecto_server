const { authCheck } = require("../helpers/auth");
const Integrante = require("../models/integrante");
const Casa = require("../models/casa");
const User = require("../models/user");

// mutation
const casaCreate = async (parent, args, { req }) => {
  // validation
  if (args.input.name.trim() === "") throw new Error("Content is required");

  let newCasa = await new Casa({
    ...args.input,
  }).save();

  return newCasa;
};

const casaUpdate = async (_, args, { req }) => {
  const updateCasa = await User.findOneAndUpdate(
    { ...args.input },
    { new: true }
  ).exec();
  return updateCasa;
};

// query generic
const allCasas = async (parent, args) => {
  return await Casa.find({})
    .populate("postedBy", "username _id")
    .sort({ createdAt: -1 })
    .exec();
};

// query generic
const casasByUser = async (parent, args, { req }) => {
  const currentUser = await authCheck(req);
  const currentUserFromDb = await User.findOne({
    email: currentUser.email,
  }).exec();

  return await Casa.find({ postedBy: currentUserFromDb })
    .populate("postedBy", "_id username")
    .sort({ createdAt: -1 });
};

module.exports = {
  Query: {
    allCasas,
    casasByUser,
  },
  Mutation: {
    casaCreate,
    casaUpdate,
  },
};
