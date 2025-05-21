import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

interface HeroProps {
  badge?: string;
  heading: string;
  description: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  image: {
    src: string;
    alt: string;
  };
}

const Hero = ({
  badge = '',
  heading = "EXPERT LEGAL SOLUTIONS",
  description = "We are committed to excellence and have a deep understanding of the law. Our aim is to provide you with real world solutions.",
  buttons = {
    primary: {
      text: "Book Consultation",
      url: "https://www.shadcnblocks.com",
    },
    secondary: {
      text: "Explore More",
      url: "https://www.shadcnblocks.com",
    },
  },
  image = {
    src: "https://cdn.prod.website-files.com/66c756274183e3b605d4ce42/66c81b913355e6ec6f7d43ed_Lady_of_justice.webp",
    alt: "Hero section demo image showing interface components",
  },
}: HeroProps) => {
  return (
    <section className="py-32">
      <div className="container mx-auto">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {badge && (
              <Badge variant="outline">
                {badge}
                <ArrowUpRight className="ml-2 size-4" />
              </Badge>
            )}
            <h1 className="my-6 text-4xl font-bold text-pretty lg:text-6xl">
              {heading}
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
              {description}
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              {buttons.primary && (
                <Button asChild className="w-full sm:w-auto">
                  <a href={buttons.primary.url}>{buttons.primary.text}</a>
                </Button>
              )}
              {buttons.secondary && (
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <a href={buttons.secondary.url}>
                    {buttons.secondary.text}
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
          <img
            src={image.src}
            alt={image.alt}
            className="max-h-96 w-full rounded-md object-contain object-top"
          />
        </div>
      </div>
    </section>
  );
};

export { Hero };
