<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { AUTH_TYPE } from '@/types'

const { t } = useI18n()

const { state } = useAuth()

const data = ref([
  {
    type: AUTH_TYPE.Login,
    text: t('auth.login.title'),
  },
  {
    type: AUTH_TYPE.Register,
    text: t('auth.register.title'),
  },
])

</script>

<template>
  <div class="r-auth">
    <div class="r-container">
      <VForm
        class="r-auth__form"
      >
        <VTabs
          v-model="state.chosenMethod"
          background-color="primary"
          class="r-auth__tabs"
        >
          <VTab
            v-for="tab in data"
            :key="tab.type"
            :value="tab.type"
            class="r-auth__tab"
          >
            {{ tab.text }}
          </VTab>
        </VTabs>
      </VForm>
    </div>
  </div>
</template>

<style lang="scss">
.r-auth {
  .r-container {
    @apply tw-r-container;
  }
}
</style>
