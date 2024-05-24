"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Globe2 } from "lucide-react";

export default function MapView() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          className={`${cn(
            buttonVariants({ variant: "default" })
          )} flex justify-center gap-2 w-[7vw] overflow-hidden`}
        >
          <div>
            <Globe2 />
          </div>
          Map
        </Button>
      </DrawerTrigger>
      <DrawerContent
        className="bg-drawer/70 border-none"
        style={{ zIndex: 1000 }}
      >
        <div className="mx-auto w-full flex flex-col items-center text-center">
          {/* <DrawerHeader>
        <DrawerTitle>Map View</DrawerTitle>
        <DrawerDescription>See every member on a map</DrawerDescription>
      </DrawerHeader> */}
          <div className="flex flex-col items-center w-[90vw] mb-8 mt-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d35783363.056886874!2d54.265789249323454!3d56.81089072379841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sru!4v1716554732250!5m2!1sen!2sru"
              width="1000"
              height="450"
              loading="lazy"
              className="w-[95vw] h-[70vh] rounded-[8px]"
            ></iframe>
          </div>
          {/* <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter> */}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
