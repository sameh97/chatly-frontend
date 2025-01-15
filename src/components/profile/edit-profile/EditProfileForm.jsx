import React, { useState } from "react";
import { Button, Group, TextInput, Card, Title, ActionIcon } from "@mantine/core";
import { IconPencil, IconCheck, IconX } from "@tabler/icons-react";
import { useForm } from "@mantine/form";

const EditProfileForm = ({ user, onSubmit }) => {
  const [editingFields, setEditingFields] = useState({ username: false, email: false });

  const form = useForm({
    mode: 'uncontrolled',
    validateInputOnChange: true,
    initialValues: {
      username: user.username || "",
      email: user.email || "",
    },
    validate: {
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email"),
      username: (value) =>
        value.trim().length > 3 ? null : "Username must be at least 4 characters long",
    },
  });

  const handleSaveField = (field) => {
    // Validate the specific field before saving
    const validationResult = form.validateField(field);
    if (validationResult[field]) {
      console.error(`Validation error on ${field}:`, validationResult[field]);
      return;
    }

    setEditingFields((prev) => ({ ...prev, [field]: false }));
    onSubmit({ [field]: form.values[field] });
  };

  const handleEditField = (field) => {
    setEditingFields((prev) => ({ ...prev, [field]: true }));
  };


  const handleCancelEditField = (field) => {
    // Reset field value to its initial value
    form.setValues({
      ...form.values,
      [field]: user[field], // Reset to the original user value
    });
    setEditingFields((prev) => ({ ...prev, [field]: false }));
  };

  const renderField = (label, field) => (
    <div style={{ marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Title order={6} style={{ marginBottom: "0.5rem" }}>
          {label}
        </Title>
        {!editingFields[field] && (
          <ActionIcon onClick={() => handleEditField(field)}>
            <IconPencil size={18} />
          </ActionIcon>
        )}
      </div>
      {editingFields[field] ? (
        <div>
          <TextInput
            withAsterisk
            placeholder={`Enter ${label.toLowerCase()}`}
            key={form.key(field)}
            {...form.getInputProps(field)}
            error={form.errors[field]} // Display validation error dynamically
          />
          <Group mt="xs" spacing="xs">
            <Button
              size="xs"
              color="green"
              leftIcon={<IconCheck size={14} />}
              onClick={() => handleSaveField(field)}
              disabled={!!form.errors[field]} // Disable Save if the field is invalid
            >
              Save
            </Button>
            <Button
              size="xs"
              color="gray"
              leftIcon={<IconX size={14} />}
              onClick={() => handleCancelEditField(field)} // Use the cancel handler
            >
              Cancel
            </Button>
          </Group>
        </div>
      ) : (
        <div
          style={{
            padding: "0.5rem 0",
            borderBottom: "1px solid #e9ecef",
          }}
        >
          <span>{form.values[field] || `No ${label.toLowerCase()} set`}</span>
        </div>
      )}
    </div>
  );

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      {renderField("Username", "username")}
      {renderField("Email", "email")}
    </Card>
  );
};

export default EditProfileForm;
