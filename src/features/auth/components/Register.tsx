import { SignUp } from "@clerk/react";

const Register = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <SignUp
        path="/register"
        routing="path"
        signInUrl="/login"
        afterSignUpUrl="/dashboard"
      />
    </div>
  );
};

export default Register;
