<template>
    <router-view></router-view>
</template>

<script>
export default {
  name: 'headerApp',
  components: {},
};

</script>

<style lang="less">
@font-face {
  font-family: 'Anders';
  src: url("assets/fonts/Anders.ttf");
}
@font-face {
  font-family: 'Almelo';
  src: url("assets/fonts/FV_Almelo.ttf");
}
@font-face {
  font-family: 'Gagalin';
  src: url("assets/fonts/Gagalin.ttf");
}
@font-face {
  font-family: 'Harpseal';
  src: url("assets/fonts/Harpseal.ttf");
}
@font-face {
  font-family: 'ISOCPEUR';
  src: url("assets/fonts/ISOCPEUR.ttf");
}
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body{
    min-height: 100vh;
    display: flex;
    justify-content: center;
    background: #191e3c;
    color: #FFFFFF;
  }
  #app{
    width: 100%;
  }
</style>
