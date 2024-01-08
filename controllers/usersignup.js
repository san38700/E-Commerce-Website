const NewUser = require('../models/usersignup')

const bcrypt = require('bcrypt')


exports.createUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const saltRounds = 10
      const hashedPassword = await bcrypt.hash(password, saltRounds)
      const newUser = await NewUser.create({ name, email, password : hashedPassword });
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
          return res.status(404).json({ message: '404 User not found' });
      }

      //check if password matches after decryption
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: '401 User not authorized' });
      }

      res.json({user:user})

  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
  }
};
