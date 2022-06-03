<template>
  <div class="body_notebook">
    <controller></controller>

    <div class="customization">

      <div class="setDateUser">
        <form>
          <h2>Password change</h2>
          <label>
            <input type="password" placeholder="password">
          </label>
          <label>
            <input type="password" placeholder="New password">
          </label>
          <label>
            <button type="submit">Change</button>
          </label>
        </form>
      </div>

      <div class="changeEmail">
        <form>
          <h2>Email change</h2>
          <label>
            <input type="email" placeholder="Email">
          </label>
          <label>
            <input type="email" placeholder="New email">
          </label>
          <label>
            <button type="submit">Change</button>
          </label>
        </form>
      </div>

      <div class="connectSocial">
          <form @submit.prevent="addIDForUser">
            <p v-if="!ID">ID user: undefined</p>
            <p v-else>ID user: {{ID}}</p>
            <div class="helpID">
              <a href="https://t.me/SevenNotifi_Bot">Find out ID</a>
            </div>
            <div class="active_id">
              <input type="text" v-model="ID">
              <button type="submit">Connect</button>
            </div>
          </form>
      </div>

    </div>

  </div>
</template>

<script>
import ControlPanel from "@/components/controlPanel";
import axios from "axios";
export default {
  name: "extUser",
  components:{
    // eslint-disable-next-line vue/no-unused-components
    "controller": ControlPanel
  },
  data: () =>({
    ID: localStorage.getItem('IDtg'),
  }),
  methods:{
    addIDForUser: async function(){
      await axios.post('http://localhost:3000/addUserID',{
        IDT: this.ID,
        nickname: localStorage.getItem('person')
      })
      .then((response)=>{
        alert(response.data)
        localStorage.setItem('IDtg', this.ID)
        location.reload()
      })
      .catch((e)=>{
        console.log(e)
      })
    },
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
.customization{
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .setDateUser{
    width: 300px;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #363e82;
    form{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      label{
        input{
          width: 180px;
          height: 25px;
          padding-left: 5px;
          margin-top: 10px;
          margin-bottom: 10px;
          outline: none;
          font-size: 18px;
        }
        button{
          width: 80px;
          font-size: 18px;
        }
      }
    }
  }
  .connectSocial{
    width: 300px;
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #363e82;
    form{
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      p{
        font-size: 30px;
      }
      a{
        color: #d7d7d7;
      }
      input{
        width: 180px;
        height: 25px;
        margin-top: 20px;
        margin-bottom: 20px;
        outline: none;
        font-size: 20px;
        padding-left: 5px;
      }
      button{
        width: 80px;
        font-size: 18px;
      }
      .active_id, .noneActive_id{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .changeEmail{
    width: 300px;
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #363e82;
    form{
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      label{
        input{
          width: 200px;
          height: 25px;
          padding-left: 5px;
          margin-top: 10px;
          margin-bottom: 10px;
          outline: none;
          font-size: 18px;
        }
        button{
          width: 80px;
          font-size: 18px;
        }
      }
    }
  }
}
</style>