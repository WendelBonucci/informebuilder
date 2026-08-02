"use client";

import { useEffect } from "react";
import { Building2, TrendingUp, ShieldCheck } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

export function AuthSidebar() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: "ease-out-cubic",
        });
    }, []);

    return (
        <div
            data-aos="fade-right"
            className="lg:col-span-5 bg-linear-to-br from-black via-black to-darlcyan p-8 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden"
        >
            <div className="absolute -top-16 -left-16 w-48 h-48 bg-cyan/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-darlcyan/30 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex items-center gap-3">
                <div className="p-2.5 bg-cyan/20 rounded-xl border border-cyan/30 backdrop-blur-md">
                    <Building2 className="w-6 h-6 text-cyan" />
                </div>
                <span className="font-bold text-xl tracking-tight text-white">
                    Inform<span className="text-cyan">Builder</span>
                </span>
            </div>

            <div className="relative z-10 my-8 space-y-6">
                <div className="space-y-2">
                    <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-tight">
                        Gestão Empresarial Inteligente para sua Empresa.
                    </h2>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        Acompanhe o crescimento, gerencie registros e mantenha a gestão do seu negócio em dia.
                    </p>
                </div>

                <div data-aos="zoom-in" data-aos-delay="200"
                    className="bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between text-xs text-gray-300">
                        <span>Crescimento Anual</span>
                        <span className="flex items-center gap-1 text-cyan font-semibold">
                            <TrendingUp className="w-3.5 h-3.5" /> +28.4%
                        </span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan rounded-full w-[72%]" />
                    </div>
                </div>
            </div>

            <div className="relative z-10 flex items-center gap-2 text-xs text-gray-400">
                <ShieldCheck className="w-4 h-4 text-cyan" />
                <span>Dados protegidos com criptografia de ponta</span>
            </div>
        </div>
    );
}