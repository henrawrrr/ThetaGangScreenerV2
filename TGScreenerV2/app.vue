<template>
  <div class="bg-teal-800">
    <div>
      <h1 class="pb-6 text-3xl text-white font-bold text-center">
        Theta Gang Screener
      </h1>
    </div>
    <div class="flex flex-row justify-center">
      <div class="flex flex-col w-1/6 pl-4">
        <h1 class="pb-4 text-white">
          Query For Chains        
        </h1>
        <input v-model="ticker" class="border-2 border-white rounded-md mb-2" placeholder="Ticker" />
        <input v-model="theta" class="border-2 border-white rounded-md mb-2" placeholder="Theta" />
        <input v-model="dte" class="border-2 border-white rounded-md mb-2" placeholder="DTE" />
        <input v-model="roi" class="border-2 border-white rounded-md mb-2" placeholder="ROI" />
        <input v-model="collat" class="border-2 border-white rounded-md mb-2" placeholder="Collateral" />
        <button onclick="sendQuery()" class="border-2 border-white rounded-md mb-2 text-white">Search</button>
      </div>
      <div class="ml-5 px-2 border-2 border-white rounded-md">
        <h1 class="text-white">
          PCS
        </h1>
        <table>
          <thead v-if="compData?.pcs">
            <tr class="text-white">
              <th class="pl-2 text-left">Buy</th>
              <th class="pl-2 text-left">Sell</th>
              <th class="pl-2 text-left">Profit</th>
              <th class="pl-2 text-left">ROI</th>
              <th class="pl-2 text-left">Theta</th>
              <th class="pl-2 text-left">Collat</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="compData?.pcs" v-for="spread in compData.pcs" class="text-white">
              <td class="pl-2">{{ spread[0][0] }}P</td>
              <td class="pl-2">{{ spread[0][1] }}P</td>
              <td class="pl-2">${{ spread[4].toFixed(2) }}</td>
              <td class="pl-2">{{ (spread[4] / spread[5] * 100).toFixed(2) }}%</td>
              <td class="pl-2">{{ spread[3].toFixed(3) }}</td>
              <td class="pl-2">{{ spread[5] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="ml-5 px-2 border-2 border-white rounded-md">
        <h1 class="text-white">
          CCS
        </h1>
        <table>
          <thead v-if="compData?.ccs">
            <tr class="text-white">
              <th class="pl-2 text-left">Buy</th>
              <th class="pl-2 text-left">Sell</th>
              <th class="pl-2 text-left">Profit</th>
              <th class="pl-2 text-left">ROI</th>
              <th class="pl-2 text-left">Theta</th>
              <th class="pl-2 text-left">Collat</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="compData?.ccs" v-for="spread in compData.ccs" class="text-white">
              <td class="pl-2">{{ spread[0][1] }}C</td>
              <td class="pl-2">{{ spread[0][0] }}C</td>
              <td class="pl-2">${{ spread[4].toFixed(2) }}</td>
              <td class="pl-2">{{ (spread[4] / spread[5] * 100).toFixed(2) }}%</td>
              <td class="pl-2">{{ spread[3].toFixed(3) }}</td>
              <td class="pl-2">{{ spread[5] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
  </div>
</template>

<script>
  import { optionsCaller } from "/server/libs/orat";
  const oc = new optionsCaller("AAPL", -0.03, 30, 0.05, 3000);
  let data = await oc.retrieve();
  export default{
    computed: {
      compData() {
        return data;
      }
    }
  }
  //console.log(data.pcs)
  let ticker = "";
  let theta = -0.3;
  let dte = 30;
  let roi = 0.03;
  let collat = 3000;

  const sendQuery = async () => {
    oc.updateQuer(ticker, theta, dte, roi, collat)
    data = await oc.retrieve();
  }
</script>
