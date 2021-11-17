<template>
  <div id="navBarContainer" class="navigation-container">
    <div class="sub-header">
      <a :href="getHomepage()" target="_blank" rel="noopener" title="Viva con Agua Webseite"></a>
      <div class="language-container">
        <div class="language-fit">
          <LanguageSelection/>
        </div>
      </div>
    </div>
    <div id="header" class="header">
      <div class="logo-container">
        <a @click="home" class="logo">
          <img class="navigation-logo" src="~@/assets/img/vca_logo_plain.png">
        </a>
      </div>
      <div class="language-container-mobile">
        <div class="language-fit">
          <LanguageSelection/>
        </div>
      </div>
      <div class="burger-menu-icon" @click="toggleMenu()">
        <div id="burger-top-bar" class="burger-bar burger-bar-appear"></div>
        <div id="burger-middle-bar-1" class="burger-bar burger-bar-display"></div>
        <div id="burger-middle-bar-2" class="burger-bar burger-bar-hide"></div>
        <div id="burger-bottom-bar" class="burger-bar burger-bar-appear"></div>
      </div>
    </div>
    <div id="navContainer" class="navContainer">
      <VcANavBar class="nav-bar" id="navBar" @click="navigate" @close="toggleMenu()">
        <div v-for="tab in tabs" class="na" :key="tab.title">
          <vca-tab v-if="isVisible(tab.title)" :title="$t(tab.title)" :selected="currentTab(tab.title)">{{
              tab.content
            }}
          </vca-tab>
        </div>
      </VcANavBar>
    </div>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'
import VcANavBar from "@/components/utils/VcANavBar";
import LanguageSelection from "@/components/utils/LanguageSelection"

export default {
  name: 'Navigation',
  components: {
    VcANavBar, LanguageSelection
  },
  data() {
    return {
      container: null,
      header: null,
      body: null
    }
  },
  created() {
    this.$router.onReady(() => {
      if (this.current.data === undefined) {
        this.$store.dispatch({type: 'navigation/current', data: this.$route.meta.title})
      }
    })
    window.addEventListener('scroll', this.handleScroll);
    //document.body.addEventListener('click', this.toggleMenu);
  },
  mounted() {
    this.container = document.getElementById("navContainer")
    this.header = document.getElementById("navBar")
    this.body = document.getElementById("app")
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    home() {
      this.$store.dispatch({type: 'navigation/current', data: 'Home'})
      this.$router.push({name: 'Home'})
    },
    logout() {
      if (this.$router.currentRoute.name !== 'Logout') {
        this.$router.push({name: 'Logout'})
      }
    },
    handleScroll() {
      var list = this.header.getElementsByTagName("ul")[0]
      if (window.pageYOffset > this.container.offsetTop && !list.classList.contains('sticky')) {
        list.classList.add("sticky");
      } else if (window.pageYOffset < this.container.offsetTop) {
        list.classList.remove("sticky");
      }

    },
    toggleMenu() {
      const menuList = document.getElementById("menuList");
      const topBar = document.getElementById("burger-top-bar")
      const middleBar1 = document.getElementById("burger-middle-bar-1")
      const middleBar2 = document.getElementById("burger-middle-bar-2")
      const bottomBar = document.getElementById("burger-bottom-bar")
      if (menuList.classList.contains("menu-inactive")) {
        menuList.classList.remove("menu-inactive");
        menuList.classList.add("menu-active");
        topBar.classList.remove("burger-bar-appear")
        topBar.classList.add("burger-bar-disappear")
        bottomBar.classList.remove("burger-bar-appear")
        bottomBar.classList.add("burger-bar-disappear")
        middleBar2.classList.remove("burger-bar-hide")
        middleBar2.classList.add("burger-bar-display")
        middleBar1.classList.add("burger-bar-rotate-1")
        middleBar2.classList.add("burger-bar-rotate-2")
      } else {
        menuList.classList.remove("menu-active");
        menuList.classList.add("menu-inactive");
        topBar.classList.add("burger-bar-appear")
        topBar.classList.remove("burger-bar-disappear")
        bottomBar.classList.add("burger-bar-appear")
        bottomBar.classList.remove("burger-bar-disappear")
        middleBar2.classList.add("burger-bar-hide")
        middleBar2.classList.remove("burger-bar-display")
        middleBar1.classList.remove("burger-bar-rotate-1")
        middleBar2.classList.remove("burger-bar-rotate-2")
      }
    },
    navigate(tab) {

      if (!this.session && true == false /* handle other routing here */) {
        window.open(
            this.getHomepage(),
            '_blank'
        );
      } else {
        var currentTab = this.tabs.filter(t => this.$t(t.title).indexOf(tab.$options.propsData.title) > -1)
        this.$store.dispatch({type: 'navigation/current', data: tab.$options.propsData.title})
        this.$router.push(currentTab[0].route)
      }
    },
    currentTab(tab) {
      return this.$t(tab) === this.current.data
    },
    isVisible(title) {
      var included = this.sessionInclude(title)
      var excluded = this.sessionExluded(title)
      var dontCare = this.dontCare(title)
      return included || excluded || dontCare

    },
    dontCare(title) {
      return this.tabs.filter(t => t.title.indexOf(title) > -1 && t.needSession == undefined).length > 0
    },
    sessionInclude(title) {
      return this.session && this.tabs.filter(t => t.title.indexOf(title) > -1 && t.needSession !== undefined && t.needSession === true).length > 0
    },
    sessionExluded(title) {
      return !this.session && this.tabs.filter(t => t.title.indexOf(title) > -1 && t.needSession !== undefined && t.needSession === false).length > 0
    },
    getHomepage() {
      return "https://www.vivaconagua.org"
    }
  },
  computed: {
    ...mapGetters({
      session: 'session/session',
      current: 'navigation/current',
      tabs: 'navigation/tabs'
    })
  }
}
</script>
<style lang="scss">
  .header .logo {
    background-image: url(~@/assets/img/brush.svg);
  }
</style>