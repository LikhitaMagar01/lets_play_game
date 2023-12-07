import NavBar from "@/components/NavBar";
import Image from "next/image";
import homepageImage from "../../public/homie.jpg";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <NavBar />
      <Image
        src={homepageImage}
        alt="homepage image"
        className="w-full"
        priority
      ></Image>
    </main>
  );
}
