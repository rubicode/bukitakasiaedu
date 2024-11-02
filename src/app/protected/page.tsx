import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // Adjust the import path
import { Session } from 'next-auth';

interface ProtectedPageProps {
    session: Session | null; // The session can be null if the user is not authenticated
}

const ProtectedPage: React.FC<ProtectedPageProps> = ({ session }) => {
    // Ensure session and user are defined before accessing
    if (!session || !session.user) {
        return <div>You must be logged in to view this page.</div>;
    }

    return (
        <div>
            <h1>Protected Page</h1>
            <p>Welcome, {session.user.email}</p>
        </div>
    );
};

export async function getServerSideProps(context: any) {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (!session) {
        return {
            redirect: {
                destination: '/auth/signin',
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
}

export default ProtectedPage;
