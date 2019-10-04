'use strict';
module.exports = (sequelize, DataTypes) => {
  const Alumno = sequelize.define('Alumno', {
    codigo: DataTypes.STRING,
    nombres: DataTypes.STRING,
    telefono: DataTypes.STRING,
    estado: DataTypes.BOOLEAN,    
    carreraId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Carrera',
        key: 'id',
        as: 'carreraId'
      }
    },
    filename: DataTypes.STRING
  }, {});
  Alumno.associate = function(models) {
    // associations can be defined here
    Alumno.belongsTo(models.Carrera,{
      foreignKey: 'carreraId',
      onDelete: 'CASCADE'
    });
  };
  return Alumno;
};