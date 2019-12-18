<template>
  <client-only>
    <v-container
      class="mx-auto text-center"
    >
      <v-btn :to="'/'" v-text="'Hem'" color="blue" text />
      <v-btn :to="'/snodjup'" v-text="'Snödjup Översikt'" color="blue" text />
      <h1>Lägg till nya mätvärden</h1>
      <v-card
        elevation="0"
      >
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="snowdepth"
            :counter="100"
            :rules="snowdepthRules"
            type="number"
            label="Snödjup (mm)"
            outlined
            required
          />
          <v-text-field
            v-model="temperature"
            :counter="100"
            :rules="temperatureRules"
            type="number"
            label="Temperatur (°C)"
            outlined
            required
          />
          <v-textarea
            v-model="comment"
            :counter="500"
            :rules="commentRules"
            label="Kommentar"
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
      <v-btn :to="'/matvarden'" v-text="'Tidigare mätvärden'" color="blue" text />
    </v-container>
  </client-only>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    snowdepth: '',
    snowdepthRules: [
      v => !!v || 'Snowdepth is required',
      v => (v && v.length <= 100) || 'Name must be less than 100 characters'
    ],
    temperature: '',
    temperatureRules: [
      v => !!v || 'Temperature is required',
      v => (v && v.length <= 100) || 'Email must be less than 100 characters'
    ],
    comment: '',
    commentRules: [
      v => !!v || 'Comment is required',
      v => (v && v.length <= 500) || 'Text must be less than 500 characters'
    ]
  })
}
</script>
