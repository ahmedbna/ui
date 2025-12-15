import React, { createContext, useContext, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../text';
import { X } from 'lucide-react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColor } from '@/hooks/useColor';

interface ToastContextType {
    showToast: (message: string, type?: 'default' | 'success' | 'error') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast, setToast] = useState<{ message: string; type: string } | null>(null);
    const insets = useSafeAreaInsets();
    const bgColor = useColor('background');
    const borderColor = useColor('border');
    const textColor = useColor('foreground');

    const showToast = (message: string, type = 'default') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <Animated.View
                    entering={FadeInUp}
                    exiting={FadeOutUp}
                    style={[
                        styles.toast,
                        { top: insets.top + 10, backgroundColor: bgColor, borderColor: borderColor },
                        toast.type === 'error' && styles.error,
                        toast.type === 'success' && styles.success,
                    ]}
                >
                    <Text style={[styles.text, { color: toast.type === 'default' ? textColor : 'white' }]}>
                        {toast.message}
                    </Text>
                    <TouchableOpacity onPress={() => setToast(null)}>
                        <X size={16} color={toast.type === 'default' ? textColor : 'white'} />
                    </TouchableOpacity>
                </Animated.View>
            )}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within a ToastProvider');
    return context;
};

const styles = StyleSheet.create({
    toast: {
        position: 'absolute',
        left: 20,
        right: 20,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 9999,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    error: {
        backgroundColor: '#ef4444',
        borderWidth: 0,
    },
    success: {
        backgroundColor: '#22c55e',
        borderWidth: 0,
    },
    text: {
        fontWeight: '500',
    }
});
