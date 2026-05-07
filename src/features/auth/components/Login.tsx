import { SignIn } from "@clerk/react";

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <SignIn
        path="/login"
        routing="path"
        signUpUrl="/register"
        afterSignInUrl="/dashboard"
      />
    </div>
  );
};

export default Login;
