<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod"
import { useForm } from "vee-validate"
import * as z from "zod"
import { ref } from 'vue'
import { useApiKeyStore } from '@/stores/apiKey'
import { connectSimpleFin } from '@/lib/api'
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
  apiKey: z.string().min(85).max(120),
}))

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
})


const store = useApiKeyStore()
const key = ref(store.apiKey)
const token = ref(store.tokenBase64)
const msg = ref('')

async function saveAndConnect() {
  msg.value = ''
  store.set(token.value)
  try {
    await connectSimpleFin(store.tokenBase64)
    msg.value = 'Connected.'
    console.log(msg.value)
  } catch (e: any) {
    msg.value = e?.message ?? 'Connect failed'
    console.log(msg.value)
  }
}
function clear() { store.clear(); token.value = ''; msg.value = 'Cleared.' }
</script>

<template>
  <div class="w-full p-4">
  <form class="space-y-6 w-full" @submit="saveAndConnect">
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