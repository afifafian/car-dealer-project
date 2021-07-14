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
    price: {
      type: type.NUMERIC,
      allowNull: false,
      validate: {
        min: {
          args: 10000000,
          msg: "Minimum Car price is IDR 10.000.000!"
        },
        notNull: {
          msg: "price is required!"
        },
        notEmpty: {
          msg: "price is required!"
        }
      }
    },
    stock: {
      type: type.NUMERIC,
      allowNull: false,
      validate: {
        notNull: {
          msg: "stock is required!"
        },
        notEmpty: {
          msg: "stock is required!"
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
