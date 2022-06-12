const msgModel = require("../model/msgModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await msgModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (!data)
      return res.json({ msg: "Failed to add message to the database." });
    return res.json({ msg: "Message added successfully." });
  } catch (ex) {
    console.log(ex);
    next(ex);
  }
};

module.exports.getAllMessage = async (req, res, next) => {};
