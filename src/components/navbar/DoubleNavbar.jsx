import { useState } from "react";
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  rem,
} from "@mantine/core";
import {
  IconHome2,
  IconGauge,
  IconLogout,
  IconSwitchHorizontal,
  IconMessageCircle,
  IconUser,
} from "@tabler/icons-react";
import { MantineLogo } from "@mantine/ds";
import "./DoubleNavbar.scss";
import { Link } from "react-router-dom";
import ConfirmationDialog from "../shared/confirmation-dialog/ConfirmationDialog";
import { AppConsts } from "../../common/app-consts";
import useAuthStore from "../../stores/authStore";

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
  { icon: IconUser, label: "Profile", to: "profile" },
  // { icon: IconUser, label: "Account" },
  // { icon: IconSettings, label: "Settings" },
];

export function DoubleNavbar() {
  const [active, setActive] = useState(2);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const logoutAction = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem(AppConsts.KEY_USER_TOKEN);
    logoutAction();
    setIsLogoutModalOpen(false);
  };

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
          <NavbarLink
            icon={IconLogout}
            label="Logout"
            onClick={() => handleLogout()}
          />
          <ConfirmationDialog
            isOpen={isLogoutModalOpen}
            onRequestClose={() => setIsLogoutModalOpen(false)}
            onConfirm={confirmLogout}
          />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
