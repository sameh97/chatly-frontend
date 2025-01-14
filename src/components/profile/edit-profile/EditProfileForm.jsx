import React, { useState } from "react";
import { Button, Group, TextInput, Card, Title, ActionIcon, Divider } from "@mantine/core";
import { IconPencil, IconCheck, IconX } from "@tabler/icons-react";
import { useForm } from "@mantine/form";

const EditProfileForm = ({ user, onSubmit }) => {
  const [editingFields, setEditingFields] = useState({ username: false, email: false });

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

  const handleSaveField = (field) => {
    setEditingFields((prev) => ({ ...prev, [field]: false }));
    onSubmit({ [field]: form.values[field] });
  };

  const handleEditField = (field) => {
    setEditingFields((prev) => ({ ...prev, [field]: true }));
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
            {...form.getInputProps(field)}
          />
          <Group mt="xs" spacing="xs">
            <Button
              size="xs"
              color="green"
              leftIcon={<IconCheck size={14} />}
              onClick={() => handleSaveField(field)}
            >
              Save
            </Button>
            <Button
              size="xs"
              color="gray"
              leftIcon={<IconX size={14} />}
              onClick={() => setEditingFields((prev) => ({ ...prev, [field]: false }))}
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
      {/* <Title order={4} mb="md">
        Edit Profile
      </Title> */}
      <Divider mb="lg" />
      {renderField("Username", "username")}
      {renderField("Email", "email")}
    </Card>
  );
};

export default EditProfileForm;
