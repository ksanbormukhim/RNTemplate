import React from 'react';
import { Button, ButtonProps, View, ViewProps } from 'react-native';

type StyledButtonProps = ButtonProps & ViewProps;

const StyledButton: React.FC<StyledButtonProps> = ({
  title,
  color,
  onPress,
  disabled,
  nextFocusDown,
  nextFocusForward,
  nextFocusLeft,
  nextFocusRight,
  nextFocusUp,
  touchSoundDisabled,
  ...viewProps
}) => {
  return (
    <View {...viewProps} pointerEvents="box-none">
      <Button
        title={title}
        color={color}
        onPress={onPress}
        disabled={disabled}
        nextFocusDown={nextFocusDown}
        nextFocusForward={nextFocusForward}
        nextFocusLeft={nextFocusLeft}
        nextFocusRight={nextFocusRight}
        nextFocusUp={nextFocusUp}
        touchSoundDisabled={touchSoundDisabled}
      />
    </View>
  );
};

export default StyledButton;

// The pointerEvents property in React Native determines how touch gestures interact with an element and its children. Here’s what each option does:

//     'box-none'
//         The element itself does not block touch events, but its children can receive them.
//         Useful when the parent is just a wrapper and shouldn't interfere with interactions on its children.

//     'none'
//         Neither the element nor its children receive touch events.
//         The entire subtree becomes non-interactive, allowing touches to pass through to elements below.

//     'box-only'
//         The element itself receives touch events, but its children do not.
//         Useful for cases where you want the parent to handle gestures (e.g., a modal background that dismisses on tap) but not its children.

//     'auto'
//         The default behavior.
//         Both the element and its children receive touch events normally.

//     undefined
//         Same as 'auto', meaning it behaves as if pointerEvents were not set.
