import { AuthSidebar } from "@/app/login/AuthSidebar";
import { LoginForm } from "@/app/login/loginForm";

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-background text-black flex items-center justify-center p-4 md:p-8">
            <section className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-160">
                <AuthSidebar />
                <LoginForm />
            </section>
        </main>
    );
}