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
      nama_anak: {
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
      kondisi_lahir: {
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
      saturasi: {
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
      warna_kulit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      denyut_nadi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tonus_otot: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      usaha_nafas: {
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
      walking: {
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
      bak: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      frekuensi_bak: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      warna_bak: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bab: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      frekuensi_bab: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      warna_bab: {
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
      tableName: "Anak",
      modelName: "Anak",
    }
  );
  return Anak;
};
