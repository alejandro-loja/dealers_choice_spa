const Sequelize = require("sequelize");
const { STRING, INTEGER } = Sequelize;
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme_express_spa"
);

const Flavor = conn.define("flavor", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

const Molecule = conn.define("molecule", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

// Molecule.belongsTo(Flavor);
Flavor.hasMany(Molecule);

module.exports = {
  conn,
  Flavor,
  Molecule,
};
