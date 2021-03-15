<template>
  <div id="nav" class="nav">
    <div class="container">
      <div class="nav__links">
        <router-link class="nav__link" to="/">Home</router-link>
        <router-link class="nav__link" to="/favorites">Favorites</router-link>
      </div>
      <Search />
    </div>
  </div>
  <router-view />
</template>

<script>
import Search from "@/components/Search.vue";

export default {
  name: "App",
  components: {
    Search
  }
};
</script>

<style lang="scss">
html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  margin: 0;
}

.container {
  max-width: 1350px;
  padding: 0 15px;
  margin: 0 auto;
}

#app {
  padding-bottom: 20px;
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav {
  padding: 24px 0;
  background: #464646;
  font-size: 18px;
  text-transform: uppercase;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 1024px) {
      flex-direction: column;
    }
  }

  &__links {
    text-align: left;
  }

  &__link {
    transition: color 0.3s ease;
    color: #fff;
    text-decoration: none;
    margin-right: 53px;

    @media screen and (max-width: 1024px) {
      margin-right: 24px;
    }

    &:hover {
      color: darken(#fff, 20%);
    }

    &.router-link-exact-active {
      text-decoration: underline;
    }

    &:last-of-type {
      margin-right: 0;
    }
  }
}
</style>
