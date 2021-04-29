<template>
  <div id="navBarContainer" class="navigation-container">
    <div class="sub-header">
      <a :href="getHomepage()" target="_blank" rel="noopener" title="Viva con Agua Webseite"></a>      
    </div>
    <div id="header" class="header">
      <div class="logo-container">
        <a @click="home" class="logo">
          <img class="navigation-logo" src="~@/assets/img/vca_logo_plain.png">
        </a>
      </div>      
    </div>
    <div id="navContainer">
    <VcANavBar class="nav-bar" id="navBar" @click="navigate">
      <div v-for="tab in tabs" class="na" :key="tab.title" >
        <vca-tab v-if="isVisible(tab.title)" :title="$t(tab.title)" :selected="currentTab(tab.title)" >{{ tab.content }}</vca-tab>
      </div>
    </VcANavBar>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import VcANavBar from "@/components/utils/VcANavBar";
//import LanguageSelection from "@/components/utils/LanguageSelection"

export default {
  name: 'Navigation',
  components: {
    VcANavBar//, LanguageSelection
  },
  data () {
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
  },
  mounted() {
    this.container = document.getElementById("navContainer")
    this.header = document.getElementById("navBar")
    this.body = document.getElementById("app")
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    sign() {
      if (this.$router.currentRoute.name !== 'Profile') {
        this.$store.dispatch({type: 'navigation/current', data: 'Profil'})
        this.$router.push({ name: 'Profile' })
      }
    },
    donation() {
      this.$store.dispatch({type: 'navigation/current', data: 'Spende'})
      this.$router.push({ name: 'Donation' })
    },
    home() {
      this.$store.dispatch({type: 'navigation/current', data: 'Home'})
      this.$router.push({ name: 'Home' })
    },
    logout() {
      if (this.$router.currentRoute.name !== 'Logout') {
        this.$router.push({ name: 'Logout' })
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
    navigate(tab) {
      if (!this.session && (tab.$options.propsData.title == 'Spende' || tab.$options.propsData.title == 'Donate')) {
        window.open(
            this.getHomepage(),
            '_blank'
        );
      } else {
        this.$store.dispatch({type: 'navigation/current', data: tab.$options.propsData.title})
        var currentTab = this.tabs.filter(t => this.$t(t.title).indexOf(tab.$options.propsData.title) > -1)
        this.$router.push(currentTab[0].route)
      }
    },
/*    swipe(direction) {
      // TODO CHECK ONLY VISIBLE TABS
      // TODO DISABLE NOT SWIPEABLE POINTS (LIKE LOGOUT)
      var currentTab = this.tabs.findIndex(t => t.title.indexOf(this.current.data) > -1)
      if(!direction.localeCompare("right")) {
        this.$store.dispatch({type: 'navigation/current', data: this.tabs[Math.max(0, currentTab - 1)].title})
        this.$router.push(this.tabs[Math.max(0, currentTab - 1)].route)
      } else
      if (!direction.localeCompare("left")) {
        // tabs.length - 3 cause the last points are login and logout
        this.$store.dispatch({type: 'navigation/current', data: this.tabs[Math.min(this.tabs.length - 3, currentTab + 1)].title})
        this.$router.push(this.tabs[Math.min(this.tabs.length - 3, currentTab + 1)].route)
      }
    },*/
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
      return (this.isCH) ? "https://www.vivaconagua.ch/sofaspende/" : "https://www.vivaconagua.org/sofaspende"
    }
  },
  computed: {
    ...mapGetters({
      session: 'session',
      current: 'navigation/current',
      tabs: 'navigation/tabs'
    }),
    isDE() {
      return !this.isCH();
    },
    isCH() {
      return this.$i18n.locale == "ch";
    }
  }
}
</script>
<style lang="scss">

.sticky {
    position: fixed !important;
    top: 0;
    bottom: auto !important;
    width: 100% !important;
    @include media(large) {
      position: fixed !important;
      bottom: inherit;
      right: 0;
      left: 50%;
      z-index: 1000;
      transform: translate(-50%, 0);
      margin: 0 !important;

      transition: margin .25s ease-out;
    }
}
.header {
  position: sticky;
  bottom: 0;
  display: flex;
  height: 40px;
  background-color: $blue;

  .logo-container {
    flex-basis: 70%;
    display: flex;
    justify-content: flex-start;
    padding-left: 10px;
  }

  .language-container-mobile {
    display: flex;
    flex-basis: auto;
    width: max-content;
    margin: auto;
    padding-right: 10px;
    
    span.normal-flag {
      transform: scale(.35);
      -ms-transform: scale(.35);
      -webkit-transform: scale(.35);
      -moz-transform: scale(.35);
      margin: -15px -20px;
    }

    span.small-flag {
      transform: scale(.2);
      -ms-transform: scale(.2);
      -webkit-transform: scale(.2);
      -moz-transform: scale(.2);
      margin: -15px -25px;
    }

    @include media(large) {
      display: none;
    }
  }

  @include media(large) {
    position: sticky;
    position: -webkit-sticky; /* Safari */
    top: 0;
    padding: 0 60px;
    height: 60px;
    z-index: 8;

    .logo-container {
      justify-content: flex-start;
    }

  }
}
.logo {
  cursor: pointer;
  position: relative;
  z-index: 9;

  img {
    margin-top: 1vw;
    max-height: 35px;
    width: auto;
  }

  @include media(large) {
    background-size: 100% 100%;
    padding: 1% 1%;
    transform: translateY(0);
    background-image: url(~@/assets/img/brush.svg);
    margin: -45px 0 0 -20px;
    width: 180px;
    text-align: center;

    logo:hover {
      transition: transform .45s cubic-bezier(.63,.49,0,2.1);
    }

    img {
      margin-left: 0;
      margin-top: 0;
      width: 140px;
      max-height: 72px;
      height: auto;
    }

  }
}
.nav-bar {
  ul {
    bottom: 0;
    position: relative;
    width: 90%;
    padding: 0;
    background-color: $white;
    z-index: 9;
    -moz-box-pack: center;
    margin: 0 auto;
    justify-content: center;
    list-style-type: none;
    display: flex;
  }

  li {
    a {
      display: block;
      color: $blue;
      flex-basis: 100%;
      flex: auto;
      width: 20%;
      bottom: 0 !important;
      padding: 10px 10px;
      text-align: center;
      text-decoration: none;
    }

    a:hover {
      color: $dark_blue;
    }
  }

  @include media(large) {

    div {
      display: flex;
      justify-content: flex-end;
    }

    ul {
      font-weight: 600;
      width: 50%;
      height: 60px;
      margin-top: -60px;
      margin-right: 20px;
      font-size: larger;
      background-color: $blue;
    }
    li {
      cursor: pointer;
      flex: auto;
      flex-basis: 100%;
      padding: 0;
      display: table-cell;
      vertical-align: middle;

     a {
        margin: auto;
        width: auto;
        color: white;
        padding: 0;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
      }

      :hover a, a:hover {
        color: $dark_blue;
      }
    }
  }
}
.sub-header {
  display: none;
  z-index: 9;

  @include media(large) {
    padding: 5px 30px;
    display: flex;
    height: 50px;
    justify-content: flex-end;
    background-color: $dark_blue;
  }

  .language-container {
    padding-right: 15px;
    position: relative;
    flex-basis: 5%;
    justify-content: center;
    .language-fit {
      margin: 0;
      position: absolute;
      top: 50%;
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
    }
    @include media(large) {
      display: flex;
      height: 100%;
      justify-content: flex-end;
    }
  }

}
.donate {
  height: 100%;
  display: table;
  div {
    display: table-cell;
    vertical-align: middle;
    cursor: pointer;
    a {
      font-family: 'Roboto Slab', serif;
      font-weight: bold;
      color: $white;
      text-decoration: none;
    }
    img {
      height: 30px;
      padding: 10px 20px 0 20px;
      width: auto;
    }
  }

}

</style>
