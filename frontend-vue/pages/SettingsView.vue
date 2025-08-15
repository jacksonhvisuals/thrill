<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod"
import { useForm } from "vee-validate"
import * as z from "zod"

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
  username: z.string().min(2).max(50),
}))

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
    console.log("Submitted!")
})
</script>

<template>
  <div class="w-full p-4">
  <form class="space-y-6 w-full" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="username" :validate-on-blur="!isFieldDirty" class="w-full">
      <FormItem>
        <FormLabel>API Key</FormLabel>
        <FormControl>
          <Input type="text" placeholder="h10gtKqjOpfh..." v-bind="componentField" />
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