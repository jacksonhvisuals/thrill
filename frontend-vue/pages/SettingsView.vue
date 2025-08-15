<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod"
import { useForm } from "vee-validate"
import * as z from "zod"
import { ref } from 'vue'
import { useApiKeyStore } from '@/stores/apiKey'

import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = toTypedSchema(z.object({
  apiKey: z.string().min(2).max(50),
}))

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
})

const store = useApiKeyStore()
const key = ref(store.apiKey)
const onSubmit = handleSubmit((values) => {
    store.set(values.apiKey)
})
</script>

<template>
  <div class="w-full p-4">
  <form class="space-y-6 w-full" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="apiKey" :validate-on-blur="!isFieldDirty" class="w-full">
      <FormItem>
        <FormLabel>API Key</FormLabel>
        <FormControl>
          <Input type="text" :placeholder="key" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit">
      Submit
    </Button>
  </form>

  </div>
</template>