import { ChangeNameRequest, ChangeNameRequestSchema } from '../model/schemas';
import useChangeName from '../model/use-change-name';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useKeyboard } from '~/shared/lib';
import { Button, ButtonText } from '~/shared/ui/button';
import { Input } from '~/shared/ui/input';
import { CustomText } from '~/shared/ui/text';
import { showToast } from '~/shared/ui/toast';

interface ChangeNameProps {
  name: string;
}

export default function ChangeName({ name }: ChangeNameProps) {
  const router = useRouter();

  const { control, handleSubmit } = useForm<ChangeNameRequest>({
    defaultValues: {
      name,
    },
    resolver: valibotResolver(ChangeNameRequestSchema),
    mode: 'onSubmit',
  });

  const { mutateAsync: changeName } = useChangeName({
    onSuccess: () => {
      showToast({
        text1: 'Name changed successfully',
        type: 'success',
      });
      router.replace('/(authorized)/settings');
    },
    onError: (error) => {
      showToast({
        text1: error.message,
        type: 'error',
      });
    },
  });

  const { keyboardHeight, dismissKeyboard } = useKeyboard();

  const onSubmit = handleSubmit(
    async (data) => {
      dismissKeyboard();
      await changeName(data);
    },
    (errors) => {
      dismissKeyboard();
      showToast({
        text1: errors.name?.message ?? 'Invalid name',
        type: 'error',
      });
    }
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <CustomText style={styles.text}>Name</CustomText>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <Input
              placeholder="Enter your name"
              maxLength={20}
              showMaxLength
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
      </View>
      <View style={[styles.footer, { marginBottom: keyboardHeight }]}>
        <Button
          variant="solid-light"
          size="xl"
          style={styles.button}
          onPress={onSubmit}>
          <ButtonText size="md" style={styles.buttonText}>
            Save
          </ButtonText>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    position: 'relative',
    flex: 1,
  },
  content: {
    width: '100%',
    paddingHorizontal: 20,
    rowGap: 8,
  },
  text: {
    color: 'white',
    fontSize: theme.fontSize['md'],
  },
  footer: {
    position: 'absolute',
    bottom: 32,
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: theme.fontSize['md'],
    fontWeight: theme.fontWeight['semibold'],
  },
}));
