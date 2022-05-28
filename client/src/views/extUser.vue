<template>
  <div class="body_notebook">
    <controller></controller>
  </div>
</template>

<script>
import ControlPanel from "@/components/controlPanel";
export default {
  name: "extUser",
  components:{
    // eslint-disable-next-line vue/no-unused-components
    "controller": ControlPanel
  }
}
</script>

<style lang="less">
.body_notebook{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  font-family: 'ISOCPEUR',serif;
}
</style>