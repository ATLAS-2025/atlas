"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Trans } from "react-i18next";
import { useTranslation } from "@/i18n";
import { Loading } from "@/shared/components/svg/Loading";
import { Checkbox } from "@/shared/components/Checkbox";
import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/components/ui/form";
import { FloatingLabelInput } from "@/shared/components/FloatingLabelInput";
import { FloatingLabelPasswordInput } from "@/shared/components/FloatingLabelPasswordInput";
import { useAuth } from "@/features/authentication/hooks/useAuth";
import { useRegisterSchema } from "@/features/authentication/lib/zodClient";

interface IRegisterPageProps {
  onBackToLogin: () => void;
}

export const RegisterPage: React.FC<IRegisterPageProps> = ({ onBackToLogin }) => {
  const { t } = useTranslation(
    "features.authentication.components.RegisterDialog"
  );
  const { registerMutation } = useAuth();

  const [loading, setLoading] = useState(false);

  const registerSchema = useRegisterSchema();
  type TRegisterForm = z.infer<typeof registerSchema>;

  // React Hook Form
  const form = useForm<TRegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirm: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: TRegisterForm) => {
    setLoading(true);
    try {
      const res = await registerMutation.mutateAsync({
        ...data,
      });

      if (res?.ok) {
        // Handle successful registration - the page will automatically redirect
        // due to the session change
      }
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100%] flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md w-full mx-4">
        {/* Register Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {t("Register")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create your account to get started.
            </p>
          </div>

          {/* Register Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {/* USERNAME FIELD */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        {...field}
                        type="text"
                        name="username"
                        label={t("Lastname")}
                        value={field.value}
                        onChange={e => form.setValue("username", e.target.value)}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* EMAIL FIELD */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        {...field}
                        type="email"
                        name="email"
                        label={t("Email")}
                        value={field.value}
                        onChange={e => form.setValue("email", e.target.value)}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* PASSWORD FIELD */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelPasswordInput
                        {...field}
                        name="password"
                        label={t("Password")}
                        value={field.value}
                        onChange={e => form.setValue("password", e.target.value)}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* CONFIRM PASSWORD FIELD */}
              <FormField
                control={form.control}
                name="confirm"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelPasswordInput
                        {...field}
                        name="confirm"
                        label={t("Confirm password")}
                        value={field.value}
                        onChange={e => form.setValue("confirm", e.target.value)}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* TERMS AGREEMENT */}
              <div className="flex items-center">
                <Checkbox
                  label={
                    <Trans i18nKey="buttons.agree">
                      I agree to the{" "}
                      <a href="/terms_and_conditions" className="text-primary hover:text-primary/80">
                        Processing of personal data
                      </a>
                    </Trans>
                  }
                  name="checkbox"
                  className="border-2 border-muted rounded"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-lg bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium transition-colors duration-200"
              >
                {loading ? (
                  <Loading className="w-5 h-5 mx-auto" />
                ) : (
                  t("Submit")
                )}
              </Button>
            </form>
          </Form>

          {/* LOGIN LINK */}
          <div className="text-center mt-6">
            <p className="text-gray-600 dark:text-gray-400">
              {t("Already registered?")}{" "}
              <Button
                variant="link"
                className="text-primary hover:text-primary/80 font-medium p-0 h-auto"
                onClick={onBackToLogin}
              >
                {t("Login")}
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
