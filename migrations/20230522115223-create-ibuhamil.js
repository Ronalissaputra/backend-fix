"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("Ibuhamil", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      nama_ibuhamil: {
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
      nomor_telefon: {
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
      tempat_pemeriksaan: {
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
      nomortelefon_suami: {
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
      adminId: {
        type: DataTypes.INTEGER,
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
    await queryInterface.dropTable("Ibuhamil");
  },
};
