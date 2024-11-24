import { icons } from ".";

export const signupFields = [
    {
      label: "First Name",
      name: "firstName",
      placeholder: "Enter your name",
      icon: icons.person,
    },
    {
      label: "Last Name",
      name: "lastName",
      placeholder: "Enter your last name",
      icon: icons.person,
    },
    {
      label: "Email",
      name: "email",
      placeholder: "Enter your Email",
      icon: icons.email,
    },
    {
      label: "Password",
      name: "password",
      placeholder: "Enter your Password",
      icon: icons.lock,
      secureTextEntry: true,
    },
    {
      label: "Phone",
      name: "phone",
      placeholder: "Enter your Phone Number",
      icon: icons.indiaFlag,
      prefixText: "+91",
    },
    {
      label: "Adhaar Card Number",
      name: "adhaarCardNo",
      placeholder: "Enter your Adhaar Card Number",
      icon: icons.adhaar,
    },
  ]