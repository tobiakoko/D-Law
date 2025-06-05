import logolight from "~/assets/logo-light.svg"
import logodark from "~/assets/logo-dark.svg"
import { Link } from "react-router";

import DarkLogo from '~/assets/logo-light.png';

export default function Logo() {
    return (
        <Link to="/" className="flex items-center">
            <div className="size-30 rounded-lg flex items-center justify-center mr-3 transform group-hover:scale-110 transition-all duration-300">
                <img 
                    src={DarkLogo} 
                    alt="Osei K. Prempeh P.A. Logo" 
                />
            </div>
        </Link>
    );
}


export function AltLogo() {
    const logo = {
    src: DarkLogo,
    alt: "Osei K. Prempeh P.A. Logo",
    title: "Osei K. Prempeh, P.A.",
    url: "/",
  }
  const tagline = "Attorney, Mediator, and Counselor at Law"

    return (
        <Link to="/" className="flex items-center group cursor-pointer">
                <div className="relative">
                  <img 
                    src={DarkLogo} 
                    alt={logo.alt} 
                    className="size-18 transform group-hover:scale-110 transition-all duration-300" 
                  />
                </div>
                <div className="ml-4">
                  <h1 
                    className="text-xl font-semibold"
                    style={{ 
                      fontFamily: 'var(--font-raleway)',
                      color: 'var(--color-heading)',
                      fontWeight: 'var(--font-weight-semibold)'
                    }}
                  >
                    {logo.title}
                  </h1>
                  <p 
                    className="text-sm"
                    style={{ 
                      color: 'var(--color-secondary)',
                      fontFamily: 'var(--font-raleway)'
                    }}
                  >
                    {tagline}
                  </p>
                </div>
              </Link>
    );
}