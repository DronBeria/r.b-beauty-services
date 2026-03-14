import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatWhatsAppMessage(items: any[]) {
    const serviceList = items
        .map((item) => `• ${item.name} — ${item.duration}`)
        .join('\n');

    const totalTime = items.reduce((acc, item) => {
        const mins = parseInt(item.duration.split(' ')[0]) || 0;
        return acc + mins;
    }, 0);

    const hours = Math.floor(totalTime / 60);
    const coreMins = totalTime % 60;
    const timeStr = hours > 0 ? `${hours}h ${coreMins}m` : `${coreMins} min`;

    const totalItems = items.length;

    return encodeURIComponent(
        `Hi R.B Beauty! 🌸 I'd like to book the following services:\n\n${serviceList}\n\n` +
        `Estimated Total: ~${timeStr} | ${totalItems} Service(s)\n\n` +
        `Please let me know your available dates and times. Thank you! 😊`
    );
}
