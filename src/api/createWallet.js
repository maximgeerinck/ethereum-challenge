import resource from 'resource-router-middleware';
import web3 from "../web3";

export default () => resource({

	/** Property name to store preloaded entity on `request`. */
	id: 'facet',

	/** GET / - List all entities */
	// not possible on testnet, can't save wallets
	index({ params }, res) {
		var password = Math.random().toString(36).slice(-8);

		web3.eth.personal.newAccount(password).then((address) => {
			res.json({
				password, address
			});
		}).catch((ex) => {
			console.error(ex);
			res.json({ error: true });
		})

	},
});
