<template>
  <div id="app">
    <div id="nav">
        <b-navbar type="dark" variant="dark">
          <b-navbar-nav>
            <b-nav-item to="/">
              Home
            </b-nav-item>
            <b-nav-item to="/about">
              About
            </b-nav-item>
            <b-nav-item to="/forTeacher">
              For Teacher
            </b-nav-item>
          </b-navbar-nav>
        </b-navbar>
      </div>
    <router-view/>
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link {
  color: white;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
