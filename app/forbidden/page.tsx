import Link from "next/link";

//TODO Replace with beautiful component

export default function page() {
  return (
    <div>
      <h2>Forbidden</h2>
      <p>You are not authorized to access this resource.</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
