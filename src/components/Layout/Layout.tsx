import {
  extendTheme,
  Flex,
  Link,
  LinkOverlay,
  Stack,
  Tabs,
} from "@chakra-ui/react";
import { NavLink, Outlet } from "react-router-dom";

const mockdata = [
  {
    label: "Trading",
    to: "/",
  },
  {
    label: "Archive",
    to: "archive",
  },
];

const theme = extendTheme({
  layerStyles: {
    navlink: {
      p: "4px 15px",
    },
  },
});

export const Layout = () => {
  return (
    <Stack>
      <Tabs>
        <Flex align={"center"}>
          {mockdata.map((link) => (
            <Link
              key={link.label}
              sx={theme.layerStyles.navlink}
              _activeLink={{ color: "#a0aec0" }}
              as={NavLink}
              to={link.to}
            >
              {link.label}
            </Link>
          ))}
        </Flex>
      </Tabs>
      <Outlet />
    </Stack>
  );
};
