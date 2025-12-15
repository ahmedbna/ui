import { View } from 'react-native';
import { Input } from '../input';
import { Search } from 'lucide-react-native';

interface SearchBarProps {
    value?: string;
    onChangeText?: (text: string) => void;
    placeholder?: string;
}

export const SearchBar = ({ value, onChangeText, placeholder = "Search..." }: SearchBarProps) => {
    return (
        <Input
            icon={Search}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
        />
    );
};
