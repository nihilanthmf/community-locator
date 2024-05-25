"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import "../styles/App.css";

import { cn } from "@/lib/utils";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@supabase/supabase-js";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ErrorAlert } from "./ErrorAlert";
import Link from "next/link";

export function LoginDialog() {
  const [supabase, setSupabase] = useState<any>();
  const [sessionGlobal, setSession] = useState<any>(null);
  const [loadingCreateUser, setLoadingCreateUser] = useState(false);
  const [toEditMap, setToEditMap] = useState(false);
  const [toShowError, setToShowError] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("Please enter your name and bio!");

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    fetch(`https://daniel-community-map.vercel.app/api/fetchsupa`).then(
      (resp) =>
        resp.json().then(async (data) => {
          console.log(data);
          console.log(resp);
          const supabaseTemp = createClient(
            "https://aeilgskwpckhncuxjevt.supabase.co",
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
                    setEmail(session.user.email);
                  } catch (error) {}
                }
                setSession(session);
              }
            }
          );
        })
    );
  }, []);

  async function updateUser() {
    fetch(`https://daniel-community-map.vercel.app/api/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ email, name, bio }),
    }).then((resp) =>
      resp.json().then(async (data) => {
        console.log(data);
        if (data.success) {
          console.log("Success!");
          setToEditMap(true);
          setLoading(false);
          setToShowError(false);
        } else {
          setLoading(false);
          setError("Something went wrong!");
          setToShowError(true);
        }
      })
    );
  }

  useEffect(() => {
    fetch(`https://daniel-community-map.vercel.app/api/checkuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ email }),
    }).then((resp) =>
      resp.json().then(async (data) => {
        if (data.exists) {
          setToEditMap(true);
        }
      })
    );
  }, [email]);

  if (supabase === undefined)
    return (
      <Button
        className={`${cn(
          buttonVariants({ variant: "default" })
        )} flex justify-center gap-2 w-[35vw] lg:w-[7vw]`}
      >
        <div className="loader aspect-[1/1] border-t-primary border-[2px] border-text rounded-[100px] w-[20px] h-[20px] transition-all"></div>
        Loading
      </Button>
    );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={`${cn(
            buttonVariants({ variant: "default" })
          )} flex justify-center gap-2 w-[35vw] lg:w-[7vw]`}
        >
          <div>
            <User />
          </div>
          Sign Up
        </Button>
      </DialogTrigger>
      {sessionGlobal !== false ? (
        toEditMap ? (
          <DialogContent
            className="w-11/12 sm:max-w-md"
            style={{ zIndex: 100 }}
          >
            <p>
              You will be given a link to Google Maps, you can put your location
              there. Press &quot;Add Marker&quot; icon in the top left corner.
              This is a public map, please, be respectful to others, don&apos;t
              delete other&apos;s markers and don&apos;t put unnessasary markers
              yourself.<br></br>
              <br></br>
              When creating a marker, don&apos;t forget to put:<br></br>- your
              name
              <br></br>- a bit about yourself<br></br>- a link to contact you
              <br></br>
            </p>
            {showLink ? (
              <Link
                href="https://www.google.com/maps/d/u/0/edit?mid=18Sr5PAP_rpt1cPzoemcOcWcdiQSC898&usp=sharing"
                target="_blank"
                className="text-primary hover:underline"
              >
                Here is the link
              </Link>
            ) : (
              <Button
                className={`${cn(
                  buttonVariants({ variant: "classic" })
                )} flex justify-center gap-2`}
                onClick={() => {
                  setShowLink(true);
                }}
              >
                I have read the stuff above
              </Button>
            )}
          </DialogContent>
        ) : (
          <DialogContent
            className="w-11/12 sm:max-w-md"
            style={{ zIndex: 100 }}
          >
            {toShowError ? (
              <ErrorAlert title="Error" description={error} />
            ) : null}

            <div>
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="col-span-3"
              />
            </div>
            <div>
              <Label htmlFor="name" className="text-right">
                Bio
              </Label>
              <Textarea
                onChange={(e) => setBio(e.target.value)}
                placeholder="Describe yourself, say what you do, what you like, etc."
              />
            </div>
            <Button
              className={`${cn(
                buttonVariants({ variant: "classic" })
              )} flex justify-center gap-2`}
              onClick={() => {
                if (name !== "" && bio !== "") {
                  setToShowError(false);

                  setLoading(true);
                  updateUser();
                } else {
                  setToShowError(true);
                }
              }}
            >
              {loading ? (
                <div className="loader border-t-primary border-[2px] border-text rounded-[100px] w-[20px] h-[20px] transition-all"></div>
              ) : null}
              Continue
            </Button>
          </DialogContent>
        )
      ) : (
        <DialogContent className="w-11/12 sm:max-w-md" style={{ zIndex: 100 }}>
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
                  "bg-black text-white rounded-[8px]  p-[8px] mt-[8px] mb-[12px] transition-all hover:bg-primary hover:shadow-[0px_0px_4px_4px_rgba(235,94,40,0.3)]",
                label: "hidden",
                anchor: "text-center text-[12px] text-gray hover:underline",
                message:
                  "text-center text-[12px] text-primary flex items-center justify-center",
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
