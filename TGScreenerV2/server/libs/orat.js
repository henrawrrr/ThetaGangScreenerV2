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
		this.#roi = roi;
		this.#collat = collat;
	}

	#getTestData = async () => {
		console.log(testData)
		return testData;
	}

	#parseData = (data) => {
		const res = data.data;
		res.filter(e => e.dte >= this.#dte - 7 && e.dte <= this.#dte + 7)
		return res;
	}

	retrieve = async () => {
		return await this.#parseData(this.#getTestData());
	}
}

    