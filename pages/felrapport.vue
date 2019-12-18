<template>
  <client-only>
    <v-layout
      justify-center
      align-center
    >
      <v-flex
        xs12
        sm8
        md6
      >
        <v-card
          elevation="0"
        >
          <h1>
            Felrapportering
          </h1>
          <p>
            Use this form to report an issue.
          </p>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="name"
              :counter="100"
              :rules="nameRules"
              label="Name"
              outlined
              required
            />
            <v-text-field
              v-model="email"
              :counter="100"
              :rules="emailRules"
              label="Email"
              outlined
              required
            />
            <v-textarea
              v-model="fel"
              :counter="500"
              :rules="felRules"
              label="Fel"
              outlined
              required
            />
            <v-btn
              class="white--text"
              color="blue"
            >
              Submit
            </v-btn>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </client-only>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 100) || 'Name must be less than 100 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'Email is required',
      v => (v && v.length <= 100) || 'Email must be less than 100 characters'
    ],
    fel: '',
    felRules: [
      v => !!v || 'Text is required',
      v => (v && v.length <= 100) || 'Text must be less than 500 characters'
    ]
  })
}
</script>
