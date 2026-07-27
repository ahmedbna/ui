import { Text } from '@/components/ui/text';
import { Link as ERLink, Href } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Linking, Platform } from 'react-native';

type Props = Omit<ComponentProps<typeof ERLink>, 'href'> & {
  href: Href;
  asChild?: boolean;
  browser?: 'in-app' | 'external';
  children: React.ReactNode;
};

// Helper function to determine if URL is external
const isExternalUrl = (href: Href): boolean => {
  // If href is an object, it's always internal navigation
  if (typeof href === 'object') {
    return false;
  }

  // Check if string href is external
  return (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('sms:') ||
    href.startsWith('whatsapp:') ||
    href.startsWith('ftp://') ||
    href.startsWith('file://')
  );
};

// Helper function to determine if URL should use native app (not browser)
const isNativeAppUrl = (href: string): boolean => {
  return (
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('sms:') ||
    href.startsWith('whatsapp:')
  );
};

// Helper function to convert href to string for external links
const getHrefString = (href: Href): string => {
  if (typeof href === 'string') {
    return href;
  }

  // For object hrefs, we shouldn't convert to string for external use
  // This should only be called for external URLs (which are always strings)
  throw new Error('Cannot convert object href to string for external use');
};

export function Link({
  href,
  asChild = false,
  children,
  browser = 'in-app',
  ...rest
}: Props) {
  const isExternal = isExternalUrl(href);

  const handlePress = async (event: any) => {
    if (isExternal) {
      // Always prevent default for external links
      event.preventDefault();

      const hrefString = getHrefString(href);

      if (Platform.OS !== 'web') {
        // Check if this is a native app URL (email, phone, etc.)
        if (isNativeAppUrl(hrefString)) {
          // Always use Linking.openURL for native app URLs
          try {
            const canOpen = await Linking.canOpenURL(hrefString);
            if (canOpen) {
              await Linking.openURL(hrefString);
            } else {
              console.warn(`Cannot open URL: ${hrefString}`);
              // Optionally show an alert to the user
            }
          } catch (error) {
            console.error('Error opening URL:', error);
          }
        } else {
          // For HTTP/HTTPS URLs, use browser preference
          if (browser === 'external') {
            // Open the link in external browser
            await Linking.openURL(hrefString);
          } else {
            // Open the link in in-app browser (default)
            try {
              await openBrowserAsync(hrefString);
            } catch (error) {
              console.error('Error opening browser:', error);
              // Fallback to external browser
              await Linking.openURL(hrefString);
            }
          }
        }
      } else {
        // On web platform
        if (isNativeAppUrl(hrefString)) {
          // For web, directly navigate to the URL (browser will handle it)
          window.location.href = hrefString;
        } else {
          // For HTTP/HTTPS URLs, open in new tab
          window.open(hrefString, '_blank');
        }
      }
    }
    // For internal navigation, don't prevent default - let ERLink handle it
  };

  // For external links, use a custom approach to avoid conflicts
  if (isExternal) {
    return (
      <ERLink asChild={asChild} href={href} onPress={handlePress} {...rest}>
        {typeof children === 'string' ? (
          <Text variant='link'>{children}</Text>
        ) : (
          children
        )}
      </ERLink>
    );
  }

  // For internal links, use ERLink directly without custom onPress
  return (
    <ERLink
      asChild={typeof children === 'string' ? false : true}
      href={href}
      {...rest}
    >
      {typeof children === 'string' ? (
        <Text variant='link'>{children}</Text>
      ) : (
        children
      )}
    </ERLink>
  );
}
