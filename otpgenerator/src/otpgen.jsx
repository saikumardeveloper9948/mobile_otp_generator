

import React, { useState, useEffect } from "react";
import { auth } from "./firebase/firebasesetup";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

const OTPLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);

  useEffect(() => {
    let verifier = null;
    let timeoutId = null;

    const initRecaptcha = async () => {
      try {
        
        const container = document.getElementById('recaptcha');
        if (!container) {
          console.log("Waiting for container...");
          timeoutId = setTimeout(initRecaptcha, 1000);
          return;
        }

       
        verifier = new RecaptchaVerifier(auth, 'recaptcha', {
          size: 'invisible',
          callback: (response) => {
            console.log('reCAPTCHA solved:', response);
          },
          'expired-callback': () => {
            console.log('reCAPTCHA expired');
          }
        });

        await verifier.render();
        setRecaptchaVerifier(verifier);
        setError('');
      } catch (err) {
        console.error("Error creating reCAPTCHA:", err);
        setError("Failed to initialize reCAPTCHA. Please refresh the page.");
      }
    };

  
    timeoutId = setTimeout(initRecaptcha, 1000);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (verifier) {
        try {
          verifier.clear();
        } catch (err) {
          console.error("Error clearing reCAPTCHA:", err);
        }
      }
    };
  }, []); 

  const handleSendOTP = async () => {
    if (!recaptchaVerifier) {
      setError("reCAPTCHA not initialized. Please refresh the page.");
      return;
    }

    try {
      const phoneRegex = /^\+[1-9]\d{1,14}$/;
      const formattedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
      
      if (!phoneRegex.test(formattedPhoneNumber)) {
        setError("Please enter a valid phone number with country code (e.g. +1234567890)");
        return;
      }

      setMessage("Sending OTP...");
      setLoading(true);
      setError("");

      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhoneNumber,
        recaptchaVerifier
      );
      
      setConfirmationResult(confirmation);
      setMessage("OTP sent successfully!");
    } catch (err) {
      console.error('Error:', err);
      switch (err.code) {
        case 'auth/billing-not-enabled':
          setError('This feature requires Firebase Blaze plan. Please try again later.');
          break;
        case 'auth/invalid-phone-number':
          setError('Please enter a valid phone number with country code (e.g. +1234567890)');
          break;
        case 'auth/quota-exceeded':
          setError('SMS quota exceeded. Please try again later.');
          break;
        case 'auth/too-many-requests':
          setError('Too many requests. Please try again later.');
          break;
        case 'auth/operation-not-allowed':
          setError('Phone authentication is not enabled. Please contact support.');
          break;
        case 'auth/internal-error':
          setError('An internal error occurred. Please try again.');
         
          break;
        default:
          setError(err.message || "Failed to send OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length < 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    if (!confirmationResult) {
      setError("Please request OTP first");
      return;
    }

    setLoading(true);
    try {
      const result = await confirmationResult.confirm(otp);
      setMessage("OTP verified successfully!");
      setError("");
      setLoading(false);
      console.log("User signed in:", result.user);
    } catch (err) {
      setError(`Failed to verify OTP: ${err.message}`);
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Phone Number Login</h1>
      <div>
        <label>Phone Number:</label>
        <input
          type="tel"
          placeholder="Enter phone number (with country code)"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          disabled={loading}
        />
        <button onClick={handleSendOTP} disabled={loading || !recaptchaVerifier}>
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </div>

      <div id="recaptcha"></div>

      <div>
        <label>OTP:</label>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
          disabled={loading}
          maxLength={6}
        />
        <button onClick={handleVerifyOTP} disabled={loading || !confirmationResult}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default OTPLogin;