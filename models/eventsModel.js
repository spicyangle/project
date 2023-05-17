module.exports = (Sequelize, DataTypes) => {
  const Event = Sequelize.define(
    "event",
    {
      event_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      creator_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please provide title.",
          },
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please provide location.",
          },
        },
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please provide price.",
          },
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [["Trip", "Cultural", "Party"]],
            msg: "Please provide type of event. Possible values: Trip, Cultural, Party, Sports",
          },
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        isDate: true,
        isDate: { msg: "Please provide date format dd-mm-yy" },
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/,
            msg: "Invalid time format. Please use HH:MM or HH:MM:SS format",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
  return Event;
};
