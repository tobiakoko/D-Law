import {
  BatteryCharging,
  GitPullRequest,
  Layers,
  RadioTower,
  SquareKanban,
  WandSparkles,
} from "lucide-react";

interface Reason {
  title: string;
  description: string;
  icon: React.ReactNode;
  img: string;
}

interface FeatureProps {
  heading?: string;
  reasons?: Reason[];
}

const Feature = ({
  heading = "Why Us?",
  reasons = [
    {
      title: "EXCELLENCE",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat?",
      icon: <GitPullRequest className="size-6" />,
      img: 'https://cdn.prod.website-files.com/66c756274183e3b605d4ce39/66c756274183e3b605d4cebc_Icon-6.svg',
    },
    {
      title: "TRUST",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat?",
      icon: <SquareKanban className="size-6" />,
      img: 'https://cdn.prod.website-files.com/66c756274183e3b605d4ce39/66c756274183e3b605d4cebc_Icon-6.svg',
    },
    {
      title: "INTEGRITY",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat?",
      icon: <RadioTower className="size-6" />,
      img: 'https://cdn.prod.website-files.com/66c756274183e3b605d4ce39/66c756274183e3b605d4cebc_Icon-6.svg',
    },
    {
      title: "ACCOUNTABILITY",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat?",
      icon: <WandSparkles className="size-6" />,
      img: 'https://cdn.prod.website-files.com/66c756274183e3b605d4ce39/66c756274183e3b605d4cebc_Icon-6.svg',
    },
  ],
}: FeatureProps) => {
  return (
    <section className="py-32">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-10 md:mb-20">
          <h2 className="mb-2 text-center text-3xl font-semibold lg:text-5xl">
            {heading}
          </h2>
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          {reasons.map((reason, i) => (
            <div key={i} className="flex flex-col">
              <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-accent">
                {reason.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{reason.title}</h3>
              <p className="text-muted-foreground">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature };
