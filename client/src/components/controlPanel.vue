<template>
  <div class="nav_panel">
    <div class="top_panel">
      <div class="company_logo">
        <h1>SEVENTEEN</h1>
      </div>
      <hr>
      <div class="data_user">
        <img :src="require('@/assets/avatar-test.jpg')" alt="avatar">
        <p class="nickname">{{nickname}}</p>
      </div>
      <div class="toolbox_note">
        <router-link to="/notes">
        <div class="dies">
         <p><ion-icon name="create-outline"></ion-icon>Notes</p>
        </div>
        </router-link>
        <router-link to="/calendar">
        <div class="dies">
          <p><ion-icon name="calendar-outline"></ion-icon>Calendar</p>
          </div>
        </router-link>
<!--        <router-link to="/alertUs">-->
<!--        <div class="dies">-->
<!--         <p><ion-icon name="notifications-outline"></ion-icon>Notifications</p>-->
<!--        </div>-->
<!--        </router-link>-->
        <div class="dies">
          <p><ion-icon name="git-merge-outline"></ion-icon>In development</p>
        </div>
      </div>
      <hr>
      <div class="toolbox_user">
        <div class="tool">
          <p><ion-icon name="walk-outline"></ion-icon>Help</p>
        </div>
        <router-link to="/setting">
        <div class="tool">
          <p><ion-icon name="settings-outline"></ion-icon>Settings</p>
        </div>
        </router-link>
      </div>
    </div>
    <div class="down_panel">
      <hr>
      <div class="mode" v-on:click="toggleTheme">
        <p><ion-icon name="contrast-outline"></ion-icon>Theme</p>
      </div>
      <div class="mode" v-on:click="logout">
        <p><ion-icon name="log-out-outline"></ion-icon>Sing out</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  name: "controlPanel",
  data(){
    return{
      nickname: localStorage.getItem('person'),
      isActive: true,
    }
  },
  methods:{
    logout: async function(){
      await axios.get('http://localhost:3000/api/logout')
      .then(() =>{
        localStorage.removeItem('auth')
        localStorage.removeItem('person')
        localStorage.removeItem('email')
        localStorage.removeItem('itemsContainer')
        localStorage.removeItem('IDtg')
        router.push('/')
      })
      .catch((e) =>{
        console.log(e)
      })
    },
    toggleTheme: function (){
      let bodyth = document.querySelector('body')
      console.log(bodyth)
    },
  }
}
</script>

<style lang="less">

.dark{
  background: #ffffff;
}

a{
  text-decoration: none;
  color: white;
  width: 100%;
}

.nav_panel{
  width: 250px;
  min-height: 100vh;
  display: flex;
  justify-content:  space-between;
  align-items: center;
  flex-direction: column;
  background: #271c55;
  color: #FFFFFF;
.top_panel{
  width: 100%;
  height: 550px;
  margin-top: 30px;
hr{
  margin: 20px;
  border-color: #ad3f36;
}
.company_logo{
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  color: #fcc83e;
}
.data_user{
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  margin-top: 15px;
img{
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-left: 20px;
}
.nickname{
  font-size: 25px;
  padding-left: 15px;
}
}
.toolbox_note{
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  flex-direction: column;
.dies{
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  transition: all ease-out 0.2s;
  p{
    text-align: center;
    ion-icon{
      padding-right: 5px;
      font-size: 20px;
    }
    i{
      font-size: 15px;
      padding-right: 5px;
    }
  }
}
.dies:hover{
  background: #363e82;
  border-left: 2px solid #ff594b;
  cursor: pointer;
}
}
.toolbox_user {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
.tool{
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  transition: all ease-out 0.2s;
  p{
    ion-icon{
      font-size: 20px;
      padding-right: 5px;
    }
  }
}
.tool:hover{
  background: #363e82;
  border-left: 2px solid #ff594b;
  cursor: pointer;
}
}
}
.down_panel{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
hr{
  width: 200px;
  margin: 20px;
  border-color: #ad3f36;
}
.mode{
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
  transition: all ease-out 0.2s;
  p{
    ion-icon{
      font-size: 20px;
      padding-right: 5px;
    }
  }
}
.mode:hover{
  background: #363e82;
  border-left: 2px solid #ff594b;
  cursor: pointer;
}
}
}
</style>