'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Prestamos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fechaDevolucion: {
        type: Sequelize.DATE
      },
      alumnoId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Alumnos',
        key: 'id',
        as: 'alumnoId'
      }
    },
    documentoId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Documentos',
        key: 'id',
        as: 'documentoId'
      }
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId'
      }
    },
      observaciones: {
        type: Sequelize.STRING
      },
      estado: {
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
    return queryInterface.dropTable('Prestamos');
  }
};