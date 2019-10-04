'use strict';
module.exports = (sequelize, DataTypes) => {
  const Documento = sequelize.define('Documento', {
    titulo: DataTypes.STRING,
    isbn: DataTypes.STRING,
    numEjemplares: DataTypes.INTEGER,
    numTomos: DataTypes.STRING,
    anio: DataTypes.STRING,
    filename: DataTypes.STRING,
    codigo: DataTypes.STRING,
    numPaginas: DataTypes.STRING,
    tags: DataTypes.STRING,
    origen: DataTypes.STRING,
    autor: DataTypes.STRING,
    autor1: DataTypes.STRING,
    cuter: DataTypes.STRING,
    dewey: DataTypes.STRING,
    edicion: DataTypes.STRING,
    tipo: DataTypes.STRING,
    observaciones: DataTypes.STRING, 
    baja: DataTypes.BOOLEAN,    
    unico: DataTypes.BOOLEAN,    
    mantenimiento: DataTypes.BOOLEAN,    
    editorialId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Editorial',
        key: 'id',
        as: 'editorialId'
      }
    },
    deweyId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Dewey',
        key: 'id',
        as: 'deweyId'
      }
    },
    carreraId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Carrera',
        key: 'id',
        as: 'carreraId'
      }
    },
  }, {});
  Documento.associate = function(models) {
    // associations can be defined here
    Documento.belongsTo(models.Editorial,{
      foreignKey: 'editorialId',
      onDelete: 'CASCADE'
    });
    Documento.belongsTo(models.Dewey,{
      foreignKey: 'deweyId',
      onDelete: 'CASCADE'
    });
    Documento.belongsTo(models.Carrera,{
      foreignKey: 'carreraId',
      onDelete: 'CASCADE'
    });
  };
  return Documento;
};