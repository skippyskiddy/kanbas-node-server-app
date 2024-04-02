import Database from "../Database/index.js";

export default function AssignmentRoutes(app) {

  // Create a new assignment
  app.post("/api/courses/:mid/assignments", (req, res) => {
    const { mid } = req.params; // Module ID
    const newAssignment = {
      ...req.body,
      course: mid,
      _id: new Date().getTime().toString(), // Unique ID for the assignment
    };
    Database.assignments.push(newAssignment);
    res.status(201).send(newAssignment); // 201 Created
  });

  // Retrieve all assignments for a module
  app.get("/api/courses/:mid/assignments", (req, res) => {
    const { mid } = req.params;
    const moduleAssignments = Database.assignments.filter((a) => a.course === mid);
    res.send(moduleAssignments);
  });

  // Retrieve a single assignment by ID
  app.get("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params; // Assignment ID
    const assignment = Database.assignments.find((a) => a._id === aid);
    if (!assignment) {
      res.status(404).send("Assignment not found");
      return;
    }
    res.send(assignment);
  });

  // Update an assignment
  app.put("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const assignmentIndex = Database.assignments.findIndex((a) => a._id === aid);
    if (assignmentIndex === -1) {
      res.status(404).send("Assignment not found");
      return;
    }
    Database.assignments[assignmentIndex] = {
      ...Database.assignments[assignmentIndex],
      ...req.body
    };
    res.sendStatus(204); 
  });

  // Delete an assignment
  app.delete("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const initialLength = Database.assignments.length;
    Database.assignments = Database.assignments.filter((a) => a._id !== aid);
    if (Database.assignments.length === initialLength) {
      res.status(404).send("Assignment not found");
      return;
    }
    res.sendStatus(204); 
  });

}
