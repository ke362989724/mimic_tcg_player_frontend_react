import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type Props = {};

const CreateAccountSuccess = (props: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log("location.state?.from", location.state?.from);

  useEffect(() => {
    if (location.state?.from !== "/sign-up") {
      navigate("/", { replace: true });
    }
  }, [location.state?.from, navigate]);

  return (
    <div className="my-40 flex flex-col shadow-2xl">
      <div className="space-y-10 p-10 md:space-y-20">
        <div className="title text-center">
          Your account has been successfully created. Please verify it by
          checking your email.
        </div>
        <div className="flex justify-center">
          <Link to="/" replace={true}>
            <Button className="cursor-pointer">Back to Homepage</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountSuccess;
