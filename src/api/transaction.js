import resource from 'resource-router-middleware';
import web3 from "../web3";

export default () => resource({

	/** Property name to store preloaded entity on `request`. */
	id: 'transaction',

	/** POST / - Create a new entity */
	create({ body }, res) {

		if (!body || !body.destination || body.amount === undefined || !body.privateKey) {
			return res.json({ success: false, message: "E_VALIDATION" });
		}

		const account = web3.eth.accounts.privateKeyToAccount('0x' + body.privateKey); // 0x has to be added to the private key

		const transaction = {
			chainId: 4,	// the rinkeby chain ID
			from: account.address,
			to: body.destination,
			value: web3.utils.toWei(body.amount, "ether"),
			gas: '200000'
		}

		account.signTransaction(transaction).then(signed => {
			web3.eth
				.sendSignedTransaction(signed.rawTransaction)
				.on('confirmation', (confirmationNumber, receipt) => {
					console.log('=> confirmation: ' + confirmationNumber);
				})
				.on('transactionHash', hash => {
					res.json({ success: true, hash });
				})
				.on('receipt', receipt => {
					console.log('=> reciept');
					console.log(receipt);
				})
				.on('error', (err) => {
					res.json({ success: false });
					console.error(err);
				})
		})
			.catch((err) => {
				console.error(err);
				res.json({ success: false });
			})
	},
});


0x5C94a8Bc02f787dA4fDf193b9DAcd0b39e369940