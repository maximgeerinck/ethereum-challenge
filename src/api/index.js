import { version } from '../../package.json';
import { Router } from 'express';
import createWallet from './createWallet';
import getBalance from './getBalance';
import transaction from './transaction';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource	
	api.use('/createWallet', createWallet({ config, db }));
	api.use('/getBalance', getBalance({ config, db }));
	api.use('/transaction', transaction({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
