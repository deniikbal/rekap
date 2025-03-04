import Head from 'next/head';
import UserForm from '../components/UserForm';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>User Registration Form</title>
        <meta name="description" content="Register user information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold text-center mb-8">User Registration</h1>
        <UserForm />
      </main>
    </div>
  );
}