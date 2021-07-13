module.exports = (sequelize, type) => {
  return sequelize.define('cars', {        
    car_id: {
      type: type.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    car_type: {
      type: type.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "car type is required!"
        },
        notEmpty: {
          msg: "car type is required!"
        }
      }
    },
    car_color: {
      type: type.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "car color is required!"
        },
        notEmpty: {
          msg: "car color is required!"
        }
      }
    },
    car_brand: {
      type: type.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "car brand is required!"
        },
        notEmpty: {
          msg: "car brand is required!"
        }
      }
    },
    production_year: {
      type: type.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "production year is required!"
        },
        notEmpty: {
          msg: "production year is required!"
        }
      }
    },
    cost: {
      type: type.NUMERIC,
      allowNull: false,
      validate: {
        notNull: {
          msg: "cost is required!"
        },
        notEmpty: {
          msg: "cost is required!"
        }
      }
    },
    quantity: {
      type: type.NUMERIC,
      allowNull: false,
      validate: {
        notNull: {
          msg: "quantity is required!"
        },
        notEmpty: {
          msg: "quantity is required!"
        }
      }
    },
    created_at: {
      type : 'TIMESTAMP',
      defaultValue: sequelize.NOW,
      allowNull:true
    },
    updated_at: {
      type : 'TIMESTAMP',
      defaultValue: sequelize.NOW,
      allowNull:true
    },
    deleted_at: {
      type : 'TIMESTAMP',
      defaultValue: sequelize.NOW,
      allowNull:true
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  })
}
