<template>
  <div class="body_notebook">
    <controller></controller>
    <div class="content_realm">
      <div class="control_panel_realm">
        <div class="block_create">
          <button v-on:click="addNotes"><i class="fa-solid fa-plus"></i></button>
        </div>
        <div class="block_search">
          <div class="form">
            <input ref="pol-search" type="text" placeholder="Search here..." v-model="search">
            <button type="submit" v-on:click="searchItem"><i class="fa-solid fa-question"></i></button>
          </div>
        </div>
      </div>

      <div class="list_realm">
        <div class="notification" v-for="(item) in items" :key="item._id">
          <div class="entry">
            <h3>{{item.titleNote}}</h3>
            <p>{{item.description}}</p>
          </div>
          <div class="entry_control">
            <i class="fa-solid fa-pen-to-square" v-on:click="editorOn(item)"></i>
            <i class="fa-solid fa-trash-can" v-on:click="deleteNote(item)"></i>
          </div>
        </div>
      </div>

    </div>
  </div>

  <div class="modal-add" v-show="isModalVisibleAdd">
    <div class="data_add">
      <h3>Create a record</h3>
      <form @submit.prevent="addListNote">
        <label>
          <input placeholder="Title of the note" v-model="title" required>
        </label>
        <label>
          <textarea placeholder="The text of the entry" v-model="text" required></textarea>
        </label>
        <div class="btn-add">
          <button type="submit">Confirm</button>
          <button type="button" @click="closeModal">Cancel</button>
        </div>
      </form>
    </div>
  </div>

  <div class="modal-editor" v-show="isModalVisEdit">
    <div class="container">
      <i class="fa-solid fa-xmark" v-on:click="editorOff"></i>
    <form @submit.prevent="updateItem">
      <label>
        <input placeholder="Title of the note" v-model="editTitle">
      </label>
      <label>
        <textarea placeholder="The text of the entry" v-model="editText"></textarea>
      </label>
      <button type="submit">Confirm</button>
    </form>
    </div>
  </div>

</template>

<script>
import ControlPanel from "@/components/controlPanel";
import axios from "axios";

export default {
  name: "working-environ",
  components:{
    // eslint-disable-next-line vue/no-unused-components
    "controller": ControlPanel
  },
  data: () => ({
    isModalVisibleAdd: false,
    isModalVisEdit: false,
    search: '',
    title: '',
    text: '',
    editTitle: '',
    editText: '',
    editID: '',
    items: []
  }),
  async mounted(){
    await axios.post('http://localhost:3000/api/getAllNote',{
      nickname: localStorage.getItem('person')
    })
    .then((response) =>{
      this.items = response.data
      console.log(response.data)
    }).catch((e) =>{
      console.log(e)
    })
  },
  methods: {
    addNotes(){
      this.isModalVisibleAdd = true;
    },
    closeModal(){
      this.isModalVisibleAdd = false;
    },
    editorOn(item){
      this.isModalVisEdit = true;
      this.editTitle = item.titleNote;
      this.editText = item.description;
      this.editID = item._id;
    },
    editorOff(){
      this.isModalVisEdit = false;
    },
    addListNote: async function(){
      await axios.post('http://localhost:3000/api/addListNote',{
        title: this.title,
        text: this.text,
        nickname: localStorage.getItem('person')
      })
      .then(() =>{
        this.isModalVisibleAdd = false;
        this.title = "";
        this.text = "";
      })
      .catch((e)=>{
        console.log(e)
      })
    },
    deleteNote: async function(item){
      await axios.delete('http://localhost:3000/api/deleteNotes/' + item._id)
    },
    updateItem: async function(){
      await axios.post('http://localhost:3000/api/editNote', {
        title: this.editTitle,
        text: this.editText,
        id: this.editID
      })
      .then(()=>{
        this.isModalVisEdit = false;
      })
      .catch((e)=>{
        console.log(e)
      })
    },
    searchItem(){
      console.log(this.$refs["pol-search"].value)
      // console.log(this.items.title.filter(this.$refs["pol-search"].value))
    },
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
input, button{
  font-family: 'ISOCPEUR',serif;
}
.body_notebook{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  font-family: 'ISOCPEUR',serif;
  font-size: 22px;
  .content_realm{
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    .control_panel_realm{
      width: 100%;
      height: 90px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .block_create{
        width: 140px;
        display: flex;
        justify-content: center;
        align-items: center;
        button{
          width: 40px;
          height: 40px;
          border: none;
          border-radius: 5px;
          font-size: 20px;
          text-align: center;
          color: #FFFFFF;
          background: #363e82;
          cursor: pointer;
        }
      }
      .block_search{
        width: 260px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 40px;
        border-radius: 5px;
        background: #363e82;
        .form{
          input{
            width: 220px;
            height: 40px;
            border: none;
            outline: none;
            padding: 5px;
            border-radius: 6px;
            font-size: 16px;
            color: #FFFFFF;
            background: none;
          }
          input::-webkit-input-placeholder{
            color: #adadad;
          }
          input::-moz-placeholder{
            color: #adadad;
          }
          button{
            width: 40px;
            height: 40px;
            border: none;
            color: #adadad;
            font-size: 16px;
            background: none;
            cursor: pointer;
          }
        }
      }
    }
    .list_realm{
      width: 100%;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .notification{
        width: 250px;
        height: auto;
        display: flex;
        flex-direction: row;
        margin: 20px;
        background: #ccb2f1;
        .entry{
          width: 100%;
          height: 100%;
          h3{
            font-size: 35px;
            padding: 12px;
            color: black;
            word-break: break-word;
          }
          p{
            padding: 20px;
            color: black;
            word-break: break-word;
          }
        }
        .entry_control{
          width: 30px;
          display: block;
          flex-direction: column;
          align-items: center;
          color: black;
        }
      }
    }
  }
}

.modal-add{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  .data_add{
    width: 500px;
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #271c55;
    h3{
      font-family: 'ISOCPEUR',serif;
      font-size: 30px;
      padding-top: 20px;
      color: #FFFFFF;
    }
    form{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-bottom: 20px;
      .btn-add{
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        button{
          width: 120px;
          height: 30px;
          margin: 10px;
          border: none;
          font-size: 18px;
          background: #f15547;
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
      label{
        margin-left: 20px;
        input{
          width: 220px;
          height: 40px;
          margin-top: 20px;
          outline: none;
          padding: 5px;
          font-size: 16px;
        }
        textarea{
          width: 96%;
          height: 120px;
          resize: none;
          outline: none;
          padding: 10px;
          font-size: 16px;
        }
      }
    }
  }
}
  .modal-editor{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    .container{
      width: 300px;
      height: 300px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      flex-direction: column;
      background: #271c55;
      i{
        width: 100%;
        display: flex;
        justify-content: flex-end;
        font-size: 25px;
        padding: 10px;
      }
      form{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-direction: column;
        label{
          input{
            width: 220px;
            height: 40px;
            margin-top: 20px;
            outline: none;
            font-size: 16px;
            padding: 5px;
          }
          textarea{
            width: 220px;
            height: 120px;
            resize: none;
            outline: none;
            font-size: 16px;
            padding: 5px;
          }
        }
        button{
          width: 120px;
          height: 30px;
          margin: 10px;
          border: none;
          font-size: 18px;
          background: #f15547;
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