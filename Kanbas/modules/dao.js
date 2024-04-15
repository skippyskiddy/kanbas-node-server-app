import model from "./model.js";

// Create a new module and associate it with a course
export const createModule = async (moduleId, moduleData) => {
  const newModule = new model({
    ...moduleData,
    course: moduleId
  });
  return newModule.save();
};

// Find all modules for a specific course
export const findModulesByCourse = (courseId) => {
  return model.find({ course: courseId });
};

// Find a single module 
export const findModuleById = (moduleId) => {
  return model.findById(moduleId);
};

// Update  module by ID
export const updateModule = (moduleId, moduleData) => {
  return model.updateOne({ _id: moduleId }, { $set: moduleData });
};

// Delete module by ID
export const deleteModule = (moduleId) => {
  return model.deleteOne({ _id: moduleId });
};

