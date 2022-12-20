import { Archive } from "../pages/Archive";
import { Trading } from "../pages/Trading";

export const publickRoutes = [
  { path: "/", element: Trading, label: "Trading" },
  { path: "archive", element: Archive, label: "Archive" },
];
