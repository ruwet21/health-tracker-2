<template>
  <div class="glass p-6 rounded-2xl">
    <div class="flex items-center gap-3 mb-6">
      <div class="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
        <ActivityIcon class="w-5 h-5" />
      </div>
      <h2 class="text-xl font-semibold text-slate-900 dark:text-slate-100">Add New Record</h2>
    </div>

    <form @submit.prevent="submitForm" class="space-y-5">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <BaseSelect
          v-model="form.user"
          label="User"
          :options="userOptions"
          placeholder="Select User"
          :error="errors.user"
        />

        <BaseInput
          v-model="form.date"
          type="date"
          label="Date"
          :error="errors.date"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <BaseSelect
          v-model="form.type"
          label="Test Type"
          :options="typeOptions"
          placeholder="Select Test Type"
          :error="errors.type"
        />

        <BaseInput
          v-model.number="form.value"
          type="number"
          step="0.1"
          label="Result Value"
          placeholder="Enter value"
          :error="errors.value"
        />
      </div>

      <div class="pt-2">
        <BaseButton type="submit" fullWidth :loading="isSubmitting">
          <template #icon>
            <SaveIcon class="w-4 h-4" />
          </template>
          Save Record
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { Activity as ActivityIcon, Save as SaveIcon } from 'lucide-vue-next';
import { format } from 'date-fns';
import BaseInput from '../ui/BaseInput.vue';
import BaseSelect from '../ui/BaseSelect.vue';
import BaseButton from '../ui/BaseButton.vue';
import { useHealthLogs } from '../../composables/useHealthLogs';
import { useToast } from '../../composables/useToast';

const { addLog } = useHealthLogs();
const { showToast } = useToast();

const userOptions = [
  { label: 'Abdulatip', value: 'Abdulatip' },
  { label: 'Retno Wati', value: 'Retno Wati' }
];

const typeOptions = [
  { label: 'Gula Darah', value: 'Gula Darah' },
  { label: 'Asam Urat', value: 'Asam Urat' },
  { label: 'Kolesterol', value: 'Kolesterol' }
];

const getToday = () => format(new Date(), 'yyyy-MM-dd');

const initialState = {
  user: '',
  date: getToday(),
  type: '',
  value: ''
};

const form = reactive({ ...initialState });
const errors = reactive({ user: '', date: '', type: '', value: '' });
const isSubmitting = ref(false);

const validate = () => {
  let isValid = true;
  errors.user = '';
  errors.date = '';
  errors.type = '';
  errors.value = '';

  if (!form.user) {
    errors.user = 'User is required';
    isValid = false;
  }
  if (!form.date) {
    errors.date = 'Date is required';
    isValid = false;
  }
  if (!form.type) {
    errors.type = 'Test type is required';
    isValid = false;
  }
  if (form.value === '' || form.value === null) {
    errors.value = 'Value is required';
    isValid = false;
  } else if (isNaN(form.value) || Number(form.value) < 0) {
    errors.value = 'Must be a valid positive number';
    isValid = false;
  }

  return isValid;
};

const submitForm = async () => {
  if (!validate()) return;

  isSubmitting.value = true;
  
  const success = await addLog({
    user: form.user,
    date: form.date,
    type: form.type,
    value: Number(form.value)
  });

  isSubmitting.value = false;

  if (success) {
    showToast('Record saved successfully!');
    // Reset form
    Object.assign(form, initialState);
    form.date = getToday(); // Keep today as default
  } else {
    showToast('Failed to save record.', 'error');
  }
};
</script>
