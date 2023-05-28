<script lang="ts" setup>
import { mdiTrashCan } from '@mdi/js'
import { v4 as uuid } from 'uuid'
import type {
  IRHouseData,
  IRHouseFormSubmitData,
  IRHouseImage,
  IRHouseLocation,
} from '@/types'

const props = withDefaults(defineProps<{
  data: IRHouseData
  loading?: boolean
  buttonText?: string
  images?: IRHouseImage[]
}>(), {
  loading: false,
  buttonText: '',
  images: () => [],
})

const {
  required,
  count_people_max,
  count_people_min,
  max_input_file_count,
  min_input_file_count,
} = useRules()

const {
  types,
  terms,
} = useHouses()

const {
  getLocationInfo,
  transformCoords,
  mapCenter: generalMapCenter,
} = useMap()

const { removeImage } = useHouseStorage()

const proxiedData = toRef(props, 'data')
const houseFormRef = ref()
const mapRef = ref()

const emit = defineEmits<{
  (e: 'submit', data: IRHouseFormSubmitData): void
}>()

const marker = ref<{
  position: IRHouseLocation
} | null>(transformCoords(props.data.location.coords) || null)

let mapCenter = reactive<IRHouseLocation>({
  ...generalMapCenter,
})

const currentMediaItem = ref(0)
const files = ref([])
const previewImages = ref(props.images || [])

const computedFileRules = computed(() => {
  const rules = [required]

  if (props.images && !previewImages.value.length) {
    rules.push(min_input_file_count)
    rules.push(max_input_file_count)
  }

  return rules
})

const onSubmit = async () => {
  const { valid, errors } = await houseFormRef.value.validate()

  if (valid) {
    emit('submit', {
      data: proxiedData.value,
      media: files.value.map(file => ({
        name: uuid(),
        file,
      })),
    })
  } else {
    document.getElementById(errors[0].id)?.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    })
  }
}

const onAddPhoto = async () => {
  for (const file of files.value) {
    const reader = new FileReader()

    reader.onload = (e) => {
      previewImages.value.push({
        url: e.target!.result?.toString() || '',
      })
    }

    reader.readAsDataURL(file)
  }
}

const onDeleteImage = async (index: number) => {
  const image = previewImages.value[index]

  const removed = await removeImage(image.url.split('houses/')[1])

  if (!removed) {
    return
  }

  previewImages.value.splice(index, 1)
  files.value.splice(index, 1)

  if (index !== previewImages.value.length - 1) {
    currentMediaItem.value += 1
  } else {
    currentMediaItem.value = 0
  }
}

const onClickMap = async (position: IRHouseLocation) => {
  marker.value = {
    position,
  }

  mapCenter = Object.assign({}, position)

  const { address, place_id } = await getLocationInfo(position)

  proxiedData.value.location = address
  proxiedData.value.place_id = place_id
}

</script>

<script lang="ts">
export default { inheritAttrs: false }
</script>

<template>
  <VForm
    v-if="proxiedData"
    ref="houseFormRef"
    :class="['r-house-form', $attrs.class]"
    @submit.prevent="onSubmit"
  >
    <div class="r-house-form__col">
      <VTextField
        v-model="proxiedData.title"
        class="r-house-form__title"
        type="text"
        :rules="[required]"
        :label="$t('houses.form.title')"
        required
      />

      <VTextarea
        v-model="proxiedData.description"
        class="r-house-form__description"
        :rules="[required]"
        :label="$t('houses.form.description')"
        required
      />

      <VTextField
        v-model.number="proxiedData.count_people"
        class="r-house-form__count_people"
        type="number"
        :min="1"
        :max="20"
        :rules="[required, count_people_max, count_people_min]"
        :label="$t('houses.form.count_people')"
        required
      />

      <VCheckbox
        v-model="proxiedData.has_refugees"
        color="error"
        :label="$t('houses.form.has_refugees')"
      />
    </div>

    <div class="r-house-form__col">
      <RCheckboxGroup
        v-model="proxiedData.type"
        :label="$t('houses.form.types')"
        :data="types"
        color="secondary"
        :rules="[required]"
        :multiple="false"
      />

      <RCheckboxGroup
        v-model="proxiedData.term"
        :label="$t('houses.form.terms')"
        :data="terms"
        :rules="[required]"
        color="success"
        :multiple="false"
      />
    </div>

    <div class="r-house-form__col r-house-form__col-media">
      <VFileInput
        ref="fileInput"
        v-model="files"
        :show-size="true"
        :show-file-size="true"
        :show-file-name="true"
        :multiple="true"
        :label="$t('houses.form.media')"
        accept="image/*"
        :counter="true"
        :rules="computedFileRules"
        @change="onAddPhoto"
      />

      <VCarousel
        v-if="previewImages.length"
        v-model="currentMediaItem"
        continuous
        height="400"
        hide-delimiter-background
        class="r-house-form__media-carousel"
      >
        <VCarouselItem
          v-for="(image, index) in previewImages"
          :key="index"
          class="r-house-form__media-item"
        >
          <div class="r-house-form__media-item-wrapper">
            <VImg
              :src="image.url"
              class="r-house-form__media-item__image"
              max-height="100%"
            />
            <VBtn
              :icon="mdiTrashCan"
              size="large"
              color="error"
              @click="onDeleteImage(index)"
            />
          </div>
        </VCarouselItem>
      </VCarousel>
    </div>

    <div class="r-house-form__col-map">
      <VLabel :text="$t('houses.form.map.map')" />
      <RMap
        ref="mapRef"
        class="mb-4"
        height="500px"
        :center="mapCenter"
        :markers="[marker]"
        @click="onClickMap"
      />

      <VLabel :text="$t('houses.form.map.inputs')" />

      <VTextField
        v-model="proxiedData.location.district"
        class="r-house-form__district"
        :rules="[required]"
        :label="$t('houses.form.district')"
        readonly
        required
      />
      <VTextField
        v-model="proxiedData.location.city"
        class="r-house-form__city"
        :rules="[required]"
        :label="$t('houses.form.city')"
        readonly
        required
      />

      <VTextField
        v-model="proxiedData.location.street"
        class="r-house-form__street"
        :rules="[required]"
        :label="$t('houses.form.street')"
        readonly
        required
      />

      <VTextField
        v-model="proxiedData.location.houseNumber"
        class="r-house-form__houseNumber"
        :rules="[required]"
        :label="$t('houses.form.house_number')"
        readonly
        required
      />
    </div>

    <VBtn
      type="submit"
      class="r-user-form__submit-button"
      color="secondary"
      :loading="loading"
    >
      {{ buttonText }}
    </VBtn>
  </VForm>
</template>

<style lang="scss">
.r-house-form {
  @apply grid grid-cols-1 lg:grid-cols-2 gap-6;

  &__col {
    @apply grid gap-y-2;

    &-media,
    &-map {
      @apply col-span-2;
    }
  }

  &__media {
    &-item {
      &__image {
        @apply h-full;
      }
      &-wrapper {
        @apply relative h-full;

        button {
          @apply
          transition-opacity
          '!w-12'
          '!z-999'
         '!h-12'
          top-0
          absolute
          right-6
        }

        &:hover {
          button {
            @apply opacity-100 visible;
          }
        }
      }
    }
  }
}
</style>
