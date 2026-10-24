import Image from "next/image";
import { ImgHTMLAttributes } from "react";

export type LogoProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "height" | "width" | "loading" | "ref" | "alt" | "srcSet"
> & {
  fill?: boolean;
  width?: number;
  height?: number;
};

export default function Logo({ fill, ...props }: LogoProps) {
  return (
    <Image
      fill={fill !== undefined ? fill : true}
      src="/favicon.png"
      alt="Excerises"
      {...props}
    />
  );
}
