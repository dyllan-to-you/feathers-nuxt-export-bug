export default {
  methods: {
    objToParams(obj) {
      return obj && Object.entries(obj).length
        ? `?${Object.entries(obj)
            .map(([key, val]) => `${key}=${val}`)
            .join('&')}`
        : ''
    }
  }
}
