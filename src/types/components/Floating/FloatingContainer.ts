import type { SafeAreaViewProps } from 'react-native-safe-area-context';

export type FloatingContainerProps = Omit<SafeAreaViewProps, 'mode'> & {
    mode?: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'middleLeft' | 'middleCenter' | 'middleRight'
}
