"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pemantauankehamilan extends Model {
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
  Pemantauankehamilan.init(
    {
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tanggal: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tempat_kunjungan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hasil_anamnesis: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tinggi_badan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      berat_badan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lingkarlengan_atas: {
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
      nadi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pernafasan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      conjungtiva: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sklera: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      udema_wajah: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kesehatan_mulut: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kelenjar_tiroid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kelenjar_limfe: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vena_jugularis: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bentuk_payudarah: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      puting: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pembesaran_perut: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lukabekas_operasi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      leopold_i: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      leopold_ii: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      leopold_iii: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      leopold_iv: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ekstremitas: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kondisi_vulvavagina: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kadar_haemoglobin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      protein_urine: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      glukosa_urineataudarah: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hbsag: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rapidtes_hiv: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      usg: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      analisis_masalah: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      permberiantablet_tambahdarah: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      statusimunisasi_tt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      konseling: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      layanan_dokter: {
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
      tableName: "Pemantauankehamilan",
      modelName: "Pemantauankehamilan",
    }
  );
  return Pemantauankehamilan;
};
