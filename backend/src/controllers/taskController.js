const Task = require('../models/Task');
const { sendSuccess, sendError } = require('../Utils/apiResponse');

exports.getTasks = async (req, res, next) => {
  try {
    const { search, status, priority, sort = '-createdAt' } = req.query;
    const filter = { owner: req.user._id };

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (search) filter.title = { $regex: search, $options: 'i' };

    const tasks = await Task.find(filter).sort(sort);
    sendSuccess(res, 200, 'Tasks fetched', { tasks, count: tasks.length });
  } catch (err) { next(err); }
};

exports.createTask = async (req, res, next) => {
  try {
    const task = await Task.create({ ...req.body, owner: req.user._id });
    sendSuccess(res, 201, 'Task created', { task });
  } catch (err) { next(err); }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) return sendError(res, 404, 'Task not found');
    sendSuccess(res, 200, 'Task updated', { task });
  } catch (err) { next(err); }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!task) return sendError(res, 404, 'Task not found');
    sendSuccess(res, 200, 'Task deleted');
  } catch (err) { next(err); }
};