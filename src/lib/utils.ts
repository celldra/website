import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function relativeTime(date: Date | string): string {
	const now = new Date();
	const target = new Date(date);

	const diff = target.getTime() - now.getTime(); // in ms
	const seconds = Math.round(diff / 1000);

	const thresholds = {
		year: 31536000,
		month: 2592000,
		week: 604800,
		day: 86400,
		hour: 3600,
		minute: 60
	};

	for (const [unit, value] of Object.entries(thresholds)) {
		const amount = Math.floor(Math.abs(seconds) / value);
		if (amount >= 1) {
			const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
			return rtf.format(Math.sign(seconds) * amount, unit as Intl.RelativeTimeFormatUnit);
		}
	}

	return 'just now';
}
