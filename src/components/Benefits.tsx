import { ChevronRight, Gift } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import BenefitCard from "./BenefitCard";
import { Separator } from "./ui/separator";

const Benefits = () => {
  const headerSectionTitle = "Your benefits";
  const headerSectionIcon = <Gift />;
  const headerCtaTitle = "View all";
  const headerCtaIcon = <ChevronRight />;

  const benefits: { title: string; description: string; bgColor: string }[] = [
    { title: "Cuervo Cafe", description: "$8.00 OFF", bgColor: "#D9D9D9" },
    { title: "Carrefour", description: "30% OFF", bgColor: "#937979" },
    {
      title: "Cafe Coffee Day",
      description: "Buy 1 Get 1 Free",
      bgColor: "#A32222",
    },
    {
      title: "Diarco",
      description: "3 Cuotas sin interés",
      bgColor: "#D9D9D9",
    },
    { title: "Coto", description: "10% OFF", bgColor: "#937979" },
  ];

  return (
    <>
      <SectionHeader
        title={<p className="text-lg font-semibold">{headerSectionTitle}</p>}
        titleIcon={headerSectionIcon}
        ctaTitle={headerCtaTitle}
        ctaIcon={headerCtaIcon}
      />

      <div className="pt-2">
        {benefits.map((benefit, index) => (
          <div className="py-2" key={index}>
            <BenefitCard
              key={index}
              title={benefit.title}
              bgColor={benefit.bgColor}
              description={benefit.description}
            />

            <Separator className="mt-2" />
          </div>
        ))}
      </div>
    </>
  );
};

export default Benefits;
