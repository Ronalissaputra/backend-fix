"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("Pemantauannifas", {
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
      keadaan_umum: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kesadaran: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status_emosional: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tekanan_darah: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      suhu_tubuh: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pernafasan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      denyut_nadi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      konjungtiva: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      puting_susu: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      asi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tfu: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kontraksi_uterus: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kandung_kemih: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jahitan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      oedema: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hematoma: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      warna_lochea: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      banyak_lochea: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bau_lochea: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      robekan_anus: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hemorid_anus: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      varises: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      oedema_ekstermitasbawah: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      golongan_darah: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hemoglobin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hematorit: {
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
    await queryInterface.dropTable("Pemantauannifas");
  },
};
