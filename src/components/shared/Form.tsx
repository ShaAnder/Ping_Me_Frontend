/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { useFormik, FormikErrors } from "formik";
import { useTheme } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

type Field = {
  name: string;
  label: string;
  type: "text" | "password" | "email" | "file" | "checkbox" | "select";
  accept?: string; // e.g., "image/*"
  options?: { label: string; value: string }[]; // for select
  required?: boolean; // for validation
  defaultImage?: string; // for file/image preview fallback
};

interface FormProps<T> {
  fields: Field[];
  initialValues: T;
  validate: (values: T) => FormikErrors<T>;
  onSubmit: (values: T, helpers: any) => void | Promise<void>;
  submitLabel: string;
  loading?: boolean;
  footer?: React.ReactNode;
}

function Form<T extends Record<string, any>>({
  fields,
  initialValues,
  validate,
  onSubmit,
  submitLabel,
  loading,
  footer,
}: FormProps<T>) {
  const theme = useTheme();
  const [previews, setPreviews] = useState<Record<string, string | null>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const formik = useFormik<T>({
    initialValues,
    validate,
    onSubmit,
  });

  // Helper: open file dialog for a specific field
  const handleImageClick = (fieldName: string) => {
    fileInputRefs.current[fieldName]?.click();
  };

  // Helper: handle file change and preview
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const file = e.currentTarget.files?.[0] || null;
    formik.setFieldValue(fieldName, file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviews((prev) => ({
          ...prev,
          [fieldName]: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setPreviews((prev) => ({
        ...prev,
        [fieldName]: null,
      }));
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      {fields.map((field) => (
        <Box sx={{ mb: 2 }} key={field.name}>
          <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
            {field.label}
          </Typography>
          {field.type === "file" ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <input
                ref={(el) => {
                  fileInputRefs.current[field.name] = el;
                }}
                id={field.name}
                name={field.name}
                type="file"
                accept={field.accept}
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e, field.name)}
              />
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "#eee",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  overflow: "hidden",
                  border: "2px solid #ccc",
                }}
                onClick={() => handleImageClick(field.name)}
              >
                {previews[field.name] ? (
                  <Avatar
                    src={previews[field.name] as string}
                    alt="preview"
                    sx={{ width: 80, height: 80 }}
                  />
                ) : field.defaultImage ? (
                  <Avatar
                    src={field.defaultImage}
                    alt="default"
                    sx={{ width: 80, height: 80 }}
                  />
                ) : (
                  <ImageIcon sx={{ fontSize: 40, color: "#aaa" }} />
                )}
              </Box>
            </Box>
          ) : (
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
          )}
          {formik.errors[field.name] && (
            <Typography color="error" variant="caption">
              {formik.errors[field.name] as string}
            </Typography>
          )}
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

export type { Field };

export default Form;
