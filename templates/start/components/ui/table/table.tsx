import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from '../text';
import { useColor } from '@/hooks/useColor';

interface TableProps {
    headers: string[];
    data: string[][];
}

export const Table = ({ headers, data }: TableProps) => {
    const borderColor = useColor('border');
    const headerBg = useColor('secondary'); // or muted
    return (
        <ScrollView horizontal>
            <View style={[styles.container, { borderColor }]}>
                <View style={[styles.row, styles.header, { backgroundColor: headerBg, borderBottomColor: borderColor }]}>
                    {headers.map((header, i) => (
                        <View key={i} style={[styles.cell, { borderRightColor: borderColor }]}>
                            <Text style={{ fontWeight: '500' }}>{header}</Text>
                        </View>
                    ))}
                </View>
                {data.map((row, i) => (
                    <View key={i} style={[styles.row, { borderBottomColor: borderColor }]}>
                        {row.map((cell, j) => (
                            <View key={j} style={[styles.cell, { borderRightColor: borderColor }]}>
                                <Text>{cell}</Text>
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 8,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
    },
    header: {
        // backgroundColor handled dynamically
    },
    cell: {
        padding: 12,
        width: 100,
        borderRightWidth: 1,
    },
});
