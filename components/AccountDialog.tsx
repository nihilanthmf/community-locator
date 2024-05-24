"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@supabase/supabase-js";
import { User } from "lucide-react";
import { useEffect, useState } from "react";

export function AccountDialog() {
  const [supabase, setSupabase] = useState<any>();
  const [sessionGlobal, setSession] = useState<any>(null);
  const [loadingCreateUser, setLoadingCreateUser] = useState(false);

  useEffect(() => {
    fetch(`/api`).then((resp) =>
      resp.json().then(async (data) => {
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
  }, []);

  async function createUser(email: string, supabaseTemp: any) {
    setLoadingCreateUser(true);

    const data = await supabaseTemp.from("users").select().eq("email", email);

    if (data.data === null || data.data.length === 0) {
      await supabaseTemp.from("users").insert({ email: email });
    }
  }

  useEffect(() => {
    if (sessionGlobal) {
      window.location.href = "/dashboard";
    }
  }, [sessionGlobal]);

  if (supabase === undefined) return <></>;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={`${cn(
            buttonVariants({ variant: "default" })
          )} flex justify-center gap-2 w-[7vw]`}
          onClick={() => {
            console.log("login");
            if (sessionGlobal !== false) {
              window.location.href = "/dashboard";
            }
          }}
        >
          <div>
            <User />
          </div>
          Sign Up
        </Button>
      </DialogTrigger>
      {sessionGlobal !== false ? null : (
        <DialogContent className="sm:max-w-[425px]" style={{ zIndex: 100 }}>
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
                  "bg-black text-white rounded-[8px] p-[8px] mt-[8px] mb-[12px] transition-all hover:scale-[90%] hover:bg-primary hover:shadow-[0px_0px_4px_4px_rgba(235,94,40,0.3)]",
                label: "hidden",
                anchor:
                  "text-center text-[12px] text-[#646464] hover:underline",
                message:
                  " px-[50px] rounded-[8px] text-center text-[12px] text-[#681200]",
              },
            }}
            // localization={{
            //   variables: variablesRu,
            // }}

            providers={[]}
          />
        </DialogContent>
      )}
    </Dialog>
  );
}
