import { Button } from '../button';
import { useActionSheet } from '@expo/react-native-action-sheet';

interface ActionSheetProps {
    options: string[];
    onSelect: (index: number) => void;
    triggerText?: string;
    cancelButtonIndex?: number;
    destructiveButtonIndex?: number;
}

export const ActionSheetTrigger = ({
    options,
    onSelect,
    triggerText = "Open Action Sheet",
    cancelButtonIndex,
    destructiveButtonIndex
}: ActionSheetProps) => {
    const { showActionSheetWithOptions } = useActionSheet();

    const onPress = () => {
        showActionSheetWithOptions({
            options,
            cancelButtonIndex,
            destructiveButtonIndex,
        }, (selectedIndex?: number) => {
            if (selectedIndex !== undefined) {
                onSelect(selectedIndex);
            }
        });
    };

    return (
        <Button onPress={onPress} variant="outline">
            {triggerText}
        </Button>
    );
};
