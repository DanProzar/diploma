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
        emit('cropped', success)
      }
    },
  )
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
      <div class="r-edit-avatar__cropper">
        <template v-if="show">
          <VueCropper
            ref="cropper"
            v-bind="option"
          />
        </template>
      </div>

      <canvas
        ref="canvasRef"
        class="r-edit-avatar__canvas"
        width="200"
        height="200"
      />

      <VFileInput
        v-model="files"
        accept="image/*"
        :show-file-size="true"
        :show-file-name="true"
        @change="onUploadAvatar"
      />

      <VBtn color="secondary" @click="onCrop">
        Crop
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
}
</style>
