"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, ArrowRight, CheckCircle2, AlertCircle, Loader2, } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Digite seu e-mail")
        .email("Digite um e-mail válido"),
    password: z
        .string()
        .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

const registerSchema = loginSchema
    .extend({
        confirmPassword: z
            .string()
            .min(1, "Confirme sua senha"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coincidem",
        path: ["confirmPassword"],
    });

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export function LoginForm() {
    const router = useRouter();
    const supabase = createClient();

    const [isRegistering, setIsRegistering] = useState(false);
    const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const loginForm = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const registerForm = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    async function handleLogin(data: LoginFormData) {
        setMessage(null);
        setIsLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        });

        setIsLoading(false);

        if (error) {
            setMessage({ type: "error", text: error.message });
            return;
        }

        router.push("/");
        router.refresh();
    }

    async function handleRegister(data: RegisterFormData) {
        setMessage(null);
        setIsLoading(true);

        const { error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
        });

        setIsLoading(false);

        if (error) {
            setMessage({ type: "error", text: error.message });
            return;
        }

        setMessage({
            type: "success",
            text: "Cadastro realizado! Verifique seu e-mail para confirmar a conta.",
        });

        registerForm.reset();
    }

    function changeMode() {
        setIsRegistering((current) => !current);
        setMessage(null);
        loginForm.reset();
        registerForm.reset();
    }

    return (
        <div data-aos="fade-left" className="lg:col-span-7 bg-white p-8 sm:p-12 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto space-y-8">
                <div className="space-y-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-black tracking-tight">
                        {isRegistering ? "Criar sua conta" : "Acesse sua conta"}
                    </h1>
                    <p className="text-sm text-gray-500">
                        {isRegistering
                            ? "Preencha os dados abaixo para começar a gestão."
                            : "Informe suas credenciais para entrar no painel."}
                    </p>
                </div>
                {message && (
                    <div className={`p-4 rounded-xl text-sm flex items-start gap-3 border ${message.type === "error"
                        ? "bg-red-50 border-red-200 text-red-700"
                        : "bg-emerald-50 border-emerald-200 text-emerald-800"
                        }`}>
                        {message.type === "error" ? (
                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        ) : (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        )}
                        <span>{message.text}</span>
                    </div>
                )}

                {isRegistering ? (
                    <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                        <div className="space-y-1.5">
                            <label htmlFor="register-email" className="text-xs font-semibold uppercase tracking-wider text-black/70">
                                E-mail
                            </label>
                            <div className="relative">
                                <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    id="register-email"
                                    type="email"
                                    placeholder="seu@empresa.com"
                                    className="w-full pl-11 pr-4 py-3 bg-background rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-darlcyan focus:ring-2 focus:ring-darlcyan/20 transition-all placeholder:text-gray-400"
                                    {...registerForm.register("email")}
                                />
                            </div>
                            {registerForm.formState.errors.email && (
                                <p className="text-xs text-red-500 mt-1">
                                    {registerForm.formState.errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="register-password" className="text-xs font-semibold uppercase tracking-wider text-black/70">
                                Senha
                            </label>
                            <div className="relative">
                                <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    id="register-password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-4 py-3 bg-background rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-darlcyan focus:ring-2 focus:ring-darlcyan/20 transition-all placeholder:text-gray-400"
                                    {...registerForm.register("password")}
                                />
                            </div>
                            {registerForm.formState.errors.password && (
                                <p className="text-xs text-red-500 mt-1">
                                    {registerForm.formState.errors.password.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="confirm-password" className="text-xs font-semibold uppercase tracking-wider text-black/70">
                                Confirmar senha
                            </label>
                            <div className="relative">
                                <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    id="confirm-password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-4 py-3 bg-background rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-darlcyan focus:ring-2 focus:ring-darlcyan/20 transition-all placeholder:text-gray-400"
                                    {...registerForm.register("confirmPassword")}
                                />
                            </div>
                            {registerForm.formState.errors.confirmPassword && (
                                <p className="text-xs text-red-500 mt-1">
                                    {registerForm.formState.errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-2 py-3.5 px-4 bg-darlcyan hover:bg-darlcyan/90 text-white font-medium rounded-xl shadow-md shadow-darlcyan/20 hover:shadow-lg hover:shadow-darlcyan/30 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <span>Criar Conta</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                        <div className="space-y-1.5">
                            <label htmlFor="login-email" className="text-xs font-semibold uppercase tracking-wider text-black/70">
                                E-mail
                            </label>
                            <div className="relative">
                                <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    id="login-email"
                                    type="email"
                                    placeholder="seu@empresa.com"
                                    className="w-full pl-11 pr-4 py-3 bg-background rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-darlcyan focus:ring-2 focus:ring-darlcyan/20 transition-all placeholder:text-gray-400"
                                    {...loginForm.register("email")}
                                />
                            </div>
                            {loginForm.formState.errors.email && (
                                <p className="text-xs text-red-500 mt-1">
                                    {loginForm.formState.errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="login-password" className="text-xs font-semibold uppercase tracking-wider text-black/70">
                                Senha
                            </label>
                            <div className="relative">
                                <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    id="login-password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-4 py-3 bg-background rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-darlcyan focus:ring-2 focus:ring-darlcyan/20 transition-all placeholder:text-gray-400"
                                    {...loginForm.register("password")}
                                />
                            </div>
                            {loginForm.formState.errors.password && (
                                <p className="text-xs text-red-500 mt-1">
                                    {loginForm.formState.errors.password.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-2 py-3.5 px-4 bg-darlcyan hover:bg-darlcyan/90 text-white font-medium rounded-xl shadow-md shadow-darlcyan/20 hover:shadow-lg hover:shadow-darlcyan/30 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <span>Entrar no Sistema</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                )}

                <div className="pt-4 border-t border-gray-100 text-center">
                    <button
                        type="button"
                        onClick={changeMode}
                        className="text-sm text-gray-600 hover:text-darlcyan font-medium transition-colors">
                        {isRegistering
                            ? "Já possui uma conta? Entrar"
                            : "Ainda não tem conta? Criar nova conta"}
                    </button>
                </div>
            </div>
        </div>
    );
}