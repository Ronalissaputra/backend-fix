"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("Pemantauankehamilan", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tanggal: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tempat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      keluhan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pola_makan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pola_istrahat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pola_seksual: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      aktifitas_fisik: {
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
      lingkaran_lengan_atas: {
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
      sclera: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      udema_wajah: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kesehatan_gigi_dan_mulut: {
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
      payudarah: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pembesaran_perut: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      luka_bekas_operasi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      leopold_1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      leopold_2: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      leopold_3: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      leopold_4: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ekstermitas: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kondisi_vulva: {
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
      glukosa_urine: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hbsag: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rapid_test_hiv: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      usg: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pemberian_tablet_tambah_darah: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status_imunisasi_tt: {
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("Pemantauankehamilan");
  },
};
