import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import CustomizedTables from "@/component/Table";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <CustomizedTables />
    </>
  );
}
