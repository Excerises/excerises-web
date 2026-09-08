import Image from "next/image";
import { ImgHTMLAttributes } from "react";

export default function Logo(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <Image fill src="/logo.png" alt="Excerises" {...props} />;
}
