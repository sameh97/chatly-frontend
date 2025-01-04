import React from "react";
import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

const EditProfileForm = ({ user, onSubmit }) => {
  const form = useForm({
    initialValues: {
      username: user.username || "",
      email: user.email || "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      username: (value) => (value.trim().length > 0 ? null : "Username is required"),
    },
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <TextInput
        withAsterisk
        label="Username"
        placeholder="Enter username"
        {...form.getInputProps("username")}
      />

      <TextInput
        withAsterisk
        mt="md"
        label="Email"
        placeholder="Enter email"
        {...form.getInputProps("email")}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Save Changes</Button>
      </Group>
    </form>
  );
};

export default EditProfileForm;
