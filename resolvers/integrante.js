const { authCheck } = require("../helpers/auth");
const Integrante = require("../models/integrante");
const User = require("../models/user");

// mutation
const integranteCreate = async (parent, args, { req }) => {
  // validation
  if (args.input.rut.trim() === "") throw new Error("rut is required");

  let newIntegrante = await new Integrante({
    ...args.input,
  }).save();

  return newIntegrante;
};

const integranteUpdate = async (_, args, { req }) => {
  const updateIntegrante = await User.findOneAndUpdate(
    { ...args.input },
    { new: true }
  ).exec();
  return updateIntegrante;
};

// query generic
const allIntegrantes = async (parent, args) => {
  return await Integrante.find({})
    .populate("postedBy", "username _id")
    .sort({ createdAt: -1 })
    .exec();
};

// query generic
const integrantesByUser = async (parent, args, { req }) => {
  const currentUser = await authCheck(req);
  const currentUserFromDb = await User.findOne({
    email: currentUser.email,
  }).exec();

  return await Integrante.find({ postedBy: currentUserFromDb })
    .populate("postedBy", "_id username")
    .sort({ createdAt: -1 });
};

module.exports = {
  Query: {
    allIntegrantes,
    integrantesByUser,
  },
  Mutation: {
    integranteCreate,
    integranteUpdate,
  },
};
