"use client";

import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useState, useEffect, createContext } from "react";

import Loading from "./Loading";

export const EmailContext = createContext(null);
export const SupabaseContext = createContext(null);

export default function Login() {
  const [sessionGlobal, setSession] = useState<any>(null);
  const [supabase, setSupabase] = useState<any>(null);

  const [loadingCreateUser, setLoadingCreateUser] = useState(false);

  async function createSupabase() {
    fetch(`/api`).then((resp) =>
      resp.json().then((data) => {
        const supabaseTemp = createClient(
          "https://kmqcallqltyxocpsjgkm.supabase.co",
          data.api
        );

        setSupabase(supabaseTemp);

        supabaseTemp.auth.getSession().then(({ data: { session } }) => {
          if (session === null) {
            setSession(false);
          } else {
            setSession(session);
          }
        });

        const {
          data: { subscription },
        } = supabaseTemp.auth.onAuthStateChange(
          async (_event: any, session: any) => {
            if (session === null) {
              setSession(false);
            } else {
              if (!sessionGlobal && !loadingCreateUser) {
                try {
                  createUser(session.user.email, supabaseTemp);
                } catch (error) {}
              }
              setSession(session);
            }
          }
        );
      })
    );

    // return () => subscription.unsubscribe();
  }
  async function createUser(email: string, supabaseTemp: any) {
    setLoadingCreateUser(true);

    const data = await supabaseTemp.from("users").select().eq("email", email);

    if (data.data === null || data.data.length === 0) {
      await supabaseTemp.from("users").insert({ email: email });
    }
  }

  useEffect(() => {
    createSupabase();
  }, []);

  if (supabase === undefined || supabase === null || sessionGlobal === null) {
    return <Loading></Loading>;
  }
  return (
    <div className="bg-background flex items-center justify-center h-screen w-screen flex-row">
      <div>
        <h3
          className="text-primary"
          style={{
            textAlign: "center",
            fontSize: 22,

            marginBottom: 10,
          }}
        >
          Daniel's Community Map
        </h3>
        <h3
          className="text-[#646464]"
          style={{
            textAlign: "center",
            fontSize: 15,

            marginTop: 0,
          }}
        >
          Login or create an account
        </h3>

        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#eb5e28",
                  brandAccent: "#161616",
                },
                radii: {
                  borderRadiusButton: "80px",
                  buttonBorderRadius: "80px",
                  inputBorderRadius: "80px",
                },
                fonts: {
                  bodyFontFamily: "inherit",
                  inputFontFamily: "inherit",
                  buttonFontFamily: "inherit",
                  labelFontFamily: "inherit",
                },
              },
            },

            extend: false,
            className: {
              container: "flex flex-col text-[12px] text-[#161616]",
              input:
                "rounded-[8px] py-[8px] px-[12px] w-full mt-[8px] text-[12px]",
              button:
                "bg-[#646464] rounded-[8px] p-[8px] mt-[8px] mb-[12px] transition-all hover:scale-[90%] hover:bg-primary",
              label: "hidden",
              anchor: "text-center text-[12px] text-[#646464] hover:underline",
              message:
                " px-[50px] rounded-[8px] text-center text-[12px] text-[#681200]",
            },
          }}
          // localization={{
          //   variables: variablesRu,
          // }}

          providers={[]}
        />
      </div>
    </div>
  );
}
