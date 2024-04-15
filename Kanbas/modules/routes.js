import * as dao from "./dao.js";

function ModuleRoutes(app) {
    
  // app.put("/api/modules/:mid", (req, res) => {
  //   const { mid } = req.params;
  //   const moduleIndex = db.modules.findIndex(
  //     (m) => m._id.$oid === mid);
  //   db.modules[moduleIndex] = {
  //     ...db.modules[moduleIndex],
  //     ...req.body
  //   };
  //   res.sendStatus(204);
  // });

  // Update a module by ID
  app.put("/api/modules/:mid", async (req, res) => {
    try {
      const { mid } = req.params;
      await dao.updateModule(mid, req.body);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // app.delete("/api/modules/:mid", (req, res) => {
  //   const { mid } = req.params;
  //   db.modules = db.modules.filter((m) => m._id.$oid !== mid);
  //   res.sendStatus(200);
  // });

  app.delete("/api/modules/:mid", async (req, res) => {
    try {
      const { mid } = req.params;
      await dao.deleteModule(mid);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });


  // app.post("/api/courses/:cid/modules", (req, res) => {
  //   const { cid } = req.params;
  //   const newModule = {
  //     ...req.body,
  //     course: cid,
  //     // _id: new Date().getTime().toString(),
  //   };
  //   db.modules.push(newModule);
  //   res.send(newModule);
  // });

  app.post("/api/courses/:cid/modules", async (req, res) => {
    try {
      const { cid } = req.params;
      const newModule = await dao.createModule(cid, req.body);
      res.status(201).send(newModule);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // app.get("/api/courses/:cid/modules", (req, res) => {
  //   const { cid } = req.params;
  //   const modules = db.modules
  //     .filter((m) => m.course === cid);
  //   res.send(modules);
  // });

  app.get("/api/courses/:cid/modules", async (req, res) => {
    try {
      const { cid } = req.params;
      const modules = await dao.findModulesByCourse(cid);
      res.send(modules);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

}
export default ModuleRoutes;