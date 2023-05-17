module.exports = (Sequelize, DataTypes) => {
  const Accommodation = Sequelize.define("accommodations", {
    accommodation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    creator_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please provide title of the accommodation.",
        },
      },
    },
    area: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please provide area of accommodation.",
        },
      },
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please provide price of the accommodation.",
        },
      },
    },
    amenities: {
      type: DataTypes.STRING,
      allowNull: true,
      },

    persons_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please provide maximum number of persons.",
        },
      },
    },

    beds_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please provide number of beds.",
        },
      },
    },

    beds_type: {
      type: DataTypes.STRING,
      allowNull: true,
      
    },
    availability: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    minimum_stay_days: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please provide minimum stay days in accommodation",
        },
      },
    },

    room_type: {
     type: DataTypes.STRING,
     allowNull: false,
    },


    rating: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    review: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rules: {
      type: DataTypes.STRING, 
      allowNull: false,
      },
    description:
    {
      type: DataTypes.STRING,
      allowNull: true,
    },

    adm_confirm:
    {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  },
  { timestamps: false });

  return Accommodation;
};
