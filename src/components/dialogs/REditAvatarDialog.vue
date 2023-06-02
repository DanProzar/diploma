<script lang="ts" setup>
import 'vue-cropper/dist/index.css'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  modelValue: boolean
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const fileObjectURL = ref('')
const cropper = ref()

const emit = defineEmits<{
  (e: 'cropped', path: string): void
  (e: 'update:modelValue', value: boolean): void
}>()

const proxiedModel = useVModel(props, 'modelValue', emit)

const client = useSuperbase()
const { user } = useAuth()
const { setImage } = useCanvas(canvasRef)
const files = ref([])

const show = computed(() => !!fileObjectURL.value)

const option = computed(() => ({
  img: fileObjectURL.value,
  size: 2,
  full: false,
  outputType: 'png',
  canMove: true,
  mode: 'cover',
  fixedBox: false,
  original: false,
  canMoveBox: true,
  autoCrop: true,
  autoCropWidth: 180,
  autoCropHeight: 180,
  centerBox: true,
  high: true,
  max: 99999,
}))

const onUploadAvatar = (event: Event) => {
  const target = event.target as HTMLInputElement

  const file = target.files?.[0]

  if (!file) {
    return
  }

  fileObjectURL.value = URL.createObjectURL(file)

  const reader = new FileReader()

  reader.onload = (e) => {
    setImage(e.target!.result)
  }

  reader.readAsDataURL(file)
}

watch(fileObjectURL, (updated) => {
  if (updated) {
    setImage(updated)
  }
})

const { isAvatarSet } = useUserProfile()

const onCrop = async () => {
  await cropper.value.getCropBlob(
    async (data: Blob) => {
      const avatarHasSet = await isAvatarSet()
      const method = avatarHasSet ? 'update' : 'upload'

      const { error, data: success } = await client.storage
        .from('media')[method](`avatars/${user.value!.id}`, data)

      if (!error && success) {
        emit('cropped', success.path)
      }
    },
  )
}

const preview = ref()

const previewStyle = computed(() => {
  if (!preview.value) {
    return null
  }

  return {
    width: `${preview.value.w}px`,
    height: `${preview.value.h}px`,
    overflow: 'hidden',
    margin: '5px',
  }
})

const onCropMoving = (data) => {
  preview.value = data
}

</script>

<template>
  <RDialogWrapper
    v-model="proxiedModel"
    max-width="40rem"
    :title="$t('dialog.edit_avatar.title')"
    class="r-edit-avatar__dialog"
  >
    <div class="r-edit-avatar">
      <div class="r-edit-avatar__wrapper">
        <div class="r-edit-avatar__cropper">
          <template v-if="show">
            <VueCropper
              ref="cropper"
              v-bind="option"
              @real-time="onCropMoving"
            />
          </template>
        </div>

        <div
          v-if="preview"
          class="r-edit-avatar__preview"
          :style="previewStyle"
        >
          <div :style="preview.div">
            <img :src="preview.url" :style="preview.img">
          </div>
        </div>
      </div>

      <VFileInput
        v-model="files"
        accept="image/*"
        :show-file-size="true"
        :show-file-name="true"
        @change="onUploadAvatar"
      />

      <VBtn color="secondary" @click="onCrop">
        {{ $t('user.profile.crop_image') }}
      </VBtn>
    </div>
  </RDialogWrapper>
</template>

<style lang="scss">
.r-edit-avatar{
  @apply grid gap-4;

  &__cropper {
    aspect-ratio: 1;
    @apply w-40;
  }

  &__preview {
    img {
      max-width: initial;
      max-height: initial;
    }
  }

  &__wrapper {
    @apply grid gap-6 grid-cols-2;
  }
}
</style>
