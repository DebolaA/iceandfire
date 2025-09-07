import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';
import { sequelize } from '../database/database';

export class Fact extends Model<
  InferAttributes<Fact>,
  InferCreationAttributes<Fact>
> {
  declare factId: CreationOptional<number>;
  declare title: string;
  declare imageUrl: string;
  declare description: string;
}

Fact.init(
  {
    factId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'Fact',
    timestamps: false,
    sequelize: sequelize,
  }
);

export class IceUser extends Model<
  InferAttributes<IceUser>,
  InferCreationAttributes<IceUser>
> {
  declare userId: CreationOptional<number>;
  declare email: string;
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
