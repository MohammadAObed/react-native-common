import { ScrollViewProps, ViewStyle } from 'react-native';

export type ScrollContainerProps = ScrollViewProps & {
  maxHeight?: ViewStyle['maxHeight']
};
