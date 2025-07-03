import { Collapsible } from '@/components/ui/collapsible';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function CollapsibleFAQ() {
  const faqs = [
    {
      question: 'How do I reset my password?',
      answer:
        "You can reset your password by clicking on the 'Forgot Password' link on the login page. Enter your email address and we'll send you instructions to reset your password.",
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer:
        'Yes, you can cancel your subscription at any time from your account settings. Your subscription will remain active until the end of your current billing period.',
    },
    {
      question: 'Is my data secure?',
      answer:
        'We take data security seriously. All data is encrypted in transit and at rest. We follow industry best practices and comply with relevant data protection regulations.',
    },
    {
      question: 'How do I contact support?',
      answer:
        'You can reach our support team through the in-app chat, email us at support@example.com, or call our toll-free number during business hours.',
    },
  ];

  return (
    <View style={{ gap: 16 }}>
      <Text variant='subtitle' style={{ marginBottom: 8 }}>
        Frequently Asked Questions
      </Text>

      <View style={{ gap: 12 }}>
        {faqs.map((faq, index) => (
          <Collapsible key={index} title={faq.question}>
            <Text variant='body'>{faq.answer}</Text>
          </Collapsible>
        ))}
      </View>
    </View>
  );
}
