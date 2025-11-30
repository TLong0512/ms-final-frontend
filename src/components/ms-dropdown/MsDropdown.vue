<template>
  <a-dropdown
    class="cursor-pointer"
    :arrow="isBubble ? { pointAtCenter: true } : false"
    :trigger="['click']"
  >
    <!-- Nội dung từ của cha -->
    <a class="ant-dropdown-link" @click.prevent>
      <slot></slot>
    </a>
    <!-- Nội dung các thẻ drop down -->
    <template #overlay>
      <a-menu>
        <router-link v-for="(item, index) in dropDownItems" :key="index" :to="item.to || ''">
          <a-menu-item>
            <div v-if="item.icon?.trim()" :class="['icon', item.icon]" />
            <span>{{ item.title }}</span>
          </a-menu-item>
        </router-link>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup>
/**
 *Prop:
  1. dropDownItems: bao gồm item, icon, link navigate
  2. isBubble: hình dạng của dropdown
 */
const props = defineProps({
  dropDownItems: Array,
  isBubble: { type: Boolean, default: false },
});
</script>

<style>
.ant-dropdown-menu-title-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
