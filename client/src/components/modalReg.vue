  <template>
  <div class="modal-backdrop">
    <div class="modal">
      <form @submit.prevent="SingUp">
        <div class="head">
          <button type="button" class="btn-close" @click="close">X</button>
        </div>
        <h3>Registration</h3>
        <label>
          <input type="text" class="form-control" placeholder="Nickname" v-model="username" required>
        </label>
        <label>
          <input type="email" class="form-control" placeholder="Email" v-model="email" required>
        </label>
        <label>
          <input type="password" class="form-control" placeholder="Password" v-model="password" required>
        </label>
        <div class="action">
          <button type="submit" class="btn btb-dark">
            Confirm
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
  name: "modalWin",
  data: () => ({
    username: '',
    email: '',
    password: '',
  }),
  methods: {
    close(){
      this.$emit('close');
    },
    SingUp: async function (){
      await axios.post('http://localhost:3000/api/register', {
        username: this.username,
        email: this.email,
        password: this.password
      })
      .then((response) =>{
        console.log(response)
        if(response.data.statusAuth === true){
          router.push('/login');
        }
      })
      .catch((error) =>{
        console.log(error)
      })
    }
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
  font-family: 'ISOCPEUR',serif;
}
.modal {
  background: #FFFFFF;
  overflow-x: auto;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 350px;
  height: 370px;
  form{
    width: auto;
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    h3{
      font-size: 30px;
      color: black;
    }
    label{
      display: flex;
      flex-direction: column;
      input{
        font-family: 'ISOCPEUR',serif;
        font-size: 18px;
      }
    }
    .form-control{
      height: 35px;
      width: 240px;
      border: none;
      outline: none;
      border-bottom: 2px solid black ;
    }
    .head{
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: -20px;
    }
  }

}

.btn{
  width: 120px;
  height: 30px;
  border: none;
  font-size: 16px;
  color: black;
  background: #f15547;
  transition: all ease-out 0.2s;
}
.btn:hover{
  background: #d34d3f;
  transition: all ease-out 0.2s;
}
.btn:active{
  background: #b24435;
  transition: all ease-out 0.1s;
}

.btn-close {
  border: none;
  font-size: 15px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  background: transparent;
}
</style>