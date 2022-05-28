<template>
  <div class="modal-backdrop">
    <div class="modal-block">
      <form @submit.prevent="singIn">
        <div class="head-block">
          <button type="button" class="btn-close" @click="close">X</button>
        </div>
        <h3>Entrance</h3>
        <label>
          <input type="email" class="form-control" placeholder="Email" v-model="email">
        </label>
        <label>
          <input type="password" class="form-control" placeholder="Password" v-model="password">
        </label>
        <div class="action">
          <button type="submit" class="btn btn-ol">
            Sing in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  name: "modalLog",
  data: () =>({
    email: '',
    password: '',
    success: false
  }),
  methods: {
    singIn: async function(){
      await axios.post('http://localhost:3000/api/login', {
        email: this.email,
        password: this.password
      })
          .then((response) =>{
            console.log(response.data)
            localStorage.setItem('auth', response.data.success)
            localStorage.setItem('person', response.data.nickname)
            localStorage.setItem('email', response.data.personLog)
            router.push('/notes')
          })
          .catch((error) =>{
            console.log(error)
          })
    },
    close(){
      this.$emit('close');
    },
  }
}
</script>

<style lang="less">
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-block{
  width: 330px;
  height: 340px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  form{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    label{
      margin-top: -15px;
      input{
        font-family: 'ISOCPEUR',serif;
        font-size: 18px;
      }
    }
    h3{
      font-size: 30px;
      color: black;
    }
    .form-control{
      height: 35px;
      width: 240px;
      border: none;
      outline: none;
      border-bottom: 2px solid black ;
    }
    .head-block{
      width: 100%;
      display: flex;
      justify-content: flex-end;
      margin-top: -20px;
    }
  }
}
</style>