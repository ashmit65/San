"use client";
import Head from "next/head";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

// Safe Supabase client initialization
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase =
  typeof window !== "undefined" && supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

const noMessages = [
  "  ",
  "Are you sure? 🥺",
  "Please reconsider 🙏",
  "It meant a lot to me 😢",
  "I still believe in us 💔",
  "Even one more chance? 😞",
  "Please Pretty Sanjana",
];

function ApologyStep({ onForgive, onReject }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-4 max-w-md mx-auto px-4"
    >
      <h1 className="text-3xl sm:text-4xl font-bold text-rose-600">
        I'm Truly Sorry...
      </h1>
      <p className="text-sm sm:text-base text-gray-700">
        I know I hurt you. I never meant to. If I could go back and fix it, I
        would.
      </p>
      <p className="text-xs sm:text-sm text-gray-600">Do you forgive me?</p>
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
        <button
          onClick={onForgive}
          className="w-full sm:w-auto bg-rose-400 text-white px-8 py-3 rounded-2xl shadow hover:bg-rose-500 text-base"
        >
          Yes
        </button>
        <button
          onClick={onReject}
          className="w-full sm:w-auto bg-gray-300 text-gray-800 px-8 py-3 rounded-2xl shadow hover:bg-gray-400 text-base"
        >
          No
        </button>
      </div>
    </motion.div>
  );
}

function ForgivenStep({ noClickCount, yesButtonScale, onFriendYes, onFriendNo }) {
  const scale = Math.min(yesButtonScale, 2);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 max-w-md mx-auto px-4"
    >
      <h1 className="text-2xl sm:text-3xl font-semibold text-rose-600">
        Thank You for Forgiving Me
      </h1>
      <p className="text-sm sm:text-base text-gray-700">
        Can we still be friends like before?
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
        <button
          onClick={onFriendYes}
          style={{
            transform: `scale(${scale})`,
            transition: "transform 0.3s ease",
          }}
          className="w-full sm:w-auto bg-green-400 text-white px-8 py-3 rounded-2xl shadow hover:bg-green-500 text-base"
        >
          Yes
        </button>
        <button
          onClick={onFriendNo}
          className="w-full sm:w-auto bg-gray-300 text-gray-800 px-8 py-3 rounded-2xl shadow hover:bg-gray-400 text-base"
        >
          No
        </button>
      </div>
      <p className="text-xs sm:text-sm text-rose-500 mt-2 min-h-[1.5rem]">
        {noMessages[noClickCount] || "I'm still here, hoping... 💗"}
      </p>
    </motion.div>
  );
}

function FriendYesStep() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center text-base sm:text-lg text-green-600 mt-6 max-w-md mx-auto px-4"
    >
      <img
        src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmRsZGVhdGx2N3BicWowN3hkZ2djeWY3a2szczRpZW03NGg0ejJpbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3vRlT2k2L35Cnn5C/giphy.gif"
        alt="Joyful celebration"
        className="w-full max-w-xs mx-auto mb-4 rounded-lg object-contain"
        loading="lazy"
      />
      <p>That means the world to me. Thank you 💖</p>
      <Link
        href="https://www.snapchat.com/add/ritik_56?share_id=3wsGjH1CYOo&locale=en-IN"
        className="inline-block bg-gray-300 text-pink-800 px-8 py-3 my-7 rounded-2xl shadow hover:bg-gray-400 text-base"
        target="_blank"
        rel="noopener noreferrer"
      >
        Click me
      </Link>
    </motion.div>
  );
}

function RejectedStep({ onPlease }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center text-sm sm:text-base text-gray-600 mt-6 space-y-4 max-w-md mx-auto px-4"
    >
      <img
        src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmJmaWRtcXc3Nmdrc2c5MjE5dmh1N3F4N2drNHAycjIxZjl3MzUydiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OPU6wzx8JrHna/giphy.gif"
        alt="Sad disappointment"
        className="w-full max-w-xs mb-4 rounded-lg object-contain"
        loading="lazy"
      />
      <button
        onClick={onPlease}
        className="bg-rose-400 text-white px-8 py-3 rounded-2xl shadow hover:bg-rose-500 text-base"
      >
        Please!!!
      </button>
    </motion.div>
  );
}

export default function Home() {
  const [noClickCount, setNoClickCount] = useState(0);
  const [step, setStep] = useState(1);
  const [yesButtonScale, setYesButtonScale] = useState(1);

  const [message, setMessage] = useState("");
  const [messageSending, setMessageSending] = useState(false);

  const logClick = async (buttonName, stepName) => {
    if (!supabase) {
      console.warn("Supabase not initialized");
      return;
    }
    const userAgent = navigator.userAgent;
    const { error } = await supabase.from("ashmit").insert([
      {
        button_name: buttonName,
        step: stepName,
        user_agent: userAgent,
      },
    ]);
    if (error) {
      console.error("Supabase insert error:", error);
    }
  };

  const handleForgive = () => {
    logClick("yes", "forgive_step");
    setStep(2);
  };
  const handleReject = () => {
    logClick("no", "forgive_step");
    setStep("rejected");
  };
  const handleFriendYes = () => {
    logClick("yes", "friend_step");
    setStep("friend-yes");
  };
  const handleFriendNo = () => {
    logClick("no", "friend_step");
    setNoClickCount((prev) => prev + 1);
    setYesButtonScale((prev) => Math.min(prev + 0.2, 2));
  };
  const handlePlease = () => {
    logClick("please", "rejected_step");
    setStep(1);
    setYesButtonScale(1);
    setNoClickCount(0);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    if (!supabase) {
      alert("Supabase is not configured.");
      return;
    }
    setMessageSending(true);

    const { error } = await supabase.from("ashmit").insert([
      {
        message,
        step: step.toString(),
        user_agent: navigator.userAgent,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      alert("Could not send message.");
    } else {
      alert("Message sent!");
      setMessage("");
    }

    setMessageSending(false);
  };

  return (
    <>
      <Head>
        <title>A Heartfelt Apology</title>
        <meta
          name="description"
          content="A heartfelt apology with an interactive twist."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center bg-rose-100 text-center px-4 py-8 sm:px-6 sm:py-10 overflow-x-hidden">
        {step === 1 && (
          <ApologyStep onForgive={handleForgive} onReject={handleReject} />
        )}
        {step === 2 && (
          <ForgivenStep
            noClickCount={noClickCount}
            yesButtonScale={yesButtonScale}
            onFriendYes={handleFriendYes}
            onFriendNo={handleFriendNo}
          />
        )}
        {step === "friend-yes" && <FriendYesStep />}
        {step === "rejected" && <RejectedStep onPlease={handlePlease} />}

        {/* 💬 Message input */}
        <div className="rounded-2xl mt-10 w-full max-w-md bg-white text-black shadow p-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Leave a message..."
            rows={3}
            className="w-full p-3 border rounded-lg resize-none text-sm sm:text-base"
            disabled={messageSending}
          />
          <button
            onClick={handleSendMessage}
            className="mt-2 w-full sm:w-auto bg-rose-400 text-white px-6 py-2 rounded shadow hover:bg-rose-500"
            disabled={messageSending}
          >
            {messageSending ? "Sending..." : "Send Message"}
          </button>
        </div>
      </main>
    </>
  );
}
