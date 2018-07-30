import resource from 'resource-router-middleware';
import web3 from "../web3";

export default () => resource({

	/** Property name to store preloaded entity on `request`. */
	id: 'balance',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, address, callback) {

		web3.eth.getBalance(address, function (err, result) {
			if (err) return callback(err, 0);
			const balance = web3.utils.fromWei(result);
			callback(err, balance);
		});

	},

	/** GET /:id - Return a given entity */
	read({ balance }, res) {
		res.json({ balance });
	},
});
