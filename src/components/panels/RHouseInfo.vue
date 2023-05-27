<script lang="ts" setup>
import { NuxtLink } from '#components'
import {
  mdiAccountAlert,
  mdiAccountGroup,
  mdiClockTimeFive,
  mdiHomeGroup,
} from '@mdi/js'
import { asyncComputed } from '@vueuse/core'
import {
  mapTermTranslations,
  mapTypeTranslations,
} from '~/helpers'
import type { IRHouseData } from '~/types'

const props = withDefaults(defineProps<{
  data: IRHouseData
  showUserInfo?: boolean
  limitedDescription?: boolean
  showDate?: boolean
  to?: string
}>(), {
  showUserInfo: false,
  to: '',
  showDate: true,
  limitedDescription: false,
})

const supabase = useSuperbase()
const { formatAddress } = useMap()

const createdAt = computed(() => {
  return new Date(props.data.created_at!)
    .toLocaleDateString()
    .replaceAll('/', '.')
})

const computedTerms = computed(() => {
  return mapTermTranslations(props.data.term)
})

const computedTypes = computed(() => {
  return mapTypeTranslations(props.data.type)
})

const computedUser = asyncComputed(async () => {
  const { data } = await supabase
    .from('householders')
    .select('*')
    .eq('user_id', props.data.householder_id)

  if (!data) {
    return null
  }

  return data[0]
}, null)

const computedUserData = computed(() => {
  if (!computedUser.value) {
    return null
  }

  return {
    id: computedUser.value.user_id,
    data: {
      email: computedUser.value.email,
      name: computedUser.value.name,
      surname: computedUser.value.surname,
      phone: computedUser.value.phone,
    },
  }
})

const computedTitleComponent = computed(() => props.to ? NuxtLink : 'p')

</script>

<script lang="ts">
export default { inheritAttrs: false }
</script>

<template>
  <div :class="['r-house-info', $attrs.class]">
    <div class="r-house-info-wrapper">
      <RAccountForm
        v-if="showUserInfo"
        class="r-house-info__account"
        :user="computedUserData"
      />

      <Component
        :is="computedTitleComponent"
        :to="to"
        class="r-house-info__title"
      >
        {{ data.title }}
      </Component>

      <p
        :class="[
          'r-house-info__description',
          {
            'r-house-info__description--limited': limitedDescription
          }
        ]"
      >
        {{ data.description }}
      </p>

      <p class="r-house-info__location">
        {{ formatAddress(data.location) }}
      </p>

      <div class="r-house-info__details">
        <div class="r-house-info__options">
          <div class="r-house-info__count_people r-icon-value">
            <VIcon :start="true" :icon="mdiAccountGroup" />
            <span>
              {{ $t('houses.panel.can_place', {
                count: data.count_people
              }) }}
            </span>
          </div>

          <div class="r-house-info__term r-icon-value">
            <VIcon :start="true" :icon="mdiClockTimeFive" />
            <span>
              {{ computedTerms }}
            </span>
          </div>

          <div class="r-house-info__type r-icon-value">
            <VIcon :start="true" :icon="mdiHomeGroup" />
            <span>
              {{ computedTypes }}
            </span>
          </div>

          <div v-if="data.has_refugees" class="r-house-info__has-refugees r-icon-value">
            <VIcon :start="true" :icon="mdiAccountAlert" />
            <span>
              {{ $t('houses.form.has_refugees') }}
            </span>
          </div>
        </div>

        <div v-if="showDate" class="r-house-info__added">
          <span>
            <b>{{ $t('houses.panel.added') }}</b>:
            <span>{{ createdAt }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.r-house-info {
  @apply relative flex-grow;

  p {
    text-overflow: ellipsis !important;
    white-space: normal !important;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -ms-box-orient: vertical;
    box-orient: vertical;
    overflow: hidden;
  }

  &__title {
    @apply
      text-xl
      font-bold
    ;
  }

  &__description {
    @apply
      text-base
      mt-2
    ;

    &--limited {
      word-break: break-all !important;
      -webkit-line-clamp: 3;
      -moz-line-clamp: 3;
      -ms-line-clamp: 3;
      line-clamp: 3;
    }
  }

  &__location {
    @apply my-4;
  }

  &__account {
    @apply max-w-80;
  }

  &__title {
    word-break: break-all !important;
    -webkit-line-clamp: 1;
    -moz-line-clamp: 1;
    -ms-line-clamp: 1;
    line-clamp: 1;
  }

  &__added {
    @apply absolute bottom-0 right-0;
  }

  &__details {
    @apply relative;
  }

  .r-icon-value {
    @apply flex items-center;

    .v-icon {
      @apply flex-shrink-0;
    }
  }
}
</style>
