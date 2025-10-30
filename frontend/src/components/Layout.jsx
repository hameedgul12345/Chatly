import React from "react";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <section className="flex w-full min-h-screen">
      {/* Sidebar Section */}
      <aside className="w-[25%] ">
        <Sidebar />
      </aside>

      {/* Main Content Section */}
      <main className="w-[75%]  ">
        <div className="p-0 w-full ">{children}</div>
      </main>
    </section>
  );
}

export default Layout;
