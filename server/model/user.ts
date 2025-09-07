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
  declare userId: CreationOptional<number>;
  declare email: string;
  declare secret: string;
  declare imageUrl: string;
}

IceUser.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secret: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'IceUser',
    timestamps: false,
    sequelize: sequelize,
  }
);
