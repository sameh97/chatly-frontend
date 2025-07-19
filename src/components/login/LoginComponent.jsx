import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import axios from "axios";
import { useState } from "react";
import { hasValue } from "../../common/app-utils";
import {
  persistTokenFromResponse,
  persistUserFromToken,
} from "../../services/authentication-service";
import useAuthStore from "../../stores/authStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useUserStore from "../../stores/user-store";
import { io } from 'socket.io-client';


export function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginAction = useAuthStore((state) => state.login);
  const setCurrentUserAction = useUserStore((state) => state.setCurrentUser);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleLoginButtonClick = async () => {
    // TODO: make validation

    const credentials = { email: email, password: password };
    const REACT_APP_API_BASE_URL = "http://ec2-44-198-165-219.compute-1.amazonaws.com:5000";


    const url = `${REACT_APP_API_BASE_URL}/api/login`;

    try {
      const response = await axios.post(url, credentials);

      if (hasValue(response)) {
        persistTokenFromResponse(response);

        const headers = response[`headers`];

        const authorizationValue = headers.get(`Authorization`);

        if (hasValue(authorizationValue)) {
          loginAction();

          const currentUser = persistUserFromToken();
          setCurrentUserAction(currentUser);


          toast.success("Login successfull", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
    } catch (error) {
      toast.error("Cannot Login", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          onChange={handleEmailChange}
          label="Email"
          placeholder="you@mantine.dev"
          required
        />
        <PasswordInput
          onChange={handlePasswordChange}
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />
        <Group position="apart" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" onClick={handleLoginButtonClick}>
          Log in
        </Button>
      </Paper>
    </Container>
  );
}
