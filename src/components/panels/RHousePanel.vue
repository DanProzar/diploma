<script lang="ts" setup>
import { mdiPencil, mdiTrashCan } from '@mdi/js'
import type { IRHouseData } from '~/types'

const props = withDefaults(defineProps<{
  data: IRHouseData
  image: string
  vertical?: boolean
  editable?: boolean
  limitedDescription?: boolean
}>(), {
  editable: true,
  limitedDescription: true,
})

const emit = defineEmits<{
  (e: 'edit', id: number): void
  (e: 'delete', id: number): void
}>()

const onClick = () => {
  navigateTo(`/houses/${props.data.id}`)
}

const onEdit = () => emit('edit', props.data.id!)
const onDelete = () => emit('delete', props.data.id!)

</script>

<template>
  <div
    :class="[
      'r-house-panel',
      {
        'r-house-panel--vertical': vertical
      }
    ]"
  >
    <div class="r-house-panel__wrapper">
      <div class="r-house-panel__photo">
        <RImage
          :src="image"
          :aspect-ratio="16 / 9"
          @click.stop="onClick"
        />
      </div>

      <RHouseInfo
        :data="data"
        :limited-description="limitedDescription"
      />

      <div v-if="editable" class="r-house-panel__actions">
        <VBtn
          color="warning"
          variant="flat"
          :icon="mdiPencil"
          @click.prevent="onEdit"
        />

        <VBtn
          color="error"
          variant="flat"
          :icon="mdiTrashCan"
          @click.prevent="onDelete"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.r-house-panel {
  @apply
    rounded-[2rem]
    shadow
    shadow-primary
    shadow-md
    text-primary
    p-6
    transition-opacity
  ;

  &__wrapper {
    @apply
    grid
    items-center
    relative
    gap-6
    xl:grid-cols-[1fr,2fr]
    ;
  }

  &__actions {
    @apply
    opacity-0
    flex
    gap-2
    absolute
    top-0
    transition-opacity
    right-0;
  }

  &__photo {
    @apply
      max-w-80
      select-none
      bg-secondary
      bg-opacity-75
      rounded-lg
      py-4
      px-1
      transition-opacity
      mx-auto
      cursor-pointer
      <xl:(max-w-full)
    ;
  }

  &--vertical {
    @apply
      transition
      transition-all
      rounded-2xl
    ;

    .r-house-panel {
      &__wrapper {
        @apply grid-cols-1;
      }
      &__photo {
        @apply max-w-full;
      }
    }
  }

  &:hover {
    .r-house-panel {
      &__actions {
        @apply opacity-100;
      }

      &__photo {
        @apply opacity-80;
      }
    }
  }
}
</style>
