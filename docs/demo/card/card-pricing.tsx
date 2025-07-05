import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { Check } from 'lucide-react-native';
import React from 'react';

export function CardPricing() {
  const plans = [
    {
      name: 'Basic',
      price: '$9',
      description: 'Perfect for individuals',
      features: ['1 Project', '5GB Storage', 'Email Support'],
      popular: false,
    },
    {
      name: 'Pro',
      price: '$29',
      description: 'Best for small teams',
      features: [
        '10 Projects',
        '100GB Storage',
        // 'Priority Support',
        // 'Advanced Analytics',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '$99',
      description: 'For large organizations',
      features: [
        'Unlimited Projects',
        '1TB Storage',
        // '24/7 Support',
        // 'Custom Integrations',
      ],
      popular: false,
    },
  ];

  return (
    <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap' }}>
      {plans.map((plan, index) => (
        <Card
          key={index}
          style={{
            flex: 1,
            minWidth: 250,
            borderWidth: plan.popular ? 2 : 1,
            borderColor: plan.popular ? '#3b82f6' : undefined,
          }}
        >
          <CardHeader>
            <View style={{ alignItems: 'center' }}>
              {plan.popular && (
                <View
                  style={{
                    backgroundColor: '#3b82f6',
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    borderRadius: 12,
                    marginBottom: 8,
                  }}
                >
                  <Text
                    style={{ color: 'white', fontSize: 12, fontWeight: '600' }}
                  >
                    POPULAR
                  </Text>
                </View>
              )}
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <Text style={{ fontSize: 32, fontWeight: 'bold', marginTop: 8 }}>
                {plan.price}
                <Text style={{ fontSize: 16, fontWeight: 'normal' }}>
                  /month
                </Text>
              </Text>
            </View>
          </CardHeader>
          <CardContent>
            <View style={{ gap: 8 }}>
              {plan.features.map((feature, featureIndex) => (
                <View
                  key={featureIndex}
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
                >
                  <Icon name={Check} color='#22c55e' size={16} />
                  <Text>{feature}</Text>
                </View>
              ))}
            </View>
          </CardContent>
          {/* <CardFooter>
            <Button
              variant={plan.popular ? 'default' : 'outline'}
              style={{ width: '100%' }}
            >
              Get Started
            </Button>
          </CardFooter> */}
        </Card>
      ))}
    </View>
  );
}
