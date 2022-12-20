import { ChakraProvider, Box, theme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Layout } from "./components/Layout/Layout";
import { Navigate, Route, Routes } from "react-router-dom";
import { publickRoutes } from "./router";

export const App = () => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <ColorModeSwitcher mb={20} justifySelf="flex-end" />
        <Routes>
          <Route path="/" element={<Layout />}>
            {publickRoutes.map((route, i) => (
              <Route key={i} path={route.path} element={<route.element />} />
            ))}
          </Route>
          <Route path="*" element={<Navigate to="404" replace />} />
          <Route path="404" element={<p>NO MATCH</p>} />
        </Routes>
      </Box>
    </ChakraProvider>
  );
};
