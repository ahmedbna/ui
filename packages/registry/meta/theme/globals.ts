// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../../schema.js';

export const globalsMeta: ComponentMeta = {
  "name": "globals",
  "usage": {
    "import": "import { HEIGHT, FONT_SIZE, BORDER_RADIUS, CORNERS } from '@/theme/globals';",
    "snippet": "export function StyledButton({ title, onPress }) {\n  return (\n    <TouchableOpacity\n      style={{\n        height: HEIGHT,\n        backgroundColor: '#007AFF',\n        borderRadius: BORDER_RADIUS,\n        justifyContent: 'center',\n        alignItems: 'center',\n        paddingHorizontal: 16,\n      }}\n      onPress={onPress}\n    >\n      <Text\n        style={{\n          color: 'white',\n          fontSize: FONT_SIZE,\n          fontWeight: '600',\n        }}\n      >\n        {title}\n      </Text>\n    </TouchableOpacity>\n  );\n}"
  }
};
