import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatWhatsAppMessage(items: any[]) {
    const serviceList = items
        .map((item) => `  • *${item.name}*\n    Price: ${item.price}  |  Duration: ${item.duration}`)
        .join('\n');

    const totalTime = items.reduce((acc, item) => {
        const mins = parseInt(item.duration.split(' ')[0]) || 0;
        return acc + mins;
    }, 0);

    const hours = Math.floor(totalTime / 60);
    const coreMins = totalTime % 60;
    const timeStr = hours > 0 ? `${hours}h ${coreMins > 0 ? ` ${coreMins}m` : ''}` : `${coreMins} min`;

    const totalPrice = items.reduce((acc, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
        return acc + price;
    }, 0);

    return encodeURIComponent(
        `Hi R.D. Beauty & Laser Clinic! 🌸\n\nI'd like to book the following services:\n\n` +
        `${serviceList}\n\n` +
        `━━━━━━━━━━━━━━━━\n` +
        `📋 *Booking Summary*\n` +
        `• Services: ${items.length}\n` +
        `• Est. Duration: ~${timeStr}\n` +
        `• Est. Total: $${totalPrice.toFixed(2)}\n` +
        `━━━━━━━━━━━━━━━━\n\n` +
        `Please let me know your available dates and times. Thank you! 😊`
    );
}
