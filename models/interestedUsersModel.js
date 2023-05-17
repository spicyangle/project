module.exports = (Sequelize, DataTypes) => {
  const InterestedUser = Sequelize.define(
    "interestedUser",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: {
          msg: 'You have already showed interest to event',
        },
        references: {
          model: "users",
          key: "id",
        },
      },

      event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "events",
          key: "event_id",
        },
      },
    },
    { timestamps: false }
  );
  return InterestedUser;
};
