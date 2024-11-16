import { Sequelize } from "sequelize";

const sequelize = new Sequelize("user_db", "root", "", {
    host:"localhost",
    dialect:"mysql",
});

export default sequelize;