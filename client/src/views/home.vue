<template>
  <div class="all_content">
  <header>
    <div class="logo">
      <router-link to="/"><h1>SEVENTEEN</h1></router-link>
    </div>
    <div class="controller-menu">
      <ul>
        <li>
          <a href="">
            <span class="icons"></span>
            <span class="title">About</span>
          </a>
        </li>
        <li>
          <a href="">
            <span class="icons"></span>
            <span class="title">Price</span>
          </a>
        </li>
        <li>
          <a href="">
            <span class="icons"></span>
            <span class="title">Help</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="account">
      <div class="nav-account">
        <button id="reg" @click="showModal">Sing up</button>
        <span> | </span>
        <button id="entrance" @click="showModal2">Sing in</button>
      </div>
    </div>
  </header>

  <ModalR v-show="isModalVisible1" @close="closeModal"></ModalR>
  <ModalL v-show="isModalVisible2" @close="closeModal2"></ModalL>

  <div class="body-content">
    <div class="preview" >
      <div class="imglog">
        <img :src="require('@/assets/home.png')" alt="home">
        <h1 class="toc">Do everything on time with <span>SEVENTEEN!</span></h1>
      </div>
    </div>

    <div class="about-project">
      <h1 class="toc" >What you will get?</h1>
      <div class="preference">
        <div class="b3-pref">
          <h2>Functions</h2>
          <div class="b3-about">
            <p>The application has the same functionality as a personal diary, notebook, notepad.</p>
          </div>
        </div>
        <div class="b3-pref">
          <h2>24/7 support</h2>
          <div class="b3-about">
            <ul class="point-info">
              <li>We are always ready to answer your questions</li>
              <li>Fast and accurate</li>
              <li>We will find the answer to any of your questions</li>
            </ul>
          </div>
        </div>
        <div class="b3-pref">
          <h2>Reliability</h2>
          <div class="b3-about">
            <p>Look at the color, my yellow diamond — Pikachu (br-r)
              I remember the times when we slept on the floor (DJ Tape, by)
              I jumped out of the kitchen, landed in a Bentley coupe (what?)</p>
          </div>
        </div>
      </div>
    </div>

    <div class="function">
      <div class="block-about">
        <div class="img">
          <img :src="require('@/assets/scr1.png')" alt="src">
        </div>
        <div class="block-text">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A dicta doloremque exercitationem harum magni, non possimus rerum sapiente sint unde.</p>
        </div>
      </div>
      <div class="block-about">
        <div class="block-text">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi eveniet laudantium nesciunt quas sint. Officia totam veritatis voluptate! Ab assumenda, eaque eveniet exercitationem facere id nesciunt odit quibusdam reiciendis voluptatem.</p>
        </div>
        <div class="img">
          <img :src="require('@/assets/src2.png')" alt="src">
        </div>
      </div>
      <div class="block-about">
        <div class="img">
          <img :src="require('@/assets/src3.png')" alt="src">
        </div>
        <div class="block-text">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores hic inventore magni nemo pariatur porro quam recusandae repellat repellendus, repudiandae saepe sit sunt suscipit ullam ut vel veniam, veritatis voluptate! Assumenda, iure.</p>
        </div>
      </div>
    </div>
  </div>

  <footer>
    <div class="social-target">
    </div>
    <div class="contact">
      <div class="icons">
        <ion-icon name="logo-github"></ion-icon>
        <ion-icon name="logo-vk"></ion-icon>
        <ion-icon name="logo-youtube"></ion-icon>
        <ion-icon name="logo-twitter"></ion-icon>
      </div>
      <h2>SEVENTEEN-COOP 2022</h2>
    </div>
  </footer>
  <router-view></router-view>
  </div>
</template>

<script>
import modalReg from "@/components/modalReg";
import modalLog from "@/components/modalLog";
import axios from "axios";

