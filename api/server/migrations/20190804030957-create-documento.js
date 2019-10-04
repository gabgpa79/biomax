'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Documentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING
      },
      isbn: {
        type: Sequelize.STRING
      },
      numEjemplares: {
        type: Sequelize.INTEGER
      },
      numTomos: {
        type: Sequelize.STRING
      },
      anio: {
        type: Sequelize.STRING
      },
      filename: {
        type: Sequelize.STRING
      },
      codigo: {
        type: Sequelize.STRING
      },
      numPaginas: {
        type: Sequelize.STRING
      },
      tags: {
        type: Sequelize.STRING
      },
      origen: {
        type: Sequelize.STRING
      },
      autor: {
        type: Sequelize.STRING
      },
      autor1: {
        type: Sequelize.STRING
      },
      cuter: {
        type: Sequelize.STRING
      },
      dewey: {
        type: Sequelize.STRING
      },
      edicion: {
        type: Sequelize.STRING
      },
      tipo: {
        type: Sequelize.STRING
      },
      observaciones: {
        type: Sequelize.STRING
      },
      editorialId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Editorials',
        key: 'id',
        as: 'editorialId'
      }
    },
    deweyId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Deweys',
        key: 'id',
        as: 'deweyId'
      }
    },
    carreraId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Carreras',
        key: 'id',
        as: 'carreraId'
      }
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
    return queryInterface.dropTable('Documentos');
  }
};