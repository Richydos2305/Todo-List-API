import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelizeConnection } from '../database/sequelize';
import { User } from '../interfaces/models';

export class Users
  extends Model<InferAttributes<Users>, InferCreationAttributes<Users, { omit: 'id' }>>
  implements User
{
  declare id: CreationOptional<number>;

  declare name: string;

  declare email: string;

  declare password: string;
}

Users.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(225),
        allowNull: false
      }
    },
    {
      tableName: 'users',
      sequelize: sequelizeConnection
    }
  );
