<template>
  <div id="nav" class="nav">
    <div class="container">
      <div class="nav__links">
        <router-link class="nav__link" to="/">Home</router-link>
        <router-link class="nav__link" to="/favorites">Favorites</router-link>
      </div>
    </div>
  </div>
  <router-view />
</template>

<style lang="scss">
body {
  margin: 0;
}

.container {
  max-width: 1320px;
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
  padding: 24px;
  background: #464646;
  font-size: 18px;
  text-transform: uppercase;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  &__links {
    text-align: left;
  }

  &__link {
    transition: color 0.3s ease;
    color: #fff;
    text-decoration: none;

    &:hover {
      color: darken(#fff, 20%);
    }

    &.router-link-exact-active {
      text-decoration: underline;
    }

    &:not(last-of-type) {
      margin-right: 53px;
    }
  }
}
</style>
