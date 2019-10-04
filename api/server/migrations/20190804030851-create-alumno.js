'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Alumnos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codigo: {
        type: Sequelize.STRING
      },
      nombres: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.STRING
      },
      carreraId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Carreras',
        key: 'id',
        as: 'carreraId'
       }
      },
      filename: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Alumnos');
  }
};