"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { useLoginSchema } from "@/features/authentication/lib/zodClient";
import { RegisterPage } from "./RegisterPage";

export const LoginPage: React.FC = () => {
  const { t } = useTranslation(
    "features.authentication.components.LoginDialog"
  );
  const { loginMutation } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const loginSchema = useLoginSchema();
  type TLoginForm = z.infer<typeof loginSchema>;

  // React Hook Form
  const form = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: TLoginForm) => {
    setLoading(true);
    try {
      const res = await loginMutation.mutateAsync({
        ...data,
      });
      // Handle successful login - the page will automatically redirect
      // due to the session change
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Show register page if user clicked register
  if (showRegister) {
    return <RegisterPage onBackToLogin={() => setShowRegister(false)} />;
  }

  return (
    <div className="min-h-[100%] flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md w-full mx-4">
        {/* Login Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {t("Login")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back! Please sign in to your account.
            </p>
          </div>

          {/* Login Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
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

              {/* REMEMBER ME & FORGOT PASSWORD */}
              <div className="flex items-center justify-between">
                <Checkbox
                  label={t("Remember")}
                  name="checkbox"
                  className="border-2 border-muted rounded"
                />
                <Button
                  variant="link"
                  className="text-primary hover:text-primary/80 font-medium p-0 h-auto"
                  onClick={() => {
                    // Handle forgot password
                    console.log("Forgot password clicked");
                  }}
                >
                  {t("Forgot?")}
                </Button>
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


          {/* Register Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600 dark:text-gray-400">
              {t("No account?")}{" "}
                <Button
                  variant="link"
                  className="text-primary hover:text-primary/80 font-medium p-0 h-auto"
                  onClick={() => setShowRegister(true)}
                >
                  {t("Register")}
                </Button>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
