const TodoItem = require("../models/todo");

async function createTodoItem(description, status) {
  try {
    const todoItem = await TodoItem.create({ description, status });
    return todoItem;
  } catch (error) {
    throw new Error(`Error creating todo item: ${error.message}`);
  }
}

async function getTodoItemById(id) {
  try {
    const todoItem = await TodoItem.findByPk(id);
    if (!todoItem) {
      throw new Error("Todo item not found");
    }
    return todoItem;
  } catch (error) {
    throw new Error(`Error fetching todo item: ${error.message}`);
  }
}

async function updateTodoItem(id, newData) {
  try {
    const todoItem = await TodoItem.findOne({ where: { id: id } });
    console.log("todo service = ", todoItem);
    if (!todoItem) {
      throw new Error("Todo item not found");
    }
    await todoItem.update(newData);
    return todoItem;
  } catch (error) {
    throw new Error(`Error updating todo item: ${error.message}`);
  }
}

async function deleteTodoItem(id) {
  try {
    const todoItem = await TodoItem.findOne({ where: { id: id } });
    if (!todoItem) {
      throw new Error("Todo item not found");
    }
    await todoItem.destroy();
  } catch (error) {
    throw new Error(`Error deleting todo item: ${error.message}`);
  }
}

async function getAllTodoItems(page, pageSize) {
  try {
    const offset = (page - 1) * pageSize;
    const todoItems = await TodoItem.findAll({
      offset,
      limit: pageSize,
    });
    return todoItems;
  } catch (error) {
    throw new Error(`Error fetching all todo items: ${error.message}`);
  }
}

async function filterTodoItemsByStatus(status, page, pageSize) {
  const offset = (page - 1) * pageSize;
  try {
    const todoItems = await TodoItem.findAll({
      where: {
        status: status,
      },
      offset,
      limit: pageSize,
    });
    return todoItems;
  } catch (error) {
    throw new Error(`Error fetching all todo items: ${error.message}`);
  }
}

async function uploadTodoItems(todoItems) {
  try {
    await Promise.all(
      todoItems.map(async (item) => {
        await TodoItem.create({
          description: item.description,
          status: item.status,
        });
      })
    );
  } catch (error) {
    throw new Error(`Error uploading todo items: ${error.message}`);
  }
}

async function downloadTodoList(page, pageSize) {
  try {
    const todoItems = await TodoItem.findAll({});
    return todoItems;
  } catch (error) {
    throw new Error(`Error fetching all todo items: ${error.message}`);
  }
}

module.exports = {
  createTodoItem,
  getTodoItemById,
  updateTodoItem,
  deleteTodoItem,
  getAllTodoItems,
  filterTodoItemsByStatus,
  uploadTodoItems,
  downloadTodoList,
};
