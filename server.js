const express = require("express");
const app = express();
const path = require("path");
const { conn, Flavor, Molecule } = require("./db");

app.use(express.json());
app.use("/assets", express.static("assets"));
app.use("/dist", express.static("dist"));

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [vanilla, cherry, apple, vanllin, benzaldeyde, pentylhexanoate] =
    await Promise.all([
      Flavor.create({ name: "Vanilla" }),
      Flavor.create({ name: "Cherry" }),
      Flavor.create({ name: "Apple" }),
      Molecule.create({
        name: "vanllin",
        description:
          "Vanilla, vanillin, sweet, creamy, spicy, phenolic and milky",
      }),
      Molecule.create({
        name: "benzaldeyde",
        description: "strong sharp sweet bitter almond cherry",
      }),
      Molecule.create({
        name: "pentylhexanoate",
        description: "sweet green fruity estry pineapple apple pear fatty",
      }),
    ]);
};

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.get("/api/flavors", async (req, res, next) => {
  try {
    res.send(await Flavor.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/flavors", async (req, res, next) => {
  try {
    res.status(201).send(await Flavor.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.delete("/api/flavors/:id", async (req, res, next) => {
  try {
    const flavor = await Flavor.findByPk(req.params.id);
    await flavor.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/molecules", async (req, res, next) => {
  try {
    res.send(await Molecule.findAll());
  } catch (ex) {
    next(ex);
  }
});

const port = process.env.PORT || 3000;

const init = async () => {
  await syncAndSeed();
  app.listen(port, () => console.log(`listening on port ${port}`));
};

init();
