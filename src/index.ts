import { sequelizeConnection } from './core/database/sequelize';

sequelizeConnection.sync().then(() => {
	console.log(`Connected to ${sequelizeConnection.getDatabaseName()} Database`);
});
