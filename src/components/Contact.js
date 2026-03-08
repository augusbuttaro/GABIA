import { useMemo, useState } from 'react';

const Contact = () => {
    const initialForm = useMemo(
        () => ({
            fullName: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
            notRobot: false,
        }),
        []
    );

    const [form, setForm] = useState(initialForm);
    const [status, setStatus] = useState({ type: 'idle', message: '' });

    const onChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'idle', message: '' });

        if (!form.notRobot) {
            setStatus({ type: 'error', message: 'Por favor, confirmá que no sos un robot.' });
            return;
        }

        try {
            const res = await fetch('https://gabia-9dzk.onrender.com/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: form.fullName,
                    email: form.email,
                    phone: form.phone,
                    subject: form.subject,
                    message: form.message,
                }),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok || !data.ok) {
                setStatus({ type: 'error', message: data.error || 'No se pudo enviar la consulta. Intentalo de nuevo.' });
                return;
            }

            setStatus({ type: 'success', message: '¡Gracias! Recibimos tu consulta y te vamos a responder a la brevedad.' });
            setForm(initialForm);
        } catch (_err) {
            setStatus({ type: 'error', message: 'No se pudo conectar al servidor. ¿Está el backend corriendo?' });
        }
    };

    const inputBase =
        'w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-white/80 px-4 py-3 text-gray-900 placeholder-gray-500 shadow-sm outline-none focus:border-brunswick-600 focus:ring-2 focus:ring-brunswick-600/20 transition';

    return (
        <section className="w-full py-12 px-6">
            <div className="mx-auto w-full max-w-6xl px-6">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                <h2 className="text-3xl font-bold text-center mb-8 border-b-4 border-brunswick-600 inline-block mx-auto">
                    Contactate con nosotros
                </h2>
            </div>

                <div className="mt-8 rounded-2xl bg-white/40 dark:bg-black/10 backdrop-blur-sm border border-white/30 dark:border-white/10 shadow-sm p-6 md:p-8">
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="sr-only" htmlFor="fullName">Nombre y Apellido</label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    value={form.fullName}
                                    onChange={onChange}
                                    className={inputBase}
                                    placeholder="Nombre y Apellido"
                                    autoComplete="name"
                                    required
                                />
                            </div>

                            <div>
                                <label className="sr-only" htmlFor="email">E-mail</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={onChange}
                                    className={inputBase}
                                    placeholder="E-mail"
                                    autoComplete="email"
                                    required
                                />
                            </div>

                            <div>
                                <label className="sr-only" htmlFor="phone">Teléfono</label>
                                <input
                                    id="phone"
                                    name="phone"
                                    value={form.phone}
                                    onChange={onChange}
                                    className={inputBase}
                                    placeholder="Teléfono"
                                    autoComplete="tel"
                                />
                            </div>

                            <div>
                                <label className="sr-only" htmlFor="subject">Asunto</label>
                                <input
                                    id="subject"
                                    name="subject"
                                    value={form.subject}
                                    onChange={onChange}
                                    className={inputBase}
                                    placeholder="Asunto"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="sr-only" htmlFor="message">Consulta</label>
                            <textarea
                                id="message"
                                name="message"
                                value={form.message}
                                onChange={onChange}
                                className={[inputBase, 'min-h-[220px] resize-none'].join(' ')}
                                placeholder="Consulta"
                                required
                            />
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div className="w-full md:w-auto">
                                <div className="rounded-md border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-white/80 shadow-sm px-4 py-3 flex items-center justify-between gap-6 max-w-[360px]">
                                    <label className="flex items-center gap-3 select-none cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="notRobot"
                                            checked={form.notRobot}
                                            onChange={onChange}
                                            className="h-5 w-5 accent-brunswick-600"
                                        />
                                        <span className="text-gray-900">No soy un robot</span>
                                    </label>

                                    <div className="text-right leading-tight">
                                        <div className="text-xs font-semibold text-gray-700">reCAPTCHA</div>
                                        <div className="text-[10px] text-gray-500">Privacidad · Términos</div>
                                    </div>
                                </div>
                                <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                                    Nota: este checkbox es visual (sin validación reCAPTCHA real).
                                </p>
                            </div>

                            <div className="flex flex-col items-start md:items-end gap-3">
                                <button
                                    type="submit"
                                    className={[
                                        'rounded-md px-8 py-3 font-semibold',
                                        'bg-black text-white',
                                        'hover:bg-gray-900',
                                        'transition-colors',
                                        'disabled:opacity-50 disabled:cursor-not-allowed',
                                    ].join(' ')}
                                    disabled={!form.notRobot}
                                >
                                    Enviar Consulta
                                </button>

                                {status.type !== 'idle' && (
                                    <div
                                        className={[
                                            'text-sm',
                                            status.type === 'success' ? 'text-asparagus-700 dark:text-asparagus-300' : 'text-red-600 dark:text-red-300',
                                        ].join(' ')}
                                        role="status"
                                        aria-live="polite"
                                    >
                                        {status.message}
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;