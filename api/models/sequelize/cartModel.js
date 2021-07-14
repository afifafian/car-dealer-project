module.exports = (sequelize, type) => {
  return sequelize.define('cart', {        
    id: {
      type: type.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: type.BIGINT,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      validate: {
        notNull: {
          msg: "Please select the customer!"
        },
        notEmpty: {
          msg: "Please select the customer!"
        }
      }
    },
    car_id: {
      type: type.BIGINT,
      allowNull: false,
      references: {
        model: 'cars',
        key: 'car_id'
      },
      validate: {
        notNull: {
          msg: "Please select car you want to purchased!"
        },
        notEmpty: {
          msg: "Please select car you want to purchased!"
        }
      }
    },
    status: {
      type: type.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please specify the booking status!"
        },
        notEmpty: {
          msg: "Please specify the booking status!"
        }
      }
    },
    cost: {
      type: type.NUMERIC
    },
    quantity: {
      type: type.NUMERIC,
      allowNull: false,
      validate: {
        min: {
          args: 1,
          msg: "Minimum quantity is 1!"
        },
        notNull: {
          msg: "Please input quantity!"
        },
        notEmpty: {
          msg: "Please input quantity!"
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
