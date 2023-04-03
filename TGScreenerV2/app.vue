<template>
  <div class="bg-teal-800">
    <div>
      <h1 class="text-3xl text-white font-bold text-center">
        Theta Gang Screener
      </h1>
    </div>
    <div>
      <div class="flex flex-col w-1/6 pl-4">
        <h1 class="pb-4 text-white">
          Query For Chains        
        </h1>
        <input v-model="ticker" class="border-2 border-white rounded-md mb-2" placeholder="Ticker" />
        <input v-model="theta" class="border-2 border-white rounded-md mb-2" placeholder="Theta" />
        <input v-model="dte" class="border-2 border-white rounded-md mb-2" placeholder="DTE" />
        <input v-model="roi" class="border-2 border-white rounded-md mb-2" placeholder="ROI" />
        <input v-model="collat" class="border-2 border-white rounded-md mb-2" placeholder="Collateral" />
      </div>
    </div>
  </div>
</template>

<script>
  import { optionsCaller } from "/server/libs/orat";
  const oc = new optionsCaller("AAPL", 0.3, 30, 0.05, 3000);
  const data = await oc.retrieve();
  console.log(data)
  let ticker = "";
  let theta = "";
  let dte = "";
  let roi = "";
  let collat = "";
</script>
