import Image from 'next/image';
import APIDemo from '@/components/Demo';
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between  ">
      <APIDemo />
    </main>
  );
}
