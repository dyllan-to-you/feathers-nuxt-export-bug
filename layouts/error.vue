<template>
  <v-app dark>
    <v-container v-if="error.statusCode === 404" class="pt-12 mt-12">
      <v-row>
        <v-col v-if="$vuetify.breakpoint.smAndUp" sm="3" class="text-right">
          <img src="@/assets/404image.jpg" />
        </v-col>
        <v-col cols="12" sm="9">
          <h1 class="display-4 font-weight-bold">Oops!</h1>
          <h2 class="display-1 my-4">
            We can't find the page you are looking for.
          </h2>
          <p>{{ pageNotFound }}</p>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else class="pt-12 mt-12">
      <v-row>
        <v-col v-if="$vuetify.breakpoint.smAndUp" sm="3" class="text-right">
          <img src="@/assets/404image.jpg" />
        </v-col>
        <v-col cols="12" sm="9">
          <h1 class="display-4 font-weight-bold">
            Error {{ error.statusCode }}
          </h1>
          <h2 class="display-1 my-4">{{ error.message }}</h2>
          <p>
            If this doesn't mean anything to you, contact us to resolve the
            error.
          </p>
        </v-col>
      </v-row>
    </v-container>
    <!--  <NuxtLink to="/">
      Home page
    </NuxtLink> -->
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
