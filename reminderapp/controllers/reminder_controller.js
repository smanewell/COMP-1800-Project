let Database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render('reminder/index', { reminders: Database.cindy.reminders })
  },

  new: (req, res) => {
    res.render('reminder/create')
  },

  home: (req, res) => {
    res.render('reminder/home')
  },


  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = Database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind; // good test question for students what happens if I put ===
    })
    if (searchResult != undefined) {
      res.render('reminder/single-reminder', { reminderItem: searchResult })
    } else {
      res.render('reminder/index', { reminders: Database.cindy.reminders })
    }
  },

  create: (req, res) => {
    let reminder = {
      id: Database.cindy.reminders.length + 1,
      title: req.body.title,
      datetime: req.body.datetime
    }
    let my_tasks = req.body.task
    if (typeof (my_tasks) == typeof ([])) {
      reminder.tasks = my_tasks
    }
    else {
      reminder.tasks = [my_tasks]
    }
    Database.cindy.reminders.push(reminder);
    res.redirect('/reminder');
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = Database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind; // Why do you think I chose NOT to use === here?
    })
    res.render('reminder/edit', { reminderItem: searchResult })

  },

  update: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = Database.cindy.reminders.find(function (reminder) {
      if (reminder.id == reminderToFind) {
        reminder.title = req.body.title
          reminder.datetime = req.body.datetime
          let my_tasks = req.body.task
          if (typeof (my_tasks) == typeof ([])) {
            reminder.tasks = my_tasks
          }
          else {
            reminder.tasks = [my_tasks]
          }
      }

    });
    res.redirect('/reminder/' + reminderToFind)
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id;
    let reminderIndex = Database.cindy.reminders.findIndex(function (reminder) {
      return reminder.id == reminderToFind;
    })
    Database.cindy.reminders.splice(reminderIndex, 1);
    res.redirect('/reminder');
  }
}

module.exports = remindersController
