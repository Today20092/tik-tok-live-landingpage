import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 'what-is-quran',
    question: 'What is the Quran?',
    answer:
      'The Quran is the holy scripture of Islam, believed by Muslims to be the word of God revealed to the Prophet Muhammad over 23 years. It contains 114 chapters (Surahs) and is organized by length rather than chronologically. The Quran covers topics including spirituality, ethics, law, and guidance for living a meaningful life.',
  },
  {
    id: 'prophet-muhammad',
    question: 'Who was the Prophet Muhammad (ﷺ)?',
    answer:
      'Muhammad is revered by Muslims as the final prophet sent by God. Born in Mecca in 570 CE, he received the Quran through divine revelation over his lifetime. He is known for his honesty, compassion, and efforts to spread monotheism. The Islamic calendar dates from his migration to Medina in 622 CE.',
  },
  {
    id: 'learn-islam',
    question: 'How do I learn more about Islam?',
    answer:
      'There are many ways to begin: read introductory books about Islam, listen to talks from Islamic scholars, explore online resources, visit a local mosque to learn about the community, or join discussion groups. Starting with the Quran itself, even just a few chapters in English translation, gives great insight into Islamic teachings.',
  },
  {
    id: 'find-mosque',
    question: 'Where can I find a local mosque?',
    answer:
      'You can search online for mosques near you, or use websites like MuslimProor Google Maps. Most mosques welcome visitors and offer tours. Visiting a mosque is a great way to meet the community, learn about Islamic practices, and often provides free literature and resources for newcomers.',
  },
];

export default function FAQ() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <button
          key={faq.id}
          onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
          className="w-full text-left p-4 bg-card rounded-lg border border-border hover:border-accent/50 transition-colors"
        >
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-semibold text-foreground flex-1">{faq.question}</h3>
            <ChevronDown
              size={20}
              className={`text-accent/60 flex-shrink-0 transition-transform ${
                expandedId === faq.id ? 'rotate-180' : ''
              }`}
            />
          </div>

          {expandedId === faq.id && (
            <div className="mt-3 pt-3 border-t border-border/50">
              <p className="text-sm text-foreground/80 leading-relaxed">{faq.answer}</p>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
