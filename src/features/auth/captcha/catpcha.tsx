import React from "react";
import ReactDOM from "react-dom";
import ReCAPTCHA from "react-google-recaptcha";

function onChange(value:any) {
    // what happens when
    console.log("captcha value:", value);
}

ReactDOM.render(
    <ReCAPTCHA
        sitekey="The client site key from the Google reCAPTCHA admin console"
        onChange={onChange}
    />,
    document.body
)