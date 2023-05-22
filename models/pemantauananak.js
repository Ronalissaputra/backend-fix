"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pemantauananak extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Ibuhamil, { foreignKey: "ibuhamilId" });
      this.belongsTo(models.Admin, { foreignKey: "adminId" });
    }
  }
  Pemantauananak.init(
    {
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      berat_badan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      panjang_badan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lila: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lk: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ld: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      suhu: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dja: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hr: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rr: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      laboratorium: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      usg: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rontgen: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      terapi_yangdidapat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nutrisi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      eliminasi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pola_tidur: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      personal_hygiene: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      analisis_masalah: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      penatalaksanaan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ibuhamilId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Ibuhamil",
          key: "id",
        },
      },
      adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Admin",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "Pemantauananak",
      modelName: "Pemantauananak",
    }
  );
  return Pemantauananak;
};
