import { DataTypes, Model } from 'sequelize';
import { sequelizeConnection } from '../db/connection';

class Task extends Model {
    public id!: number;
    public date!: Date;
    public description!: string;
    public is_finished!: boolean;
}

Task.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        task: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        is_finished: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize: sequelizeConnection,
        tableName: 'task',
        timestamps: true,
        paranoid: true
    }
);

export default Task;
