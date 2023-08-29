import { useState } from "react";
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  rem,
  Switch,
} from "@mantine/core";
import {
  IconHome2,
  IconGauge,
  IconUser,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
  IconMessageCircle,
} from "@tabler/icons-react";
import { MantineLogo } from "@mantine/ds";
import "./DoubleNavbar.scss";
import { Link, Route } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

function NavbarLink({ icon: Icon, label, active, onClick }) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon size="1.2rem" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconMessageCircle, label: "Messages", to: "messages" },
  { icon: IconHome2, label: "Home", to: "home" },
  { icon: IconGauge, label: "Dashboard", to: "dashboard" },
  // { icon: IconUser, label: "Account" },
  // { icon: IconSettings, label: "Settings" },
];

export function DoubleNavbar() {
  const [active, setActive] = useState(2);

  const links = mockdata.map((link, index) => (
    <Link to={link.to} key={link.label} onClick={() => setActive(index)}>
      <NavbarLink {...link} active={index === active} />
    </Link>
  ));

  return (
    <Navbar height="100%" width={{ base: 80 }} p="md">
      <Center>
        <MantineLogo type="mark" size={30} />
      </Center>
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
          <NavbarLink icon={IconLogout} label="Logout" />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