export default {
  name: "body-guests",
  computed:{
    username(){
      return this.$route.params.username
    }
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    "ModalR": modalReg,
    // eslint-disable-next-line vue/no-unused-components
    "ModalL": modalLog,
  },
  data(){
    return{
      isModalVisible1: false,
      isModalVisible2: false,
    };
  },
  methods:{
    showModal(){
      this.isModalVisible1 = true;
    },
    closeModal(){
      this.isModalVisible1 = false;
    },
    showModal2(){
      this.isModalVisible2 = true;
    },
    closeModal2(){
      this.isModalVisible2 = false;
    },
    goBack(){
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  },
  dataLogin(){
    return{
      items: []
    }
  },
  async login(){
    const response = await axios.get("/api/authController")
    this.item = response.data;
  }
}

</script>

<style lang="less">

a{
  text-decoration: none;
}
header {
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: fixed;
  color: #FFFFFF;
  font-family: 'ISOCPEUR',serif;
  .logo{
    font-size: 18px;
    a{
      color: #f04e41;
    }
  }
  .controller-menu{
    width: 600px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    flex-direction: row;
    ul{
      width: 350px;
      display: flex;
      justify-content: space-around;
      flex-direction: row;
      list-style-type: none;
      li{
        font-size: 22px;
        a{
          color: #000000;
        }
      }
    }
  }
  .account{
    width: 180px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 180px;
    .nav-account{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 180px;
      height: 42px;
      background: #f04e41;
    }
    span{
      cursor: initial;
    }
    button{
      background: none;
      border: none;
      font-size: 20px;
      margin: 5px;
      cursor: pointer;
      font-family: 'ISOCPEUR', serif;
      color: #FFFFFF;
      transition: all ease-out 0.2s;
    }
    button:hover{
      color: #cbcbcb;
    }
    button:active{
      color: #a9a9a9;
    }
  }
}

.toc{
  font-size: 40px;
  span{
    color: #f04e41;
  }
}
.body-content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 120px;
  font-family: 'ISOCPEUR',serif;
}
.preview{
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
  .imglog{
    width: 140vh;
    height: 75vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    img{
      width: 450px;
    }
  }
}
.about-project{
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  .preference{
    height: 60vh;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .b3-pref{
      width: 40vh;
      display: flex;
      flex-direction: column;
      margin: 50px;
      font-size: 20px;
      h2{
        padding-bottom: 10px;
      }
      .b3-about{
        width: 350px;
        height: 280px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-top: 4px solid #ff594b;
        border-bottom-right-radius: 20px;
        border-bottom-left-radius: 20px;
        box-shadow: 0.1px 22px 29px 2px rgba(50, 51, 51, 0.26);
        background: #FFFFFF;
        p{
          padding: 15px;
          color: black;
        }
        ul{
          list-style-type: none;
          padding: 15px;
          color: black;
        }
      }
    }
  }
}
.function{
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  .block-about{
    width: 140vh;
    height: 60vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 50px;
    .img{
      width: 200vh;
      height: 350px;
      margin-left: 30px;
      margin-right: 30px;
      background: rgba(185, 187, 186, 0.72);
      img{
        width: 100%;
        height: 100%;
      }
    }
    .block-text{
      width: 150vh;
      padding: 60px;
      font-size: 20px;
    }
    .block-text:nth-child(2){
      border-left: 5px solid #ff594b;
    }
    .block-text:nth-child(1){
      border-right: 5px solid #ff594b;
    }
  }
}

footer{
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'ISOCPEUR',serif;
  .icons {
    width: 400px;
    justify-content: space-evenly;
    display: flex;
    text-align: center;
    font-size: 30px;
    padding: 10px;
  }
  ion-icon:hover{
    color: #d9d9d9;
  }
  ion-icon:active{
    color: #c0c0c0;
  }
  h2{
    text-align: center;
  }
}

@media screen and (max-width: 350px) {
  body{
    display: flex;
    flex-direction: column;
  }
    header{
      width: 100%;
      height: 90px;
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      .controller-menu{
        display: none;
      }
      .logo{
        width: 20px;
        margin-left: 10px;
        font-size: 15px;
      }
      .account{
        margin: 0;
        .nav-account{
          width: 120px;
          button{
            font-size: 15px;
          }
        }
      }
    }
    .body-content{
      margin-bottom: 0;
      .preview{
        height: 80vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        h1{
          font-size: 30px;
          text-align: center;
          word-wrap: break-word;
        }
        .imglog{
          width: 100%;
          height: 450px;
        }
      }
      .about-project{
        height: 90vh;
        display: flex;
        justify-content: center;
        flex-direction: column;
        h1{
          text-align: center;
          font-size: 38px;
          padding-bottom: 280px;
        }
        .preference{
          height: 60vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .b3-pref{
            width: 100%;
            margin: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            h2{
              font-size: 30px;
            }
            .b3-about{
              width: 290px;
            }
          }
        }
      }
      .function{
        height: 180vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: 0;
        .block-about{
          width: 100%;
          margin: 15px;
          .img{
            width: 100%;
            margin: 0;
          }
          .block-text{
            display: none;
          }
        }
      }
    }
    footer{
      display: flex;
      .icons {
        width: 100%;
      }
    }
}

@media screen and (max-width: 568px){
    header{
      width: 100%;
      height: 90px;
      display: flex;
      justify-content: center;
      align-items: center;
      .logo{
        h1{
          font-size: 30px;
          padding-left: 5px;
        }
      }
      .controller-menu{
        width: 260px;
        display: flex;
        justify-content: center;
        align-items: center;
        ul{
          width: 200px
        }
      }
      .account{
        width: 150px;
        margin: 0;
        .nav-account{
          width: 100%;
          button{
            font-size: 18px;
          }
        }
      }
    }
    .body-content{
      .preview{
        display: flex;
        justify-content: center;
        align-items: center;
        h1{
          word-wrap: break-word;
          text-align: center;
        }
        .imglog{
          width: 100%;
        }
      }
      .about-project{
        margin-top: 120px;
        .toc{
          padding-bottom: 400px;
        }
        .preference{
          display: flex;
          flex-direction: column;
        }
      }
      .function{
        width: 100%;
        margin-top: 90%;
        .block-about{
          width: 100%;
          height: 430px;
          margin: 0;
          .block-text{
            display: none;
          }
          .img{
          }
        }
      }
    }
}

@media screen and (max-width: 768px) {
    header{
      display: flex;
      justify-content: space-between;
      .logo{
        h1{
          font-size: 30px;
          padding-left: 10px;
        }
      }
      .controller-menu{
          width: 200px;
      }
      .account {
        margin-left: 0;
        margin-right: 10px;
      }
    }
    .body-content{
      .preview{
        margin-bottom: 100px;
        h1{
          word-wrap: break-word;
          text-align: center;
        }
        .imglog{
          width: 100%;
        }
      }
      .about-project {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        flex-direction: column;
        .toc{
          padding-bottom: 400px;
        }
        .preference{
          flex-direction: column;
        }
      }
      .function{
        display: none;
      }
    }
    footer{
      display: none;
    }
}

</style>