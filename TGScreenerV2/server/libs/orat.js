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
		for (let i = 0; i < puts.length; i++) {
			for (let j = i; j < puts.length; j++) {
				const dtheta = Math.abs(puts[i].theta - puts[j].theta) * -1;
				const dprice = Math.abs(puts[i].putValue - puts[j].putValue) * 100;
				const dstrike = Math.abs(puts[i].strike - puts[j].strike) * 100;
				if (dtheta <= this.#theta && dprice >= this.#roi && dstrike <= this.#collat) {
					pcs.push([puts[i].strike, puts[j].strike], puts[i].putValue, puts[j].putValue, dtheta, dprice, dstrike)
				}
			}
		}
		for (let i = 0; i < calls.length; i++) {
			for (let j = i; j < calls.length; j++) {
				const dtheta = Math.abs(calls[i].theta - calls[j].theta) * -1;
				const dprice = Math.abs(calls[i].callValue - calls[j].callValue) * 100;
				const dstrike = Math.abs(calls[i].strike - calls[j].strike) * 100;
				if (dtheta <= this.#theta && dprice >= this.#roi && dstrike <= this.#collat) {
					ccs.push([calls[i].strike, calls[j].strike], calls[i].callValue, calls[j].callValue, dtheta, dprice, dstrike)
				}
			}
		}
		const ret = {};
		ret.pcs = pcs;
		ret.ccs = ccs;
		return ret;
	}

	retrieve = async () => {
		const data = await this.#getTestData();
		return this.#parseData(data);
	}
}

    