<script lang="ts" setup>
import { mdiPlus } from '@mdi/js'
import { v4 as uuid } from 'uuid'

const dialogs = useDialogs()
const { user } = useAuth()
const { houses, loadUserHouses, houseIdToEdit, houseIdToDelete } = useHouses()

const onAddHouse = () => {
  dialogs.value.addHouse = true
}

const onEdit = (id: number) => {
  dialogs.value.editHouse = true
  houseIdToEdit.value = id
}

const onDelete = (id: number) => {
  dialogs.value.deleteHouse = true
  houseIdToDelete.value = id
}

watch(user, async (newUser, oldUser) => {
  if (newUser) {
    await loadUserHouses()
  }
}, { immediate: true })

</script>

<script lang="ts">
export default { inheritAttrs: false }
</script>

<template>
  <div :class="['r-houses-dashboard', $attrs.class]">
    <div class="r-houses-dashboard__actions">
      <VBtn
        class="r-houses-dashboard__action-add"
        color="success"
        :prepend-icon="mdiPlus"
        @click="onAddHouse"
      >
        {{ $t('user.account.houses.add') }}
      </VBtn>
    </div>

    <div v-if="houses.length" class="r-houses-dashboard__panels">
      <RHousePanel
        v-for="(house, i) in houses"
        :key="uuid() + i"
        :data="house"
        :image="house.transformed_media[0]"
        class="r-houses-dashboard__panel"
        @edit="onEdit"
        @delete="onDelete"
      />
    </div>
  </div>
</template>

<style lang="scss">
.r-houses-dashboard {
  @apply relative;

  &__actions {
  }

  &__panels {
    @apply mt-6 grid gap-6;
  }
}
</style>
