import axios from 'axios';
import { testData, test } from '../../constants/testData'

// export const getTestData = async (testTicker) => {
// 	console.log(testTicker)
// 	var config = {
// 		method: 'get',
// 		url: 'https://api.orats.io/datav2/strikes?token=demo&ticker=AAPL',
// 		headers: { }};
// 	axios(config)
// 		.then(function (response) {
// 			console.log(JSON.stringify(response.data));
// 			return "Yes";
// 		})
// 		.catch(function (error) {
// 			console.log(error);
// 			return "No";
// 		});
// 	return testData;
// }

export class optionsCaller {
	#ticker;
	#theta;
	#dte;
	#roi;
	#collat;
	constructor(ticker, theta = -0.3, dte = 30, roi = 0.05, collat = 3000) {
		this.#ticker = ticker;
		this.#theta = theta;
		this.#dte = dte;
		this.#roi = roi * collat;
		this.#collat = collat;
	}

	updateQuery = (ticker, theta, dte, roi, collat) => {
		this.#ticker = ticker;
		this.#theta = theta;
		this.#dte = dte;
		this.#roi = roi * collat;
		this.#collat = collat;
	}

	#getTestData = async () => {
		return testData;
	}

	#parseData = (data) => {
		const res = data.data;
		const newres = res.filter(e => e.dte >= this.#dte - 7 && e.dte <= this.#dte + 7)
		const puts = [];
		const calls = [];
		newres.forEach(strike => {
			if (strike.callVolume != 0) {
				calls.push([strike.expirDate, strike.strike, strike.callValue, strike.theta])
			}
			if (strike.putVolume != 0) {
				puts.push([strike.expirDate, strike.strike, strike.putValue, strike.theta])
			}
		})
		const pcs = [];
		const ccs = [];
		for (let i = 0; i < puts.length - 1; i++) {
			for (let j = i + 1; j < puts.length; j++) {
				const dtheta = Math.abs(puts[i][3] - puts[j][3]) * -1;
				const dprice = Math.abs(puts[i][2] - puts[j][2]) * 100
				const dstrike = Math.abs(puts[i][1] - puts[j][1]) * 100;
				if (dtheta <= this.#theta && dprice >= this.#roi && dstrike <= this.#collat) {
					pcs.push([[puts[i][1], puts[j][1]], puts[i][2], puts[j][2], dtheta, dprice, dstrike])
				}
			}
		}
		for (let i = 0; i < calls.length - 1; i++) {
			for (let j = i + 1; j < calls.length; j++) {
				const dtheta = Math.abs(calls[i][3] - calls[j][3]) * -1;
				const dprice = Math.abs(calls[i][2] - calls[j][2]) * 100
				const dstrike = Math.abs(calls[i][1] - calls[j][1]) * 100;
				if (dtheta <= this.#theta && dprice >= this.#roi && dstrike <= this.#collat) {
					ccs.push([[calls[i][1], calls[j][1]], calls[i][2], calls[j][2], dtheta, dprice, dstrike])
				}
			}
		}
		const ret = {};
		ret.pcs = pcs;
		ret.ccs = ccs;
		return ret;
	}

	retrieve = async () => {
		console.log(this.#ticker + " " + this.#theta + " " + this.#dte + " " + this.#roi + " " + this.#collat)
		const data = await this.#getTestData();
		return this.#parseData(data);
	}
}

    