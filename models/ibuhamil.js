"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ibuhamil extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Admin, { foreignKey: "adminId" });
      this.hasMany(models.Anak, { foreignKey: "ibuhamilId" });
      this.hasMany(models.Pemantauannifas, { foreignKey: "ibuhamilId" });
      this.hasMany(models.Pemantauananak, { foreignKey: "ibuhamilId" });
      this.hasMany(models.Pemantauankehamilan, { foreignKey: "ibuhamilId" });
    }
  }
  Ibuhamil.init(
    {
      uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customId: {
        type: DataTypes.STRING,
        defaultValue: "BM-001",
      },
      umur: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lama_nikah: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      suku: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      agama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pendidikan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pekerjaan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      alamat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nomor_hp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      golongan_darah: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nomor_bpjs: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tempat_periksa: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nama_suami: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      umur_suami: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      agama_suami: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      suku_suami: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pendidikan_suami: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pekerjaan_suami: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      alamat_suami: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nomorhp_suami: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hamil_ke: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jumlah_anak: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      siklus: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lama_haid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hptp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hpl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      refresh_token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      adminId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Admin",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "Ibuhamil",
      modelName: "Ibuhamil",
    }
  );

  Ibuhamil.beforeCreate((instance, options) => {
    // generate custom id
    let newId = "BM-";
    return Ibuhamil.max("customId").then((maxId) => {
      if (maxId) {
        let id = maxId.substr(3);
        let newNum = parseInt(id) + 1;
        newId += String(newNum).padStart(3, "0");
      } else {
        newId += "001";
      }
      instance.customId = newId;
    });
  });

  return Ibuhamil;
};
