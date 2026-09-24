import Image from "next/image";
import { ImgHTMLAttributes } from "react";

export type LogoProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "height" | "width" | "loading" | "ref" | "alt" | "srcSet"
>;

export default function Logo(props: LogoProps) {
  return <Image fill src="/favicon.png" alt="Excerises" {...props} />;
}
