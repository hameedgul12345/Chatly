import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({ children }) {
  return (
    <div className="min-h-screen w-full">

      {/* HEADER (Mobile Only) */}
      <header className="md:hidden">
        <Header />
      </header>

      {/* MAIN CONTAINER */}
      <section className="flex w-full min-h-screen">

        {/* SIDEBAR (Desktop Only) */}
        <aside className="w-[25%] hidden md:block">
          <Sidebar />
        </aside>

        {/* MAIN CONTENT */}
        <main className="w-full  md:w-[75%]">
          {children}
        </main>

      </section>

    </div>
  );
}

export default Layout;
