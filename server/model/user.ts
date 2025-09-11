import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';
import { sequelize } from '../database/database';

export class IceUser extends Model<
  InferAttributes<IceUser>,
  InferCreationAttributes<IceUser>
> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare password: string;
  declare imageUrl: string;
  declare username: string;
}

IceUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    modelName: 'IceUser',
    timestamps: false,
    sequelize: sequelize,
  }
);
