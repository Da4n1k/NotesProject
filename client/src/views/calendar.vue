<template>
  <div class="body_notebook">
    <controller></controller>
    <div class="box-cal">
      <FullCalendar :options="calendarOptions"></FullCalendar>
    </div>
  </div>
</template>

<script>
import ControlPanel from "@/components/controlPanel";
import '@fullcalendar/core/vdom'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "calendar",
  components:{
    // eslint-disable-next-line vue/no-unused-components
    "controller": ControlPanel,
    // eslint-disable-next-line vue/no-unused-components
    FullCalendar
  },
  data(){
    return{
      calendarOptions:{
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        events: [
          {}
        ]
      }
    }
  }
}

</script>

<style lang="less">
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body{
  display: flex;
  justify-content: center;
  min-height: 100vh;
}
.body_notebook{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  font-family: 'ISOCPEUR',serif;

  .box-cal{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    .fc{
      width: 160vh;
      height: 96vh;
      .fc-header-toolbar{
        padding-top: 20px;
      }
    }
  }

}

</style>