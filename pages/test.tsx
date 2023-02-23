import type { NextPage } from "next";
import React from "react";

const Home: NextPage = () => {
  const Onboarding = () => {
    window.location = "demopaypal://onboarding-callback";
    //window.location = "https://p3-test.vercel.app/test";
  };

  return (
    <div>
      <div className="mt-3">
        <div>
          PayPal linking flow complete - Success !!
          <div>
            <button onClick={() => Onboarding()}>Continue to BISB APP </button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
