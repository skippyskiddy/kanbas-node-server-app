import * as dao from "./dao.js";


export default function CourseRoutes(app) {
    
  // app.get("/api/courses/:id", (req, res) => {
  //   const { id } = req.params;

  //   const course = Database.courses
  //     .find((c) => c._id.$oid === id);

  //   if (!course) {
  //     res.status(404).send("Course not found");
  //     return;
  //   }
  //   res.send(course);
  // });

  app.get("/api/courses/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const course = await dao.findCourseById(id);
      if (!course) {
        res.status(404).send("Course not found");
      } else {
        res.send(course);
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // app.put("/api/courses/:id", (req, res) => {
  //   const { id } = req.params;
  //   const course = req.body;
  //   Database.courses = Database.courses.map((c) =>
  //   c._id.$oid === id ? { ...c, ...course } : c
  //   );
  //   res.sendStatus(204);
  // });

  app.put("/api/courses/:id", async (req, res) => {
    const { id } = req.params;
    const courseUpdates = req.body;
    try {
      const updated = await dao.updateCourse(id, courseUpdates);
      if (updated.nModified > 0) {
        res.sendStatus(204);
      } else {
        res.status(404).send("Course not found");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // app.delete("/api/courses/:id", (req, res) => {
  //   const { id } = req.params;
  //   Database.courses = Database.courses
  //     .filter((c) => c._id.$oid !== id);
  //   res.sendStatus(204);
  // });

  app.delete("/api/courses/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await dao.deleteCourse(id);
      if (deleted.deletedCount > 0) {
        res.sendStatus(204);
      } else {
        res.status(404).send("Course not found");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });


  // app.post("/api/courses", (req, res) => {
  //   const course = { ...req.body, _id: new Date().getTime().toString()  };

  //   Database.courses.push(course);
  //   res.send(course);
  // });

  app.post("/api/courses", async (req, res) => {
    try {
      const course = await dao.createCourse(req.body);
      res.status(201).send(course);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // app.get("/api/courses", (req, res) => {
  //   const courses = Database.courses;
  //   res.send(courses);
  // });

  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await dao.findAllCourses();
      res.send(courses);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
}
