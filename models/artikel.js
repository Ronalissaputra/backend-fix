"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Artikel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Artikel.init(
    {
      title: DataTypes.STRING,
      body: DataTypes.STRING,
      image: DataTypes.STRING,
      url: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "Artikel",
      modelName: "Artikel",
    }
  );
  return Artikel;
};
