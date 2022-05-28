<template>
  <div class="box-login">
  <form @submit.prevent="formSubmit">
    <div class="head">
      <h3>Entrance</h3>
    </div>
    <label>
      <input type="email" placeholder="Email" class="form-control" v-model="email" required>
      <input type="password" placeholder="Password" class="form-control" v-model="password" required>
    </label>
    <div class="action">
      <button type="submit">Log in</button>
      <router-link to="/"><button>Main</button></router-link>

    </div>
  </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  name: "authViews",
  data: () =>({
    email: '',
    password: '',
    success: false
  }),
  methods:{
      formSubmit: async function(){
        await axios.post('http://localhost:3000/api/login', {
          email: this.email,
          password: this.password
        })
        .then((response) =>{
            console.log(localStorage)
            localStorage.setItem('auth', response.data.success)
            localStorage.setItem('person', response.data.nickname)
            localStorage.setItem('email', response.data.personLog)
            router.push('/notes')
        })
        .catch((error) =>{
            console.log(error)
        })
    }
  }
}

</script>

<style lang="less">
.box-login{
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #191e3c;
  font-family: 'ISOCPEUR',serif;
  color: black;
  form{
    width: 350px;
    height: 350px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    background: #FFFFFF;
    border-radius: 3px;
    .head{
      h3{
        font-size: 30px;
      }
    }
    label{
      height: 100px;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      input{
        width: 250px;
        height: 30px;
        border: none;
        outline: none;
        border-bottom: 2px solid #ff594b;
        font-family: 'ISOCPEUR',serif;
        font-size: 18px;
      }
    }
    .action{
      width: 250px;
      display: flex;
      justify-content: space-evenly;
      a{
        width: 100px;
        height: 30px;
      }
      button{
        width: 100px;
        height: 30px;
        border: none;
        border-radius: 2px;
        box-shadow: 0px 12px 13px -2px rgba(34, 60, 80, 0.19);
        background: #f15547;
        color: black;
        font-family: 'ISOCPEUR',serif;
        font-size: 18px;
        transition: all ease-out 0.2s;
      }
      button:hover{
        background: #d34d3f;
        transition: all ease-out 0.2s;
      }
      button:active{
        background: #b24435;
        transition: all ease-out 0.1s;
      }
    }
  }
}
</style>