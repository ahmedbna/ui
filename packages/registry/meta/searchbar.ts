// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const searchbarMeta: ComponentMeta = {
  name: 'searchbar',
  usage: {
    import:
      "import { SearchBar, SearchBarWithSuggestions } from '@/components/ui/searchbar';",
    snippet:
      "<SearchBar\n  placeholder='Search for anything...'\n  onSearch={(query) => console.log('Searching for:', query)}\n  loading={false}\n/>",
  },
  types: [
    {
      name: 'SearchBar',
      description:
        'The main search input component with debouncing and customization options. All other `TextInputProps` are also supported.',
      props: [
        {
          name: 'loading',
          type: 'boolean',
          default: '`false`',
          description: 'Shows loading indicator when true.',
        },
        {
          name: 'onSearch',
          type: '(query: string) => void',
          description: 'Callback fired when search is triggered (debounced).',
        },
        {
          name: 'onClear',
          type: '() => void',
          description: 'Callback fired when clear button is pressed.',
        },
        {
          name: 'showClearButton',
          type: 'boolean',
          default: '`true`',
          description: 'Whether to show the clear button when text is present.',
        },
        {
          name: 'leftIcon',
          type: 'ReactNode',
          default: 'Search icon',
          description: 'Custom left icon component.',
        },
        {
          name: 'rightIcon',
          type: 'ReactNode',
          description: 'Custom right icon component.',
        },
        {
          name: 'containerStyle',
          type: 'ViewStyle | ViewStyle[]',
          description: 'Additional styles for the container.',
        },
        {
          name: 'inputStyle',
          type: 'TextStyle | TextStyle[]',
          description: 'Additional styles for the text input.',
        },
        {
          name: 'debounceMs',
          type: 'number',
          default: '`300`',
          description: 'Debounce delay in milliseconds for search callbacks.',
        },
        {
          name: 'placeholder',
          type: 'string',
          default: "'Search...'",
          description: 'Placeholder text for the input.',
        },
        {
          name: 'value',
          type: 'string',
          description: 'Controlled value of the input.',
        },
        {
          name: 'onChangeText',
          type: '(text: string) => void',
          description: 'Callback fired when text changes.',
        },
      ],
    },
    {
      name: 'SearchBarWithSuggestions',
      description:
        'An enhanced search bar with dropdown suggestions functionality. All `SearchBar` props are also supported.',
      props: [
        {
          name: 'suggestions',
          type: 'string[]',
          default: '`[]`',
          description: 'Array of suggestion strings to display.',
        },
        {
          name: 'onSuggestionPress',
          type: '(suggestion: string) => void',
          description: 'Callback fired when a suggestion is selected.',
        },
        {
          name: 'maxSuggestions',
          type: 'number',
          default: '`5`',
          description: 'Maximum number of suggestions to display.',
        },
        {
          name: 'showSuggestions',
          type: 'boolean',
          default: '`true`',
          description: 'Whether to show the suggestions dropdown.',
        },
      ],
    },
  ],
  accessibility: {
    summary: 'The SearchBar component follows accessibility guidelines:',
    items: [
      'Proper focus management and keyboard navigation',
      'Screen reader compatible with appropriate labels',
      'Clear button is properly labeled for assistive technologies',
      'Suggestions dropdown supports keyboard navigation',
      'High contrast support for better visibility',
    ],
  },
};
