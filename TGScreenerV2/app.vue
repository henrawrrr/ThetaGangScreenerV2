<template>
  <div class="bg-teal-800">
    <div>
      <h1 class="text-3xl text-white font-bold text-center">
        Theta Gang Screener
      </h1>
    </div>
    <div>
      <query-search>
      </query-search>
    </div>
  </div>
</template>

<script setup>
  import { optionsCaller } from "/server/libs/orat";
  const oc = new optionsCaller("AAPL", 0.3, 30, 0.05, 3000);
  const data = await oc.retrieve();
</script>
