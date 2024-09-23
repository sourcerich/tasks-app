import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelizeConnection = new Sequelize(
    process.env.DB_NAME || 'task_db',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: false,
    }
);

export async function checkConnection() {
    try {
        await sequelizeConnection.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

sequelizeConnection.sync({ alter: true }).then(() => {
    console.log("Database & tables created!");
});
