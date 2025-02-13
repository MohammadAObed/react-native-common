import { Text } from 'react-native-paper';
import { Path, Svg, type SvgProps } from 'react-native-svg';
import {
  HORIZONTAL_LINE_HEIGHT,
  SVG_SIZE,
  SVG_SMALL_SIZE,
  SvgShape,
  VERTICAL_LINE_WIDTH,
} from '../constants';
import { useStyles } from '../hooks';
import { getSvgCustomStyles } from '../styles';
import type { SvgCustomProps } from '../types/components';

const SvgCustom = ({
  color,
  shape,
  isSmall,
  strokeWidth = 0,
}: SvgCustomProps) => {
  const { styles } = useStyles(getSvgCustomStyles);

  if (!color) {
    color = styles.svg.color;
  }

  const size = isSmall ? SVG_SMALL_SIZE : SVG_SIZE;

  const common: SvgProps = {
    stroke: styles.stroke.color,
  };

  const props: SvgProps = {
    ...common,
    strokeWidth,
    height: size,
    width: size,
  };

  const propsLines: SvgProps = {
    ...common,
    strokeWidth: strokeWidth - 1,
  };

  if (shape === SvgShape.CIRCLE) {
    const path = isSmall
      ? 'M25 0 A25 25 0 1 1 25 50 A25 25 0 1 1 25 0 Z'
      : 'M10,75 C10,37.5 37.5,10 75,10 C112.5,10 140,37.5 140,75 C140,112.5 112.5,140 75,140 C37.5,140 10,112.5 10,75 Z';
    return (
      <Svg {...props}>
        <Path d={path} fill={color} />
      </Svg>
    );
  }

  if (shape === SvgShape.TRIANGLE) {
    const path = isSmall ? 'M25 0 L0 50 L50 50 Z' : 'M75,10 L140,140 L10,140 Z';
    return (
      <Svg {...props}>
        <Path d={path} fill={color} />
      </Svg>
    );
  }
  if (shape === SvgShape.SQUARE) {
    const path = isSmall
      ? 'M0 0 L0 50 L50 50 L50 0 Z'
      : 'M10,10 L140,10 L140,140 L10,140 Z';
    return (
      //<Svg height={size - 10} width={size - 10} strokeWidth={strokeWidth} stroke={styles.stroke.color} translateX={-5} translateY={-5}>
      <Svg {...props}>
        <Path d={path} fill={color} />
      </Svg>
    );
  }
  if (shape === SvgShape.VERTICAL_LINE) {
    const path = isSmall ? 'M 5 5 H 10 V 150 H 5 Z' : 'M 8 5 H 15 V 150 H 8 Z';
    return (
      <Svg height={size} width={VERTICAL_LINE_WIDTH} {...propsLines}>
        <Path d={path} fill={color} />
      </Svg>
    );
  }
  if (shape === SvgShape.HORIZONTAL_LINE) {
    const path = isSmall
      ? 'M 0 6 L 150 6 L 150 11 L 0 11 Z'
      : 'M 0 2 L 150 2 L 150 10 L 0 10 Z';
    return (
      <Svg height={HORIZONTAL_LINE_HEIGHT} width={size} {...propsLines}>
        <Path d={path} fill={color} />
      </Svg>
    );
  }

  return <Text style={styles.unknownText}>?</Text>;
};

export default SvgCustom;

// const shapes = ({ scaleX, scaleY, color, strokeWidth = 0 }: TShapes) => ({
//   [Shape.CIRCLE]: (
//     <Svg height="250" width="250" scaleX={scaleX} scaleY={scaleY} stroke="black" strokeWidth={strokeWidth}>
//       <Path d="M125 5 A100 100 0 1 1 125 245 A100 100 0 1 1 125 5" fill={color} />
//     </Svg>
//   ),
//   [Shape.TRIANGLE]: (
//     <Svg height="250" width="250" scaleX={scaleX} scaleY={scaleY} stroke="black" strokeWidth={strokeWidth}>
//       <Path d="M125 5 L230 245 L20 245 Z" fill={color} />
//     </Svg>
//   ),
//   [Shape.SQUARE]: (
//     <Svg height="250" width="250" scaleX={scaleX} scaleY={scaleY} stroke="black" strokeWidth={strokeWidth}>
//       <Path d="M20 20 L230 20 L230 230 L20 230 Z" fill={color} />
//     </Svg>
//   ),
//   [Shape.VERTICAL_LINE]: (
//     <Svg height="250" width="30" scaleX={scaleX} scaleY={scaleY} stroke="black" strokeWidth={strokeWidth}>
//       <Path d="M5 5 V245 H25 V5 H15 Z" fill={color} />
//     </Svg>
//   ),
//   [Shape.HORIZONTAL_LINE]: (
//     <Svg height="30" width="250" scaleX={scaleX} scaleY={scaleY} stroke="black" strokeWidth={strokeWidth}>
//       <Path d="M5 5 H245 V25 H5 V15 Z" fill={color} />
//     </Svg>
//   ),
// });

// const shapesSmall = ({ color }: TShapesSmall) => ({
//   [Shape.CIRCLE]: (
//     <Svg height="50" width="50">
//       <Path d="M25 0 A25 25 0 1 1 24.999 50 A25 25 0 1 1 25 0 Z" fill={color} />
//     </Svg>
//   ),
//   [Shape.TRIANGLE]: (
//     <Svg height="50" width="50">
//       <Path d="M25 0 L0 50 L50 50 Z" fill={color} />
//     </Svg>
//   ),
//   [Shape.SQUARE]: (
//     <Svg height="50" width="50">
//       <Path d="M0 0 L0 50 L50 50 L50 0 Z" fill={color} />
//     </Svg>
//   ),
//   [Shape.VERTICAL_LINE]: (
//     <Svg height="50" width="15">
//       <Path d="M7.5 5 V45" stroke={color} strokeWidth="5" />
//     </Svg>
//   ),
//   [Shape.HORIZONTAL_LINE]: (
//     <Svg height="15" width="50">
//       <Path d="M5 7.5 H45" stroke={color} strokeWidth="5" />
//     </Svg>
//   ),
// });

// const SvgC = ({ shape, isSmall = false, color, size = 1, width, height, strokeWidth }: TShapesC) => {
//   width = (width ?? 50) / 50;
//   height = (height ?? 50) / 50;

//   return isSmall
//     ? shapesSmall({ scaleX: size * width, scaleY: size * height, color: color })[shape]
//     : shapes({ scaleX: size * width, scaleY: size * height, color: color, strokeWidth: strokeWidth })[shape];
// };
