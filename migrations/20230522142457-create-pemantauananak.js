"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("Pemantauananak", {
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
    await queryInterface.dropTable("Pemantauananak");
  },
};
