// dependências:
import Link from 'next/link';
interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps ){
  return (
    <Link 
      href="/"
      className={`-translate-y-[3px] select-none ${className}`}
    >
      {/* <Image src={AmperLogo} alt="Logo" width={24} height={24}/> */}
      <p className="font-averia text-2xl">
        amper<span className="text-[#96E530] font-bold">e</span>
      </p>
    </Link>
  );
}