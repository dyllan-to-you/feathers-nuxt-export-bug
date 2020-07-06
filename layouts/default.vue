<template>
  <v-app>
    <v-app-bar clipped-left flat fixed app dense>
      <v-app-bar-nav-icon
        v-if="isAuthenticated && isConfirmed"
        @click.stop="drawer = !drawer"
      />
      <v-toolbar-title>
        <Logo />
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        v-if="isAuthenticated"
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer app color="secondary" max-height="32px">
      <v-row justify="center">
        <v-col class="text-center white--text body-2 pt-0" cols="12">
          &copy;2017 - {{ new Date().getFullYear() }}
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  components: {
    Logo: () => import('@/components/Logo'),
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.auth.accessToken ? true : false
    },
    isConfirmed() {
      return this.$store.state.auth.user &&
        this.$store.state.auth.user.isVerified
        ? true
        : false
    },
  },
  methods: {
    logout() {
      this.$store
        .dispatch('auth/logout')
        .then(() => this.$router.replace('/login'))
    },
  },
}
</script>
