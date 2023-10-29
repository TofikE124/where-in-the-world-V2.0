import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import ThemeProvider from "./providers/ThemeProvider";
import FilterProvider from "./providers/FilterDataProvider";

function App() {
  return (
    <ThemeProvider>
      <FilterProvider>
        <RouterProvider router={router}></RouterProvider>
      </FilterProvider>
    </ThemeProvider>
  );
}

export default App;
