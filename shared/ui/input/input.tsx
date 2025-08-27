import { inputStyles } from './input.styles';
import { useState } from 'react';
import { Text, TextInput, View, type TextInputProps } from 'react-native';
import { COLOR_TOKEN } from '~/theme';

interface InputProps extends TextInputProps {
  isError?: boolean;
  description?: string;
  showMaxLength?: boolean;
}

// ONLY CONTROLLED INPUT
export default function Input({
  placeholder = 'Enter text',
  description,
  showMaxLength = false,
  isError = false,
  editable = true,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  inputStyles.useVariants({
    isFocused,
    isError,
    isDisabled: !editable,
  });

  return (
    <View style={inputStyles.container}>
      <TextInput
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={inputStyles.root}
        placeholder={placeholder}
        placeholderTextColor={COLOR_TOKEN['gray-5']}
        editable={editable}
        {...props}
      />
      <Text style={inputStyles.description}>{description}</Text>
      {showMaxLength && (
        <Text style={inputStyles.count}>
          {props.value ? props.value.length : 0}/{props.maxLength}
        </Text>
      )}
    </View>
  );
}
