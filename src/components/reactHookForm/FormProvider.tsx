import { CSSProperties, ReactNode } from 'react';
import { FormProvider as Form, UseFormReturn } from 'react-hook-form';

interface IFormProviderProps {
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
  style?: CSSProperties;
}

export const FormProvider = ({ children, onSubmit, methods, style }: IFormProviderProps) => {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} style={{ width: '100%', ...style }}>
        {children}
      </form>
    </Form>
  );
};
