"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Anak extends Model {
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
  Anak.init(
    {
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jenis_kelamin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tanggal_lahir: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      anak_ke: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      keadaan_umum: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kesadaran: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kondisi_saat_lahir: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tekanan_darah: {
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
      saturasi_o2: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capilary_refill: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bb: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pb: {
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
      apperance: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pulse: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      grimace: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      activity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      respiration: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kepala: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      uub: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mata: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tht: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mulut: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      thorax: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      abdomen: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tali_pusat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      punggung: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genetalia: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      anus: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ekstermitas: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kulit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      moro: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rooting: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sucking: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      swallowing: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      wallking: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      graphs: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      babinski: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tonicneck: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      miksi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      defekasi: {
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
      terapi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      perawatan_talipusat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imd: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vitamin_k1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imunisasi_hepatitis: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      salep: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kie: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ppia: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pemantauan_tumbuh_kembang: {
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
      tableName: "Anak",
      modelName: "Anak",
    }
  );
  return Anak;
};
