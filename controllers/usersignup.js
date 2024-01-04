const NewUser = require('../models/usersignup')


exports.createUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const newUser = await NewUser.create({ name, email, password });
      res.status(201).json({ user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
