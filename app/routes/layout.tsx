import { Outlet } from "react-router";
import Footer from "~/components/footer";
import Navigation from "~/components/Navigation";
import type { Route } from "./+types/layout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Osei K. Prempeh - Attorney, Mediator and Counselot at law" },
    { name: "description", content: "Call (813) 879-5919 for a free case consultation with The Law Offices of Osei K. Prempeh, P.A. today to get justice and compensation you deserve." },
    { name: "", content: ""},
  ];
}

export default function Layout() {
    return (
        <body className="min-h-screen bg-body-bg font-raleway">
            <Navigation />
            <Outlet />
            <Footer />
        </body>
    );
}