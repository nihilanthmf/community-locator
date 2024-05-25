import { cn } from "@/lib/utils";
import TextShimmer from "@/components/magicui/animated-shiny-text";
// import { ArrowRightIcon } from "@radix-ui/react-icons";

export async function ShimmerText() {
  return (
    <div className="z-10 items-center justify-center mb-2 mt-[-20px] hidden md:flex">
      <div
        className={cn(
          "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
        )}
      >
        <TextShimmer className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span>✨ Introducing the Community Map</span>
          {/* <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" /> */}
        </TextShimmer>
      </div>
    </div>
  );
}
