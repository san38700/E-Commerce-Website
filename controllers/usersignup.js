const NewUser = require('../models/usersignup')


exports.createUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const newUser = await NewUser.create({ name, email, password });
      res.status(201).json({ user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error or User already exists' });
    }
  };

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
      // Check if the user exists in the database
      const user = await NewUser.findOne({where: {email: email}});
      // console.log(user.email)
      

      if (!user) {
          return res.status(404).json({ message: 'user not found' });
      }


      if (user.password != password) {
          return res.status(401).json({ message: 'Invalid password' });
      }
      res.json({user:user})

  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
  }
};
