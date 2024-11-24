import Link from 'next/link';

function Navbar() {
  return (
    <nav className='max-w-3xl mx-auto py-4 flex gap-x-4 '>
      <Link href='/'>Home</Link>
    </nav>
  );
}
export default Navbar;