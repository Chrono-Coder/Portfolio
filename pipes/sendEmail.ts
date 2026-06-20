import { Inputs } from '@/typings';

export default async function sendEmail(msg: Inputs) {
	// same-origin call: 'no-cors' made the response opaque, so the form reported
	// success even on failure. Read the real status and let callers handle errors.
	const response = await fetch('/api/email', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(msg),
	});

	if (!response.ok) {
		throw new Error(`Email not sent (${response.status})`);
	}

	return response.json();
}
