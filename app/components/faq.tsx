import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqProps {
  heading?: string;
  items?: FaqItem[];
}

const Faq = ({
  heading = "Frequently asked questions",
  items = [
    {
      question: "What should I bring to the initial consultation?",
      answer:
        "It's helpful to bring any relevant documents or information related to your case to the initial consultation. This may include contracts, legal notices, court documents, correspondence, or any other records that are pertinent to your situation. Additionally, come prepared with a list of questions you may have for the attorney, as the consultation is an opportunity to gather information and assess whether the attorney is the right fit for your needs.",
    },
    {
      question: "How can I schedule a consultation with your firm?",
      answer:
        "Scheduling a consultation with our firm is easy. You can give us a call at [phone number] or fill out the contact form on our website. Our team will promptly get in touch with you to arrange a convenient time for the consultation. During the consultation, we will discuss your case, answer your questions, and provide an initial assessment of your legal matter.",
    },
    {
      question: "Do I really need a lawyer, or can I handle my legal matters on my own?",
      answer:
        "While you have the right to represent yourself, it is highly recommended to seek the assistance of a qualified lawyer. Legal matters can be complex, and an attorney has the knowledge and experience to navigate the legal system effectively. A lawyer can provide valuable advice, ensure your rights are protected, and improve your chances of a favorable outcome.",
    },
    {
      question: "How long will my legal case take to resolve?",
      answer:
        "The duration of a legal case depends on various factors, including the complexity of the matter, the court's schedule, and the cooperation of all parties involved. Some cases can be resolved through negotiation or settlement, which may expedite the process. However, litigation can take longer, particularly if the case goes to trial. Your lawyer can provide an estimated timeline based on the specific details of your case.",
    },
    {
      question: "What is the cost of hiring a lawyer?",
      answer:
        "The cost of hiring a lawyer can vary depending on several factors, such as the complexity of the case, the attorney's experience, and the location. Some lawyers charge an hourly rate, while others may offer a flat fee or work on a contingency basis. It's best to schedule a consultation to discuss the specifics of your case and get a clear understanding of the associated costs.",
    },
  ],
}: FaqProps) => {
  return (
    <section className="py-32">
      <div className="container max-w-3xl mx-auto">
        <h1 className="mb-4 text-3xl font-semibold md:mb-11 md:text-4xl">
          {heading}
        </h1>
        <Accordion type="single" collapsible>
          {items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="font-semibold hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export { Faq };
