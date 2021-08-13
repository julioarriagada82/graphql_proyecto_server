const { authCheck } = require("../helpers/auth");
const Category = require("../models/category");
const User = require("../models/user");

// mutation
const categoryCreate = async (parent, args, { req }) => {
  // validation
  if (args.input.name.trim() === "") throw new Error("Content is required");

  let newCategory = await new Category({
    ...args.input,
  }).save();

  return newCategory;
};

const categoryUpdate = async (_, args, { req }) => {
  const updateCategory = await User.findOneAndUpdate(
    { ...args.input },
    { new: true }
  ).exec();
  return updateCategory;
};

// query generic
const allCategorys = async (parent, args) => {
  return await Category.find({}).sort({ createdAt: -1 }).exec();
};

module.exports = {
  Query: {
    allCategorys,
  },
  Mutation: {
    categoryCreate,
    categoryUpdate,
  },
};
