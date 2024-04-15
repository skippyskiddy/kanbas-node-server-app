import * as dao from "./dao.js";

export default function UserRoutes(app) {
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };
  app.post("/api/users", createUser);  
  
  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
};
const findAllUsers = async (req, res) => {
    const { role } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }

    const users = await dao.findAllUsers();
    res.json(users);
  };
  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };

  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already taken" });
    }
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };
  app.post("/api/users/signup", signup);


  const updateUser = async (req, res) => {
    try { 
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    let currentUser = await dao.findUserById(userId);

    if (currentUser && currentUser.dob) {
      const date = new Date(currentUser.dob);
      const formattedDate = date.toISOString().split('T')[0]; // Formats to 'YYYY-MM-DD'
      currentUser.dob = formattedDate;
  }
  
    res.json(status); } 
    catch (err) {
    }
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.sendStatus(401);
    }
  };

   const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const profile = async (req, res) => {
    console.log(req.session["currentUser"]);
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    if (currentUser.dob) {
      const date = new Date(currentUser.dob);
      const formattedDate = date.toISOString().split('T')[0]; // Formats to 'YYYY-MM-DD'
      currentUser.dob = formattedDate;
  }

    res.json(currentUser);
  };


  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}
