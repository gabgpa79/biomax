'use strict';
module.exports = (sequelize, DataTypes) => {
  const Prestamo = sequelize.define('Prestamo', {
    fechaDevolucion: DataTypes.DATE,    
    alumnoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Alumno',
        key: 'id',
        as: 'alumnoId'
      }
    },
    documentoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Documento',
        key: 'id',
        as: 'documentoId'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
        as: 'userId'
      }
    },
    observaciones: DataTypes.STRING,
    estado: DataTypes.STRING
  }, {});
  Prestamo.associate = function(models) {
    // associations can be defined here
    Prestamo.belongsTo(models.Alumno,{
      foreignKey: 'alumnoId',
      onDelete: 'CASCADE'
    });
    Prestamo.belongsTo(models.Documento,{
      foreignKey: 'documentoId',
      onDelete: 'CASCADE'
    });
    Prestamo.belongsTo(models.User,{
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Prestamo;
};