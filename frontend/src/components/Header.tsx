import Link from "next/link";

export default function Header() {
  return (
    <header className="header flex justify-between p-10 bg-gray-200 shadow-lg">
      <h1>Checkpoint : frontend</h1>
      <Link className="text-blue-500" href="/">Home Page</Link>
    </header>
  );
}
