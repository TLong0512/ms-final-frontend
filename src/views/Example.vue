<template>
  <a-button type="primary" @click="showModal = true">Open Modal with async logic</a-button>

  <ms-modal :title="'Hello'" @cancel="handleCancel" @save="handleSave"
    ><template #content>
      <div class="flex justify-between">
        <div class="flex flex-col">
          <span>Họ</span><ms-input v-model="formState.firstName"></ms-input>
        </div>
        <div class="flex flex-col">
          <span>Tên</span><ms-input v-model="formState.lastName"></ms-input>
        </div>
        <div class="flex flex-col">
          <span>Tên khác</span><ms-input v-model="formState.otherName"></ms-input>
        </div>
      </div>
    </template>
    <template #cancel>Hủy</template>
    <template #save>Lưu</template>
  </ms-modal>

  <a-button class="mt-3" @click="handleViewData">Xen dữ liệu</a-button>
</template>
<script setup>
import { ref } from 'vue';
import UserAPI from '@/services/components/example/UserAPI';
import { showModal } from '@/common/constant/component-variables';
const formState = ref({
  firstName: '',
  lastName: '',
  otherName: '',
  x: 'a',
});
const resetForm = () => {
  formState.value = {
    firstName: '',
    lastName: '',
    otherName: '',
    x: 'a',
  };
};

const handleSave = async () => {
  try {
    const dto = formState.value;
    if (!dto.firstName || !dto.lastName) {
      throw new Error('Validation failed');
    }

    await UserAPI.post(dto); // gọi service

    resetForm(); // reset form sau save
    showModal.value = false; // đóng modal
  } catch (err) {
    console.error(err);
  }
};

const handleCancel = () => {
  resetForm(); // reset form
  showModal.value = false; // đóng modal
};

const handleViewData = async () => {
  await UserAPI.getAll().then((res) => {
    console.log(res.data);
  });
};
</script>
