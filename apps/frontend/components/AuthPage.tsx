"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { handleAuthAction } from "./Actions"; 


function SubmitButton({ isSignin }: { isSignin: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="cursor-pointer bg-black text-white p-2 rounded hover:bg-gray-800 disabled:bg-gray-500"
    >
      {pending ? "Processing..." : isSignin ? "Sign in" : "Sign up"}
    </button>
  );
}

export function AuthPage({ isSignin }: { isSignin: boolean }) {
  const [state, action] = useActionState(handleAuthAction, null);

  return (
    <div className="w-screen h-screen flex justify-center items-center radial-gradient(#cbd5e1 1px, transparent 1px) selection:bg-orange-100 selection:text-orange-600">
      <div className="relative bg-white rounded-xl border border-slate-200 shadow-2xl overflow-hidden">
        <div className="p-8 w-60vh h-60vh selection:bg-orange-100 selection:text-orange-600 rounded">
       
          <form action={action}>
            
           
            <input type="hidden" name="isSignin" value={String(isSignin)} />

            {state?.message && (
              <div className="text-red-500 text-sm mb-2 text-center">
                {state.message}
              </div>
            )}

            
            <div className="pt-2">
              <input
                name="username" 
                className="p-2 w-100 border rounded"
                type="text"
                placeholder="username"
                required
              />
            </div>

            <div className="pt-4">
              <input
                name="password"
                className="p-2 w-100 border rounded"
                type="password"
                placeholder="Password"
                required
              />
            </div>

      
            {!isSignin && (
              <div className="pt-4">
                <input
                  name="name"
                  className="p-2 w-100 border rounded"
                  type="text"
                  placeholder="Name"
                />
              </div>
            )}

            <br />
            <div className="pt-4 flex justify-center">
              <SubmitButton isSignin={isSignin} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}