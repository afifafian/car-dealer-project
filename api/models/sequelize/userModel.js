module.exports = (sequelize, type) => {
  return sequelize.define('users', {        
    id: {
      type: type.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: type.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid email format!"
        },
        notNull: {
          msg: "email is required!"
        },
        notEmpty: {
          msg: "email is required!"
        }
      },
      unique: {
        args: true,
        msg: 'email is already registered!'
      }
    },
    username: {
      type: type.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "username is required!"
        },
        notEmpty: {
          msg: "username is required!"
        }
      },
      unique: {
        args: true,
        msg: 'username is already registered!'
      }
    },
    firstname: {
      type: type.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "firstname is required!"
        },
        notEmpty: {
          msg: "firstname is required!"
        }
      }
    },
    lastname: {
      type: type.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "lastname is required!"
        },
        notEmpty: {
          msg: "lastname is required!"
        }
      }
    },
    password: {
      type: type.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password is required!"
        },
        notEmpty: {
          msg: "password is required!"
        },
        len: {
          args: [7, 150],
          msg: 'Password must be at least 7 characters in length'
        }
      }
    },
    address: {
      type: type.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "address is required!"
        },
        notEmpty: {
          msg: "address is required!"
        }
      }
    },
    phone_number: {
      type: type.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "phone number is required!"
        },
        notEmpty: {
          msg: "phone number is required!"
        }
      }
    },
    user_type: {
      type: type.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "user type is required!"
        },
        notEmpty: {
          msg: "user type is required!"
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
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  })
}
