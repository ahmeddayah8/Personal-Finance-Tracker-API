import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";

import { loginUser } from "@/lib/api/authApi";
import useAuthStore from "@/lib/store/authStore";
import { getErrorMessage } from "@/utils/errorUtils";

const Login = () => {
  const navigate = useNavigate();

  const setAuth = useAuthStore(
    (state) => state.setAuth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const mutation = useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      setAuth(data.user, data.token);

      navigate("/dashboard");
    },
  });

  const handleChange = (e) => {
    setFormData((previous) => ({
      ...previous,

      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">
            Welcome Back
          </CardTitle>

          <CardDescription>
            Login to manage your finances.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {mutation.isError && (
              <Alert variant="destructive">
                <AlertDescription>
                  {getErrorMessage(mutation.error)}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">
                Email
              </Label>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="ahmed@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                Password
              </Label>

              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending
                ? "Logging in..."
                : "Login"}
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary font-medium hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;