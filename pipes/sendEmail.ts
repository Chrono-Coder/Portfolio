import { Inputs } from '@/typings';

export default async function sendEmail(msg: Inputs) {
	console.log(msg);
	try {
		const response = await fetch('/api/email', {
			mode: 'no-cors',
			method: 'POST',
			body: JSON.stringify(msg),
		});

		return await response.json();
	} catch (error) {
		console.log('There was an error submitting', error);
		return { message: 'There was an error submitting' };
	}
}
