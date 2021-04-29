<template>
  <div>
    <div>
      <ul>
        <li v-for="tab in tabs" @click="selectTab(tab)" :key="tab.id" :class="{ 'is-active': tab.isActive }">
          <a :href="tab.href">{{ tab.title }}</a>
        </li>
      </ul>
    </div>

    <div class="nav-details">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VcaNavBar',
  data() {
    return { tabs: [] };
  },
  created() {
    this.tabs = this.$children;
  },
  methods: {
    selectTab(selectedTab) {
      this.$emit("click", selectedTab)
      this.tabs.forEach(tab => {
        tab.isActive = (tab.title == selectedTab.title);
      });
    }
  }
}
</script>
