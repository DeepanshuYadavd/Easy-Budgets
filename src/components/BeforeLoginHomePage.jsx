import { Form } from "react-router-dom";

// assets:
import illustration from "../assets/illustration.jpg";
const BeforeLoginHomePage = () => {
  return (
    <div className="intro">
      <div>
        <h1>
          Take control of <span className="accent">Your Money</span>
        </h1>
        <p>
          Personal budgeting is the secret to financial freedom.Start your
          journey today.
        </p>
        <Form method="post">
          <input
            required
            type="text"
            name="userName"
            placeholder="what is your name?"
            autoComplete="given-name"
            aria-label="Your Name"
          />
          <input type="hidden" name="_action" value="newUser" />
          <button type="submit" className="btn btn--dark p-2">
            <span>Create account</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
              />
            </svg>
          </button>
        </Form>
      </div>
      <img src={illustration} alt="person with money" width={600} />
    </div>
  );
};

export default BeforeLoginHomePage;
