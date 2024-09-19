async function sendDataToRegistrationEndpoint() {
    try {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        const payload = {
            name: userData.name,
            surname: userData.surname,
            email: userData.email,
            phone: userData.phone,
            gender: userData.gender,
            dateOfBirth: userData.dateOfBirth,
            password: userData.password,
            isDisabled: userData.isDisabled,
            selectedInterests: userData.selectedInterests
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            mode: 'cors',
        };

        const response = await fetch('api/user/', options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.text();

        console.log('Registration successful:', data);
        return data;
    } catch (error) {
        console.error('Error sending data to registration endpoint:', error);
    }
}

export { sendDataToRegistrationEndpoint };