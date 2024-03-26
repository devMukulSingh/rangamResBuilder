"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";

const Header = () => {
  const logo =
    "https://jobs.rangam.com/hs-fs/hubfs/Rangam_Logo2-1.png?width=375&height=110&name=Rangam_Logo2-1.png";
  const router = useRouter();
  return (
    <>
      <div className="fixed top-0 z-50 overflow-hidden w-full bg-[#F9F9F9] print:hidden">
        <div className="px-8 flex  h-24 items-center">
          <figure className="relative w-[250px] h-[250px]">
            <Image
              alt="logo"
              src={logo}
              fill
              onClick={() => router.push("/")}
              className="object-contain cursor-pointer"
            />
          </figure>
        </div>
        <Separator />
      </div>
    </>
  );
};

export default Header;
