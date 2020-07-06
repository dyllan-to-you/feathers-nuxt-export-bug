<template>
  <v-container fluid class="pt-12">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" lg="6">
        <v-alert
          v-if="showError && errorOnAuthenticate"
          v-model="showError"
          type="error"
          dense
          dismissible
        >
          {{ errorOnAuthenticate.message }}
        </v-alert>

        <v-card>
          <v-card-title class="display-1 font-weight-medium">
            Log in
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="email"
              type="email"
              :rules="emailRules"
              label="E-mail"
              placeholder=" "
              outlined
              dense
            />
            <v-text-field
              v-model="password"
              :type="showPass ? 'text' : 'password'"
              :rules="passwordRules"
              label="Password"
              placeholder=" "
              outlined
              dense
              :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="showPass = !showPass"
            />
            <v-row>
              <v-col cols="12" sm="6" class="pt-0"
                ><v-checkbox
                  v-model="remember"
                  label="Remember Me"
                  class="pt-0"
                  dense
                >
                </v-checkbox
              ></v-col>
              <v-col
                cols="12"
                sm="6"
                :class="
                  `${
                    $vuetify.breakpoint.smAndDown ? 'pt-0' : 'pt-4'
                  }  text-sm-right text-left`
                "
              >
                <a class="v-label">Forgot Password?</a>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" class="px-10" @click="login">Login</v-btn>
            <v-spacer />
            <v-btn color="primary" :to="{ name: 'registration' }" text>
              Create Account
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import commonMixin from '@/mixins/mixinCommonMethods'
import ifAuthenticatedRedirect from '@/mixins/authRedirect'

export default {
  name: 'Login',
  components: {},
  mixins: [commonMixin, ifAuthenticatedRedirect],
  props: {},
  data() {
    return {
      email: '',
      password: '',
      showPass: false,
      remember: false,
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [(v) => !!v || 'Password is required'],
      showError: false
    }
  },
  computed: {
    ...mapState('auth', ['isAuthenticatePending', 'errorOnAuthenticate']),
    urlQuery() {
      return this.$route.query
    }
  },
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    ...commonMixin.methods,
    ...mapActions({ authenticate: 'auth/authenticate' }),
    login() {
      this.authenticate({
        strategy: 'local',
        email: this.email,
        password: this.password
      })
        .then((res) => {
          const { redirect } = this.$route.query
          if (!res.user.isVerified) {
            this.$router.push({ path: '/registration/confirmation' })
          } else if (redirect) {
            console.debug('Redirecting...', redirect)
            this.$router.push(redirect)
          } else {
            this.$router.push({ path: '/' })
          }
        })
        .catch(() => {
          this.showError = true
          // Do nothing
        })
    }
  }
}
</script>

<style scoped>
a {
  color: rgba(0, 0, 0, 0.6);
}
a:hover {
  color: rgba(0, 0, 0, 0.8);
}
</style>
