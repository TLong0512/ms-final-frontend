<template>
  <div class="ms-table" ref="wrapper">
    <table>
      <!-- Header -->
      <thead class="sticky top-0 z-10">
        <tr>
          <th v-for="field in fields" :key="field.key">
            {{ field.label }}
          </th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <!-- Body -->
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex" class="table-row">
          <td v-for="field in fields" :key="field.key">
            <template v-if="field.type === 'custom'">
              <slot :name="field.key" :row="row" :field="field" :value="row[field.key]">
                {{ handleFormat(row[field.key], 'text') }}
              </slot>
            </template>

            <template v-else>
              {{ handleFormat(row[field.key], field.type || 'text') }}
            </template>
          </td>
          <td class="action-column">
            <button @click="handleEdit(row)" class="edit-btn">
              <div class="icon icon-edit"></div>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { formatNumber, formatDate, formatText } from '@/utils/formatter';
import { ref, onMounted } from 'vue';

/**
 * Mounted: chỉ được tương tác với scrollbar để scroll ngang
 */
const wrapper = ref(null);

onMounted(() => {
  if (!wrapper.value) return;

  wrapper.value.addEventListener(
    'wheel',
    (e) => {
      if (e.shiftKey || e.deltaX !== 0) {
        e.preventDefault();
      }
    },
    { passive: false },
  );
});

/**
 * I. fields: Danh sách các cột, định nghĩa các thành phần cho field bao gồm:
 *    1. type - kiểu dữ liệu hiển thị: [text, number, date, custom]
 *    2. key - identify cho cột: [id, name, .....]
 *    3. label - dữ liệu hiển thị thực tế
 * II. rows: Danh sách các dòng, các cột ở từng dòng gồm:
 *    1. [giá trị key]
 *    2. [data trả về từ api]
 *
 */
const props = defineProps({
  fields: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every((field) => {
        const validTypes = ['text', 'number', 'date', 'custom'];
        return field.key && field.label && validTypes.includes(field.type || 'text');
      });
    },
  },
  rows: {
    type: Array,
    required: true,
  },
});

/**
 * biến emit cho task sửa và xóa
 */
const emit = defineEmits(['edit', 'delete']);

/**
 * format dữ liệu cho từng kiểu
 */
const handleFormat = (value, type) => {
  switch (type) {
    case 'number':
      return formatNumber(value);
    case 'date':
      return formatDate(value);
    case 'text':
      return formatText(value);
    default:
      return formatText(value);
  }
};

/**
 *
 * Emit sự kiện sửa, xóa
 */
const handleEdit = (row) => {
  emit('edit', row);
};
</script>

<style scoped>
.ms-table {
  width: 100%;

  overflow-x: auto;
  position: relative;
}

table {
  width: 100%;
  border-collapse: collapse;
}
th {
  background-color: var(--table-header-bg-color);
  border: 1px solid #ddd;
}
th,
td {
  white-space: nowrap;
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.table-row:hover {
  background-color: var(--row-hover-bg-color);
  cursor: pointer;
}

.action-column {
  position: sticky;
  right: 0;
  display: none;
  padding: 0;
}
.table-row:hover .action-column {
  display: table-cell;
  background-color: white;
}
.edit-btn {
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 2rem;
  padding-right: 2rem;
  border: none;
}
</style>
