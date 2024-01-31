import React from "react";
import { MotionProps, motion } from "framer-motion";

export interface useFormProps {}

type FormProps = React.HTMLAttributes<HTMLDivElement> & MotionProps;

export function FormContainer({ children, ...props }: FormProps) {
  return (
    <motion.div transition={{ duration: 0.25 }} {...props}>
      {children}
    </motion.div>
  );
}

const FormItem = ({ children, ...props }: FormProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.25 } }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const Form = {
  Container: FormContainer,
  Item: FormItem,
};
