/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useFormik, FormikErrors } from "formik";
import { useTheme } from "@mui/material";

type Field = {
  name: string;
  label: string;
  type: string;
};

interface UserFormProps<T> {
  fields: Field[];
  initialValues: T;
  validate: (values: T) => FormikErrors<T>;
  onSubmit: (values: T, helpers: any) => void | Promise<void>;
  submitLabel: string;
  loading?: boolean;
  footer?: React.ReactNode;
}

function UserForm<T extends Record<string, any>>({
  fields,
  initialValues,
  validate,
  onSubmit,
  submitLabel,
  loading,
  footer,
}: UserFormProps<T>) {
  const formik = useFormik<T>({
    initialValues,
    validate,
    onSubmit,
  });

  const theme = useTheme();

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      {fields.map((field) => (
        <Box sx={{ mb: 2 }} key={field.name}>
          <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
            {field.label}
          </Typography>
          <TextField
            id={field.name}
            name={field.name}
            type={field.type}
            size="small"
            fullWidth
            value={formik.values[field.name]}
            onChange={formik.handleChange}
            error={Boolean(formik.errors[field.name])}
            helperText={formik.errors[field.name] as string | undefined}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "background.default",
              },
              "& input:-webkit-autofill": {
                WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.default} inset`,
                WebkitTextFillColor: theme.palette.text.primary,
                caretColor: theme.palette.text.primary,
              },
            }}
          />
        </Box>
      ))}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="medium"
        disabled={formik.isSubmitting || loading}
        sx={{
          py: 1.5,
          fontSize: 18,
          fontWeight: 700,
          borderRadius: 2,
          mb: 1.5,
          textTransform: "none",
        }}
      >
        {formik.isSubmitting || loading ? (
          <CircularProgress size={24} />
        ) : (
          submitLabel
        )}
      </Button>
      {footer}
    </form>
  );
}

export default UserForm;
