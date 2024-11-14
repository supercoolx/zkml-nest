import Content from "./layouts/Content.tsx";
import Profile from "./layouts/Profile.tsx";
import { MyContextProvider } from "./MyContextProvider.tsx";
import Header from "./layouts/Header.tsx";
import Sidebar from "./layouts/Sidebar.tsx";
import Footer from "./layouts/Footer.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <MyContextProvider>
        <div className="h-screen">
          <div className="flex flex-col justify-between h-full bg-[url('/src/assets/img/bg1.jpg')] bg-no-repeat bg-center bg-cover">
            <Header />
            {/* Content */}
            <div className="flex h-full">
              <Sidebar />
              <div className="flex justify-center items-center p-4 sm:p-10 w-full">
                <Routes>
                  <Route path="/" element={<Content />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </div>
            </div>
            {/* Content */}
            <Footer />
          </div>
        </div>
      </MyContextProvider>
    </Router>
  );
};

export default App;
